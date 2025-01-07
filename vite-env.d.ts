interface ImportMetaEnv {
  readonly VITE_API_URL_V1: string;
  readonly VITE_API_URL_PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}