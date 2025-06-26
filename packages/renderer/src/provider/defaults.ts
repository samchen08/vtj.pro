import type { MaybeRef, Ref } from 'vue';
import {
  createRequest,
  jsonp,
  type IRequestSettings,
  type IStaticRequest,
  type Jsonp
} from '@vtj/utils';

import { Access, type AccessOptions } from '../plugins';

export type UseTitle = (
  newTitle?: MaybeRef<string | null | undefined>,
  options?: Record<string, any>
) => Ref<string | null | undefined>;

export interface CreateAdapterOptions {
  notify?: (msg: string) => void;
  loading?: () => any;
  settings?: IRequestSettings;
  Startup?: any;
  access?: Partial<AccessOptions>;
  useTitle?: UseTitle;
  alert?: (msg: string, opt?: any) => any;
}

export interface ProvideAdapter {
  request: IStaticRequest;
  jsonp: Jsonp;
  metaQuery?: (...args: any[]) => Promise<any>;
  access?: Access;
  startupComponent?: any;
  useTitle?: UseTitle;
  [index: string]: any;
}

export function createAdapter(options: CreateAdapterOptions = {}) {
  const {
    notify,
    loading,
    settings = {},
    Startup,
    access,
    useTitle,
    alert
  } = options;
  let _loading: any = null;
  const request = createRequest({
    settings: {
      type: 'form',
      validSuccess: true,
      originResponse: false,
      loading: true,
      validate: (res: any) => {
        return res.data?.code === 0 || !!res.data?.success;
      },
      failMessage: true,
      showError: (msg: string) => {
        if (notify) {
          notify(msg || '未知错误');
        }
      },
      showLoading: () => {
        if (_loading) {
          _loading.close();
        }
        if (loading) {
          _loading = loading();
        }
      },
      hideLoading: () => {
        if (_loading) {
          _loading.close();
          _loading = null;
        }
      },
      ...settings
    }
  });
  return {
    request,
    jsonp,
    notify,
    loading,
    useTitle,
    startupComponent: Startup,
    access: access ? new Access({ alert, ...access }) : undefined
  } as ProvideAdapter;
}

export function createAccess(options: Partial<AccessOptions> = {}) {
  return new Access(options);
}
