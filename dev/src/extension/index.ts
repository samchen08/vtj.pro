import { widgetManager, type AppWidget, type ExtensionFactory } from '@vtj/pro';
import { type App } from 'vue';
import { VtjIconDatabase } from '@vtj/icons';
import { request, jsonp } from '@vtj/utils';
import { AdapterPlugin } from '@vtj/ui';
import Meta from './Meta.vue';

const meta: AppWidget = {
  type: 'app',
  label: '数据配置',
  name: 'Meta',
  region: 'Apps',
  openType: 'panel',
  icon: VtjIconDatabase,
  component: Meta,
  order: 5
};
widgetManager.register(meta);

request.useRequest((req: any) => {
  req.headers = Object.assign({}, req.headers || {}, { abc: 'abc' });
  return req;
});

const factory: ExtensionFactory = () => {
  return {
    adapter: {
      request,
      jsonp
    },
    install(app: App, engine: any) {
      console.log('ExtensionFactory install', app, engine);
      app.use(AdapterPlugin, {
        uploader: () => {
          console.log('custom uploader');
        }
      });
    }
  };
};

export default factory;
