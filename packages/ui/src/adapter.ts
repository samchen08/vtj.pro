import { type Plugin, type App, type InjectionKey, inject } from 'vue';
export const ADAPTER_KEY: InjectionKey<Adapter> = Symbol('ADAPTER_KEY');

export interface UploaderResponse {
  url: string;
  name?: string;
  [index: string]: any;
}

export type Uploader = (
  file: File
) => Promise<string | UploaderResponse | null>;

export function useAdapter() {
  return inject(ADAPTER_KEY, {} as Adapter);
}

export interface Adapter {
  uploader?: Uploader;
}

export const AdapterPlugin: Plugin = {
  install(app: App, options: Adapter = {}) {
    app.provide(ADAPTER_KEY, options);
  }
};
