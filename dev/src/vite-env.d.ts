/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '@vtj/engine/coder';

declare module '@vtj/engine/shared' {
  export * from '@vtj/engine/types/shared';
}
