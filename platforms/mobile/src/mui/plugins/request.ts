import { type App, type Plugin, type InjectionKey, provide, inject } from 'vue';
import {
  request,
  merge,
  type AxiosResponse,
  type IRequestConfig
} from '@vtj/utils';
export const requestPluginKey: InjectionKey<typeof request> = Symbol();

const defaults: IRequestConfig = {
  settings: {
    validSuccess: true,
    failMessage: true,
    validate: (res: AxiosResponse) => {
      return !!res.data.success;
    },
    showError: (msg: string) => {
      uni.showToast({
        title: msg,
        icon: 'none'
      });
    }
  }
};

export const RequestPlugin: Plugin = {
  install(app: App, config?: IRequestConfig) {
    const { $request } = app.config.globalProperties;
    if ($request) {
      console.warn('$reqeust已注册');
      return;
    }
    request.setConfig(merge({}, defaults, config || {}));
    provide(requestPluginKey, request);
    app.config.globalProperties.$request = request;
  }
};

export function useReqeust() {
  const $request = inject(requestPluginKey);
  if (!$request) {
    console.warn('$reqeust未注册');
  }
  return $request as typeof request;
}
