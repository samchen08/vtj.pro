import type { App } from 'vue';
import type { Provider } from '@vtj/renderer';

export default function (app: App, provider: Provider) {
  console.log('VtjEnhance app', app, provider);
}
