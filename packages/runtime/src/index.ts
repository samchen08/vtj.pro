import * as Vue from 'vue';
import { ProviderOptions } from './Provider';

export * from './Provider';
export * from './hooks';
export * from './shared';

window.Vue = Vue;
declare global {
  interface Window {
    Vue: any;
    __VTJ_PROVIDER_OPTIONS__: ProviderOptions;
    __VTJ_MODULES__: Record<string, () => Promise<any>>;
  }
}
