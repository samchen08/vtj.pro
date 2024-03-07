import { type App, type Plugin, type InjectionKey, inject } from 'vue';
import type { InternalAxiosRequestConfig, AxiosAdapter } from 'axios';
import settle from 'axios/lib/core/settle';
import buildURL from 'axios/lib/helpers/buildURL';
import {
  request,
  merge,
  type AxiosResponse,
  type IRequestConfig
} from '@vtj/utils';
export const requestPluginKey: InjectionKey<typeof request> = Symbol();

const adapter: AxiosAdapter = (config: InternalAxiosRequestConfig) => {
  const { method, headers = {}, responseType } = config;
  return new Promise((resolve, reject) => {
    const url =
      config.baseURL ||
      '' + buildURL(config.url, config.params, config.paramsSerializer);
    uni.request({
      url,
      method: method?.toUpperCase() as any,
      header: { ...headers },
      data: config.data,
      responseType,
      complete: (response: any) => {
        const { data, statusCode, errMsg, header } = response;
        const res = {
          data,
          status: statusCode,
          errMsg,
          header,
          headers: header,
          config
        };
        settle(resolve, reject, res);
      }
    });
  });
};

let isLoading = false;

const defaults: IRequestConfig = {
  settings: {
    validSuccess: true,
    failMessage: true,
    originResponse: true,
    validate: (res: AxiosResponse) => {
      return res.data?.code === 0;
    },
    showError: (msg: string) => {
      uni.showToast({
        title: msg,
        icon: 'none'
      });
    },
    showLoading: () => {
      if (isLoading) {
        isLoading = false;
        uni.hideLoading();
      }
      uni.showLoading({
        success: () => {
          isLoading = true;
        }
      });
    },
    hideLoading: () => {
      if (!isLoading) return;
      uni.hideLoading();
      isLoading = false;
    }
  },
  adapter
};

export const RequestPlugin: Plugin = {
  install(app: App, config?: IRequestConfig) {
    const { $request } = app.config.globalProperties;
    if ($request) {
      console.warn('$reqeust已注册');
      return;
    }
    request.setConfig(merge({}, defaults, config || {}));
    app.provide(requestPluginKey, request);
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
