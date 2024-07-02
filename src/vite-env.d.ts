/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VIE_APP_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
