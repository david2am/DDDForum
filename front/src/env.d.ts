/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly PUBLIC_CLIENT_BASE_URL: string;
    readonly PUBLIC_BACKEND_BASE_URL: string;
  }
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}