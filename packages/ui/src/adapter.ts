import { type Plugin, type App, type InjectionKey, inject } from 'vue';
export const ADAPTER_KEY: InjectionKey<Adapter> = Symbol('ADAPTER_KEY');

export function useAdapter() {
  return inject(ADAPTER_KEY, {} as Adapter);
}

export interface Adapter {
  uploader?: (file: File) => Promise<string>;
}

export const AdapterPlugin: Plugin = {
  install(app: App, options: Adapter = {}) {
    app.provide(ADAPTER_KEY, options);
  }
};
