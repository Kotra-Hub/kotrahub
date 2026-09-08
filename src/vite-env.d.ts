/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly VITE_APP_TITLE?: string;
  readonly VITE_API_URL?: string;
  readonly VITE_APP_NAME?: string;
  // Add other env variables you need
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
