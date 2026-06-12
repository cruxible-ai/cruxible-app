/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CRUXIBLE_API_BASE_URL?: string;
  readonly VITE_CRUXIBLE_API_TOKEN?: string;
  readonly VITE_CRUXIBLE_INSTANCE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
