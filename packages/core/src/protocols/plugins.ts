import { type DefineComponent } from 'vue';

export interface BlockPluginExports {
  plugin: DefineComponent<any, any, any, any> | Record<string, any>;
  [index: string]: any;
}

export interface BlockPlugin {
  component: DefineComponent<any, any, any, any> | Record<string, any>;
  css: string[];
}
