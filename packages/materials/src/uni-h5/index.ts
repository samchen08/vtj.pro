import './style.scss';

import type { App } from 'vue';
//@ts-ignore
import { plugin } from '@dcloudio/uni-h5';
//@ts-ignore
export * from '@dcloudio/uni-h5';

export function install(app: App) {
  app.use(plugin);
}
