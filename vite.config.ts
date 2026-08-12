import { existsSync, readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VIRTUAL_MEMORIES_ID = "virtual:jenny-memories";
const RESOLVED_MEMORIES_ID = `\0${VIRTUAL_MEMORIES_ID}`;
const memoriesDirectory = path.resolve(__dirname, "public/memories");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov", ".m4v", ".ogv"]);

function scanMemoryFiles(directory: string, root = directory): Array<{
  id: string;
  name: string;
  src: string;
  kind: "image" | "video";
}> {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) return scanMemoryFiles(absolutePath, root);
      if (!entry.isFile() || entry.name.startsWith(".")) return [];

      const extension = path.extname(entry.name).toLowerCase();
      const kind: "image" | "video" | null = IMAGE_EXTENSIONS.has(extension)
        ? "image"
        : VIDEO_EXTENSIONS.has(extension)
          ? "video"
          : null;
      if (!kind) return [];

      const relativePath = path.relative(root, absolutePath).split(path.sep).join("/");
      const encodedPath = relativePath.split("/").map(encodeURIComponent).join("/");
      return [{
        id: `public-memory:${relativePath}`,
        name: path.basename(entry.name, extension),
        src: `/memories/${encodedPath}`,
        kind,
      }];
    })
    .sort((a, b) => a.id.localeCompare(b.id, "fr", { numeric: true }));
}

function publicMemoriesPlugin(): Plugin {
  return {
    name: "jenny-public-memories",
    resolveId(id) {
      return id === VIRTUAL_MEMORIES_ID ? RESOLVED_MEMORIES_ID : undefined;
    },
    load(id) {
      if (id !== RESOLVED_MEMORIES_ID) return undefined;
      return `export const PUBLIC_MEMORIES = ${JSON.stringify(scanMemoryFiles(memoriesDirectory))};`;
    },
    configureServer(server) {
      server.watcher.add(memoriesDirectory);
      const reloadMemories = (file: string) => {
        const relativePath = path.relative(memoriesDirectory, file);
        if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) return;
        const module = server.moduleGraph.getModuleById(RESOLVED_MEMORIES_ID);
        if (module) server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.on("add", reloadMemories);
      server.watcher.on("unlink", reloadMemories);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  // Temporary Jenny gate/data values are intentionally exposed for the birthday
  // version. All three are recoverable from the generated browser bundle.
  envPrefix: ["VITE_", "EMAIL_JENNY", "PASSWORD_JENNY", "JENNY_DATA_TOKEN"],
  plugins: [publicMemoriesPlugin(), react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
