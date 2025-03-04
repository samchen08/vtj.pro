import { ref, type Ref } from 'vue';
import axios from 'axios';
import type {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosResponse,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
  InternalAxiosRequestConfig,
  CancelTokenSource
} from 'axios';
import {
  merge,
  omit,
  debounce,
  throttle,
  uuid,
  pathToRegexpCompile,
  isUrl
} from '@vtj/base';

const TYPES = {
  form: 'application/x-www-form-urlencoded',
  json: 'application/json',
  data: 'multipart/form-data'
};
const DATA_METHODS = ['put', 'post', 'patch'];
const LOCAL_REQUEST_ID = 'Local-Request-Id';
const LOADING_DELAY = 100;
const ERROR_DELAY = 300;

export interface IRequestSkipWarn {
  // 处理程序
  executor: (
    resolve: (value: unknown) => void,
    reject: (reason?: any) => void
  ) => void;
  // 响应编码
  code: string | number;
  // 参数名称
  name?: string;
  // 响应数据成功回调
  callback?: (res: AxiosResponse) => void;
  // 请求完成回调
  complete?: () => void;
}

export interface IRequestSkipWarnResponse extends AxiosResponse {
  promise: any;
}

export interface IResultWrapper<T = any> {
  code: number;
  data: T;
  msg: string;
  success: boolean;
}

export type RequestOriginResponse<R = any, D = any> = AxiosResponse<
  IResultWrapper<R>,
  D
>;

export interface IRequestSettings {
  /**
   * 发送数据类型
   */
  type?: 'form' | 'json' | 'data';

  /**
   *  是否注入自定义的请求头
   */
  injectHeaders?: boolean;

  /**
   * 自定义请求头
   */
  headers?:
    | RawAxiosRequestHeaders
    | ((
        id: string,
        config: AxiosRequestConfig,
        settings: IRequestSettings
      ) => RawAxiosRequestHeaders);
  /**
   * 是否显示 loading
   */
  loading?: boolean;

  /**
   * 显示 loading
   */
  showLoading?: () => void;
  /**
   * 关闭 loading
   */
  hideLoading?: () => void;

  /**
   * 显示失败提示
   */
  failMessage?: boolean;

  /**
   * 自定义失败提示
   */
  showError?: (msg: string, e: any) => void;

  /**
   *  返回原始 axios 响应对象
   */
  originResponse?: boolean;

  /**
   * 校验响应成功
   */
  validSuccess?: boolean;

  /**
   * 自定义校验方法
   */
  validate?: (res: AxiosResponse) => boolean;

  /**
   * 请求响应警告执行程序插件
   */
  skipWarn?: IRequestSkipWarn;

  /**
   * 其他自定义扩展参数
   */
  [index: string]: any;
}

export interface IRequestOptions extends CreateAxiosDefaults {
  settings?: IRequestSettings;
}

export interface IRequestConfig<D = any> extends AxiosRequestConfig<D> {
  settings?: IRequestSettings;
  // url path 参数对象
  query?: Record<string, any>;
}

export interface IRequestRecord {
  settings: IRequestSettings;
  config: AxiosRequestConfig;
  source: CancelTokenSource;
}

export type IRequest<R = any, D = any> = (
  config?: IRequestConfig<D>
) => Promise<R>;

export class Request {
  axios: AxiosInstance;
  settings: IRequestSettings;
  records: Record<string, IRequestRecord> = {};
  isLoading: boolean = false;
  private stopSkipWarn?: () => void;
  private showLoading: (settings: IRequestSettings) => void;
  private showError: (settings: IRequestSettings, e: any) => void;
  constructor(options: IRequestOptions = {}) {
    this.settings = Object.assign({ type: 'form' }, options.settings || {});
    const defaults = omit<IRequestOptions, CreateAxiosDefaults>(options, [
      'settings',
      'query'
    ]);
    this.axios = axios.create(
      merge(
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          timeout: 2 * 60 * 1000
        },
        defaults
      )
    );
    this.setupSkipWarn(this.settings);
    this.showLoading = debounce(this.openLoading.bind(this), LOADING_DELAY);
    this.showError = throttle(this._showError.bind(this), ERROR_DELAY, {
      leading: true,
      trailing: false
    });
  }

  setConfig(options: IRequestOptions = {}) {
    this.settings = merge(this.settings, options.settings || {});
    const defaults = omit<IRequestOptions, CreateAxiosDefaults>(options, [
      'settings',
      'query'
    ]);
    this.axios.defaults = merge(this.axios.defaults, defaults);
    this.setupSkipWarn(this.settings);
  }

  cancel(id?: string, message: string = '请求已取消') {
    // 取消对应id单独请求
    if (id) {
      const record = this.records[id];
      if (!record) return;
      record.source.cancel(message);
    } else {
      // 不指定id，取消全部未完成的请求
      for (const record of Object.values(this.records)) {
        record.source.cancel(message);
      }
    }
  }

  private createHeaders(
    id: string,
    settings: IRequestSettings,
    config: AxiosRequestConfig
  ) {
    const injectHeaders = settings.injectHeaders
      ? typeof settings.headers === 'function'
        ? settings.headers(id, config, settings)
        : settings.headers || {}
      : {};

    const headers: RawAxiosRequestHeaders = {
      'Content-Type': TYPES[settings.type || 'form'],
      ...config.headers,
      ...injectHeaders
    };

    if (settings.skipWarn) {
      headers[LOCAL_REQUEST_ID] = id;
    }
    return headers;
  }

  private isJsonType(headers: RawAxiosRequestHeaders) {
    return Object.entries(headers).some(([k, v]) => {
      return (
        k.toLowerCase() === 'content-type' &&
        String(v).includes('application/json')
      );
    });
  }

  private toFormData<T extends object>(
    data: T,
    type: string = 'data'
  ): FormData | URLSearchParams {
    if (data instanceof FormData || data instanceof URLSearchParams)
      return data;
    const params = type === 'data' ? new FormData() : new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      params.append(key, value);
    });
    return params;
  }

  private createSendData(
    settings: IRequestSettings,
    config: AxiosRequestConfig,
    headers: RawAxiosRequestHeaders,
    isSkipWarn: boolean,
    query: Record<string, any> = {}
  ) {
    const { type, skipWarn } = settings;
    const { name = 'skipWarn' } = skipWarn || {};
    let { data, params = {}, method = 'get' } = config;
    const skip = isSkipWarn ? { [name]: true } : {};

    if (DATA_METHODS.includes(method.toLowerCase())) {
      data = Object.assign(data || {}, skip);
      data =
        type !== 'json' || !this.isJsonType(headers)
          ? this.toFormData(data, type)
          : data;
      params = {
        ...query
      };
    } else {
      if (type === 'form') {
        params = {
          ...(data || {}),
          ...query,
          ...skip
        };
      } else {
        if (data && (type !== 'json' || !this.isJsonType(headers))) {
          data = this.toFormData(data, type);
        }
        params = {
          ...query,
          ...skip
        };
      }
    }

    return {
      data,
      params
    };
  }

  private createUrl(config: AxiosRequestConfig) {
    let { url, params } = config;
    if (url) {
      let origin = isUrl(url) ? new URL(url).origin : '';
      const path = origin ? url.replace(origin, '') : url;
      try {
        const toPath = pathToRegexpCompile(path, {
          encode: encodeURIComponent
        });
        return origin + toPath(params || {});
      } catch (e) {
        console.warn('createUrl', 'pathToRegexpCompile error', url);
      }
    }
    return url;
  }

  private openLoading(settings: IRequestSettings) {
    const { loading, showLoading } = settings;
    if (!loading) return;
    if (showLoading) {
      const records = Object.keys(this.records);
      if (records.length > 0) {
        this.isLoading = true;
        showLoading();
      }
    }
  }

  private closeLoading(settings: IRequestSettings) {
    const { loading, hideLoading } = settings;
    if (!loading) return;
    this.isLoading = false;
    const records = Object.keys(this.records);
    if (hideLoading && records.length === 0) {
      this.isLoading = false;
      hideLoading();
    }
  }

  private _showError(settings: IRequestSettings, e: any) {
    const { failMessage, showError } = settings;
    if (failMessage && showError) {
      const data = e.response?.data;
      const msg =
        data?.message || data?.msg || e?.message || e?.msg || '未知错误';
      showError(msg, e);
    }
  }

  private validResponse(settings: IRequestSettings, res: AxiosResponse) {
    const { validSuccess, validate } = settings;
    if (validSuccess && validate) {
      return !!validate(res);
    }
    return true;
  }

  private isSkipWarnResponse(res: any): res is IRequestSkipWarnResponse {
    return !!res.promise;
  }

  send<R = any, D = any>(
    options: IRequestConfig<D> = {},
    isSkipWarn: boolean = false
  ) {
    const settings = merge({}, this.settings, options.settings || {});
    const query = options.query || {};
    const config = omit<IRequestConfig<D>, AxiosRequestConfig<D>>(options, [
      'settings',
      'query'
    ]);
    const id = uuid(false);
    const source = axios.CancelToken.source();
    this.records[id] = { settings, config, source };
    const url = this.createUrl(config);
    const headers = this.createHeaders(id, settings, config);
    const { data, params } = this.createSendData(
      settings,
      config,
      headers,
      isSkipWarn,
      query
    );
    this.showLoading(settings);
    return new Promise<R>((resolve, reject) => {
      this.axios({
        cancelToken: source.token,
        ...config,
        url,
        headers,
        data,
        params
      })
        .then((res) => {
          if (this.isSkipWarnResponse(res)) {
            return resolve(res.promise);
          }
          if (this.validResponse(settings, res)) {
            return resolve(settings.originResponse ? res : res.data?.data);
          } else {
            this.showError(settings, res.data);
            return reject(res.data);
          }
        })
        .catch((e) => {
          this.showError(settings, e);
          return reject(e);
        })
        .finally(() => {
          delete this.records[id];
          this.closeLoading(settings);
        });
    });
  }

  useResponse(
    onFulfilled?:
      | ((value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>)
      | null,
    onRejected?: ((error: any) => any) | null
  ) {
    const { response } = this.axios.interceptors;
    const id = response.use(onFulfilled, onRejected);
    return () => response.eject(id);
  }

  useRequest(
    onFulfilled?:
      | ((
          value: InternalAxiosRequestConfig
        ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>)
      | null,
    onRejected?: ((error: any) => any) | null
  ) {
    const { request } = this.axios.interceptors;
    const id = request.use(onFulfilled, onRejected);
    return () => request.eject(id);
  }

  private setupSkipWarn(settings: IRequestSettings) {
    if (this.stopSkipWarn) {
      this.stopSkipWarn();
      this.stopSkipWarn = undefined;
    }
    if (!settings.skipWarn) return;
    const { code, executor, callback, complete } = settings.skipWarn;
    this.stopSkipWarn = this.useResponse((res) => {
      const headers: Record<string, any> = res.config.headers || {};
      const id = headers[LOCAL_REQUEST_ID] as string;
      const requestCache = this.records[id];
      if (!requestCache) return res;

      const { data } = res;
      if (!data || typeof data !== 'object') return res;
      if (data?.code === code) {
        callback && callback(res);
        const promise = new Promise(executor).then(() => {
          return this.send(
            {
              ...requestCache.config,
              settings: requestCache.settings
            },
            true
          );
        });
        promise
          .catch((e) => e)
          .finally(() => {
            complete && complete();
          });

        (res as IRequestSkipWarnResponse).promise = promise;
      }
      return res;
    });
  }
}

export interface IStaticRequest<R = any, D = any> extends Request {
  (options: IRequestConfig<D>): Promise<R>;
  instance: Request;
}

export function createRequest(options: IRequestOptions = {}): IStaticRequest {
  const request = new Request(options);
  const send = request.send.bind(request);
  const cancel = request.cancel.bind(request);
  const setConfig = request.setConfig.bind(request);
  const useRequest = request.useRequest.bind(request);
  const useResponse = request.useResponse.bind(request);
  return Object.assign(send, {
    ...request,
    instance: request,
    send,
    cancel,
    setConfig,
    useRequest,
    useResponse
  }) as IStaticRequest;
}

export const request: IStaticRequest = createRequest({
  settings: {
    injectHeaders: true,
    loading: true,
    originResponse: true
  }
});

export function createApi<R = any, D = any>(config: string | IRequestConfig) {
  const _conifg: IRequestConfig =
    typeof config === 'string' ? { url: config } : config;
  return (data?: D, opts?: IRequestConfig) =>
    request.send<R, D>(merge({}, _conifg, opts || {}, { data }));
}

export interface IApiMap {
  [name: string]: string | IRequestConfig;
}

export function createApis(map: IApiMap) {
  const apis: Record<string, ReturnType<typeof createApi>> = {};
  for (const [name, opts] of Object.entries(map)) {
    apis[name] = createApi(opts);
  }
  return apis;
}

export interface UseApiReturn<R = any> {
  data: Ref<R | null>;
  error: Ref<any>;
  loading: Ref<boolean>;
}

export function useApi<R = any>(
  api: Promise<R>,
  transform?: (res: any) => R
): UseApiReturn<R> {
  const data: Ref<R | null> = ref(null);
  const error = ref<any>();
  const loading = ref<boolean>(true);
  api
    .then((res: any) => {
      data.value = transform ? transform(res) : res;
    })
    .catch((err) => {
      error.value = err;
    })
    .finally(() => {
      loading.value = false;
    });
  return {
    data,
    error,
    loading
  };
}

export {
  axios,
  LOCAL_REQUEST_ID,
  type AxiosRequestConfig,
  type AxiosResponse,
  type RawAxiosRequestHeaders
};
