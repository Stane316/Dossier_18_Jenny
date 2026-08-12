/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly EMAIL_JENNY?: string;
  readonly PASSWORD_JENNY?: string;
  readonly JENNY_DATA_TOKEN?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_APP_ENV?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "virtual:jenny-memories" {
  export type PublicMemoryAsset = {
    id: string;
    name: string;
    src: string;
    kind: "image" | "video";
  };

  export const PUBLIC_MEMORIES: readonly PublicMemoryAsset[];
}
