/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare namespace NodeJS {
  interface ProcessEnv {
    ENV_TYPE?: string;
    [key: string]: any;
  }
}

declare module global {
  interface Window {}
}
