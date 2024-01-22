/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'vue-router' {
  interface RouteMeta {
    mask?: boolean;
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: any;
  }
}

declare module global {
  interface Window {}
}
