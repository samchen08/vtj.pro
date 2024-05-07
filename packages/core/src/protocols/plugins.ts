import { type DefineComponent } from 'vue';

export interface BlockPlugin {
  component: DefineComponent<any, any, any, any> | Record<string, any>;
  css: string[];
}
