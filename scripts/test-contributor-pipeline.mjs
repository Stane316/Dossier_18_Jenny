import assert from "node:assert/strict";
import { rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const tempFiles = [];
const testEnv = {
  VITE_SUPABASE_URL: "https://project.supabase.co",
  VITE_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test",
  VITE_SUPABASE_ANON_KEY: "",
  VITE_SITE_URL: "https://allowed.example",
  EMAIL_JENNY: "jenny@example.com",
  PASSWORD_JENNY: "temporary-password",
  JENNY_DATA_TOKEN: "0123456789abcdef0123456789abcdef",
  DEV: false,
  PROD: true,
};

function virtualModules(modules) {
  return {
    name: "virtual-modules",
    setup(builder) {
      builder.onResolve({ filter: /.*/ }, (args) => {
        if (Object.hasOwn(modules, args.path)) {
          return { path: args.path, namespace: "contributor-test" };
        }
        return undefined;
      });
      builder.onLoad({ filter: /.*/, namespace: "contributor-test" }, (args) => ({
        contents: modules[args.path],
        loader: "js",
      }));
    },
  };
}

async function bundleAndImport(entry, label, options = {}) {
  const output = join(tmpdir(), `jenny-${label}-${process.pid}-${Date.now()}.mjs`);
  tempFiles.push(output);
  await build({
    entryPoints: [entry],
    outfile: output,
    bundle: true,
    format: "esm",
    platform: "neutral",
    logLevel: "silent",
    define: { "import.meta.env": JSON.stringify(testEnv) },
    ...options,
  });
  return import(`${pathToFileURL(output).href}?v=${Date.now()}`);
}

async function expectFailure(action, expectedText) {
  try {
    await action();
    assert.fail("Une erreur était attendue");
  } catch (error) {
    assert.match(String(error instanceof Error ? error.message : error), expectedText);
  }
}

async function testValidationScenarios() {
  const validation = await bundleAndImport("src/lib/validation.ts", "validation");
  const photo = new File([new Uint8Array([1, 2, 3])], "souvenir.jpg", { type: "image/jpeg" });
  const mobilePhoto = new File([new Uint8Array([1, 2, 3])], "mobile.JPG", { type: "" });
  const video = new File([new Uint8Array([4, 5, 6])], "souvenir.mp4", { type: "video/mp4" });

  assert.equal(validation.validateContribution({ name: "A", message: "Message", photo: null, video: null }).message, "Message"); // A
  assert.equal(validation.validateContribution({ name: "B", message: "", photo, video: null }).photo, photo); // B
  assert.equal(validation.validateContribution({ name: "C", message: "", photo: null, video }).video, video); // C
  validation.validateContribution({ name: "D", message: "Message", photo, video: null }); // D
  validation.validateContribution({ name: "E", message: "Message", photo: null, video }); // E
  validation.validateContribution({ name: "F", message: "", photo, video }); // F

  assert.throws(
    () => validation.validateContribution({ name: "G", message: "", photo: null, video: null }),
    /contribution vide|message, photo ou vidéo requis/i
  ); // G
  assert.throws(
    () => validation.validateContribution({ name: "", message: "Message", photo: null, video: null }),
    /nom ou un alias/i
  );

  const invalid = new File([new Uint8Array([1])], "preuve.txt", { type: "text/plain" });
  assert.match(validation.validatePhotoFile(invalid), /Format photo non supporté/); // H
  assert.equal(validation.contributionFileMime(mobilePhoto, "photo"), "image/jpeg");
  assert.equal(validation.contributionFileMime({ name: "preuve.jpg", type: "image/jpg" }, "photo"), "image/jpeg");
  assert.equal(validation.contributionFileMime({ name: "film.mov", type: "video/mov" }, "video"), "video/quicktime");
}

async function testClientBridge() {
  const contributions = await bundleAndImport("src/lib/contributions.ts", "contributions", {
    plugins: [virtualModules({
      "./supabase": "export const isSupabaseConfigured = true;",
      "./storage": "export const loadLocalContributions = () => [];",
      "./auth": "export const invokeJennyAccess = async () => ({ contributions: [] });",
      "./config": `export const config = { supabase: { url: "https://project.supabase.co", publishableKey: "sb_publishable_test" } };`,
      "../data": "export const DEPOSITIONS = [];",
    })],
  });

  const contributionId = "11111111-1111-4111-8111-111111111111";
  const assetId = "22222222-2222-4222-8222-222222222222";
  let capturedRequest;
  globalThis.fetch = async (url, options) => {
    capturedRequest = { url, options };
    return new Response(JSON.stringify({
      contributionId,
      submissionToken: "0123456789abcdef0123456789abcdef",
      uploads: [{
        id: assetId,
        type: "photo",
        path: `contributions/${contributionId}/photos/${assetId}.jpg`,
        token: "signed-upload-token",
      }],
      complete: false,
    }), { status: 200, headers: { "Content-Type": "application/json" } });
  };

  const created = await contributions.createPendingContribution({
    name: "Témoin",
    message: "Souvenir",
    media: [{ type: "photo", mimeType: "image/jpeg", sizeBytes: 3 }],
  });
  assert.equal(created.contributionId, contributionId);
  assert.equal(capturedRequest.url, "https://project.supabase.co/functions/v1/contribution-pipeline");
  assert.equal(capturedRequest.options.headers.apikey, "sb_publishable_test");
  assert.equal("Authorization" in capturedRequest.options.headers, false);
  assert.deepEqual(JSON.parse(capturedRequest.options.body), {
    action: "create",
    name: "Témoin",
    message: "Souvenir",
    media: [{ type: "photo", mimeType: "image/jpeg", sizeBytes: 3 }],
  });

  globalThis.fetch = async () => new Response(
    JSON.stringify({ code: "NOT_FOUND", message: "Requested function was not found" }),
    { status: 404, headers: { "Content-Type": "application/json" } }
  );
  await expectFailure(
    () => contributions.createPendingContribution({ name: "Témoin", message: "Message", media: [] }),
    /pas encore déployé/
  );

  globalThis.fetch = async () => new Response(
    JSON.stringify({ error: "La contribution n'a pas pu être finalisée", code: "FINALIZATION_FAILED" }),
    { status: 500, headers: { "Content-Type": "application/json" } }
  );
  await expectFailure(
    () => contributions.finalizePendingContribution(
      contributionId,
      "0123456789abcdef0123456789abcdef"
    ),
    /n'a pas pu être finalisée/
  ); // J: aucun succès client sur erreur de finalisation
}

async function testUploadRetry() {
  let uploadAttempts = 0;
  let lastOptions;
  globalThis.__contributorStorageMock = {
    storage: {
      from: () => ({
        uploadToSignedUrl: async (_path, _token, _file, options) => {
          uploadAttempts += 1;
          lastOptions = options;
          return uploadAttempts === 1
            ? { error: { message: "Connexion interrompue" } }
            : { error: null };
        },
      }),
    },
  };

  const storage = await bundleAndImport("src/lib/storage.ts", "storage", {
    plugins: [virtualModules({
      "./supabase": "export const isSupabaseConfigured = true; export const supabase = globalThis.__contributorStorageMock;",
      "./config": `
        export const STORAGE_BUCKETS = { media: "birthday-media" };
        export const LIMITS = {
          photoMaxBytes: 10485760,
          videoMaxBytes: 104857600,
          photoAccept: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
          videoAccept: ["video/mp4", "video/quicktime", "video/webm", "video/x-m4v"]
        };
      `,
    })],
  });

  const assetId = "22222222-2222-4222-8222-222222222222";
  const photo = new File([new Uint8Array([1, 2, 3])], "mobile.jpg", { type: "image/jpg" });
  const uploads = [{
    id: assetId,
    type: "photo",
    path: `contributions/11111111-1111-4111-8111-111111111111/photos/${assetId}.jpg`,
    token: "signed-upload-token",
  }];

  await expectFailure(
    () => storage.uploadContributionMedia(uploads, photo, null),
    /Connexion interrompue/
  ); // I: erreur remontée

  const completed = new Set();
  await storage.uploadContributionMedia(
    uploads,
    photo,
    null,
    undefined,
    (id) => completed.add(id),
    completed
  ); // I: retry réussi
  assert.equal(uploadAttempts, 2);
  assert.equal(lastOptions.contentType, "image/jpeg");
  assert.deepEqual([...completed], [assetId]);
}

async function testEdgeHandler() {
  const env = new Map([
    ["SITE_ALLOWED_ORIGINS", "https://allowed.example"],
    ["SUPABASE_URL", "https://project.supabase.co"],
    ["SUPABASE_SECRET_KEYS", JSON.stringify({ default: "server-secret-key" })],
    ["CONTRIBUTION_RATE_LIMIT_SECRET", "0123456789abcdef0123456789abcdef"],
  ]);
  let handler;
  let finalizeAssets = [];
  let finalizeComplete = false;
  let finalizeRpcCalls = 0;
  let failCreate = false;
  let failFinalize = false;

  globalThis.Deno = {
    env: { get: (key) => env.get(key) },
    serve: (candidate) => { handler = candidate; },
  };
  globalThis.__contributorCreateClient = () => ({
    rpc: async (name, args) => {
      if (name === "claim_contribution_slot") {
        assert.equal(args.p_limit, 20);
        assert.equal(args.p_window_seconds, 3600);
        return { data: true, error: null };
      }
      if (name === "create_contribution_submission") {
        return failCreate
          ? { data: null, error: { code: "DB_CREATE_FAILED" } }
          : { data: true, error: null };
      }
      if (name === "finalize_contribution_submission") {
        finalizeRpcCalls += 1;
        return failFinalize
          ? { data: null, error: { code: "DB_FINALIZE_FAILED" } }
          : { data: true, error: null };
      }
      throw new Error(`RPC inattendue: ${name}`);
    },
    from: (table) => {
      if (table === "contributors") {
        return { delete: () => ({ eq: async () => ({ error: null }) }) };
      }
      if (table === "contributions") {
        return {
          select: () => ({
            eq() { return this; },
            maybeSingle: async () => ({
              data: {
                id: "11111111-1111-4111-8111-111111111111",
                submission_complete: finalizeComplete,
                submission_token_hash: "hash",
                media_assets: finalizeAssets,
              },
              error: null,
            }),
          }),
        };
      }
      throw new Error(`Table inattendue: ${table}`);
    },
    storage: {
      from: () => ({
        createSignedUploadUrl: async (path) => ({
          data: { token: `signed:${path}` },
          error: null,
        }),
        list: async (_folder, { search }) => ({
          data: [{
            name: search,
            metadata: {
              size: finalizeAssets[0]?.size_bytes,
              mimetype: finalizeAssets[0]?.mime_type,
            },
          }],
          error: null,
        }),
      }),
    },
  });

  await bundleAndImport("supabase/functions/contribution-pipeline/index.ts", "edge", {
    define: undefined,
    plugins: [virtualModules({
      "npm:@supabase/supabase-js@2.109.0": "export const createClient = (...args) => globalThis.__contributorCreateClient(...args);",
    })],
  });
  assert.equal(typeof handler, "function");

  async function call(body) {
    const response = await handler(new Request(
      "https://project.supabase.co/functions/v1/contribution-pipeline",
      {
        method: "POST",
        headers: {
          Origin: "https://allowed.example",
          "Content-Type": "application/json",
          "x-forwarded-for": "203.0.113.18",
        },
        body: JSON.stringify(body),
      }
    ));
    return { response, body: await response.json() };
  }

  const scenarios = [
    { label: "A", message: "Message", media: [], uploads: 0 },
    { label: "B", message: "", media: [{ type: "photo", mimeType: "image/jpg", sizeBytes: 3 }], uploads: 1 },
    { label: "C", message: "", media: [{ type: "video", mimeType: "video/mp4", sizeBytes: 3 }], uploads: 1 },
    { label: "D", message: "Message", media: [{ type: "photo", mimeType: "image/jpeg", sizeBytes: 3 }], uploads: 1 },
    { label: "E", message: "Message", media: [{ type: "video", mimeType: "video/mov", sizeBytes: 3 }], uploads: 1 },
    { label: "F", message: "", media: [
      { type: "photo", mimeType: "image/jpeg", sizeBytes: 3 },
      { type: "video", mimeType: "video/mp4", sizeBytes: 3 },
    ], uploads: 2 },
  ];

  for (const scenario of scenarios) {
    const result = await call({
      action: "create",
      name: `Témoin ${scenario.label}`,
      message: scenario.message,
      media: scenario.media,
    });
    assert.equal(result.response.status, 200, `Scénario ${scenario.label}`);
    assert.equal(result.body.uploads.length, scenario.uploads, `Uploads ${scenario.label}`);
    assert.equal(result.body.complete, scenario.uploads === 0, `Complete ${scenario.label}`);
  }

  let result = await call({ action: "create", name: "Témoin G", message: "", media: [] });
  assert.equal(result.response.status, 400); // G
  assert.equal(result.body.code, "INVALID_CONTRIBUTION");

  result = await call({
    action: "create",
    name: "Témoin H",
    message: "",
    media: [{ type: "photo", mimeType: "text/plain", sizeBytes: 3 }],
  });
  assert.equal(result.response.status, 400); // H
  assert.equal(result.body.code, "INVALID_CONTRIBUTION");

  failCreate = true;
  result = await call({ action: "create", name: "DB", message: "Message", media: [] });
  assert.equal(result.response.status, 500);
  assert.equal(result.body.code, "CREATE_FAILED");
  assert.equal(result.body.ok, undefined);
  failCreate = false;

  const reserved = await call({
    action: "create",
    name: "Finalisation",
    message: "Message",
    media: [{ type: "photo", mimeType: "image/jpeg", sizeBytes: 3 }],
  });
  const upload = reserved.body.uploads[0];
  finalizeAssets = [{
    id: upload.id,
    storage_path: upload.path,
    mime_type: "image/jpeg",
    size_bytes: 3,
    upload_status: "pending",
  }];
  failFinalize = true;
  result = await call({
    action: "finalize",
    contributionId: reserved.body.contributionId,
    submissionToken: reserved.body.submissionToken,
  });
  assert.equal(result.response.status, 500); // J
  assert.equal(result.body.code, "FINALIZATION_FAILED");
  assert.equal(result.body.ok, undefined);

  const callsBeforeIdempotentRetry = finalizeRpcCalls;
  finalizeComplete = true;
  result = await call({
    action: "finalize",
    contributionId: reserved.body.contributionId,
    submissionToken: reserved.body.submissionToken,
  });
  assert.equal(result.response.status, 200);
  assert.deepEqual(result.body, { ok: true, alreadyComplete: true });
  assert.equal(finalizeRpcCalls, callsBeforeIdempotentRetry);
}

try {
  await testValidationScenarios();
  await testClientBridge();
  await testUploadRetry();
  await testEdgeHandler();
  console.log("Contributor stability: scénarios A–J validés (validation, bridge, upload/retry, DB/finalisation). ");
} finally {
  await Promise.all(tempFiles.map((file) => rm(file, { force: true })));
}
