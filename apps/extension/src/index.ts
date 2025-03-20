import type { App } from 'vue';
import type { ExtensionOutput, VTJConfig, Engine } from '@vtj/pro';
import * as __VTJ_PRO__ from '@vtj/pro';

const { widgetManager, LocalService } = __VTJ_PRO__;

class RemoteService extends LocalService {
  //
}

const service = new RemoteService();

// 更换Logo Widget组件的图片
widgetManager.set('Logo', {
  props: {
    icon: 'https://gitee.com/static/images/logo-en.svg'
  }
});

/**
 *  在此处实现自定义
 */

export default (_config: VTJConfig, ..._args: any[]) => {
  const options: ExtensionOutput = {
    service,
    install(_app: App, _engine?: Engine) {
      // console.log('install', app, engine);
    }
  };
  return options;
};
