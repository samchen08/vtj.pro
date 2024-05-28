/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: any;
  }
}

declare module global {
  interface Window {}
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $uploader: any;
    $reqeust: any;
    $apis: any;
    $libs: any;
  }
}

export {};
