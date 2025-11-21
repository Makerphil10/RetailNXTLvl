/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string; // deine Variable
  // weitere VITE_* Variablen hier ergänzen
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}