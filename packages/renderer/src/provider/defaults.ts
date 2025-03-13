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
  remote?: string;
}

export interface ProvideAdapter {
  request: IStaticRequest;
  jsonp: Jsonp;
  metaQuery?: (...args: any[]) => Promise<any>;
  access?: Access;
  startupComponent?: any;
  /**
   * 远程服务 host
   */
  remote?: string;
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
    remote = 'https://lcdp.vtj.pro'
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
    startupComponent: Startup,
    remote,
    access: access ? createAccess(access) : undefined
  } as ProvideAdapter;
}

export function createAccess(options: Partial<AccessOptions> = {}) {
  const opts: Partial<AccessOptions> = {
    storageKey: 'RRO_IDE_ACCESS_STORAGE__',
    auth: 'https://lcdp.vtj.pro/auth.html',
    privateKey:
      'MIIBOgIBAAJBAKoIzmn1FYQ1YOhOBw9EhABxZ+PySAIaydI+zdhoKflrdgJ4A5E4/5gbQmRpk09hPWG8nvX7h+l/QLU8kXxAIBECAwEAAQJAAlgpxQY6sByLsXqzJcthC8LSGsLf2JEJkHwlnpwFqlEV8UCkoINpuZ2Wzl+aftURu5rIfAzRCQBvHmeOTW9/zQIhAO5ufWDmnSLyfAAsNo5JRNpVuLFCFodR8Xm+ulDlosR/AiEAtpAltyP9wmCABKG/v/hrtTr3mcvFNGCjoGa9bUAok28CIHbrVs9w1ijrBlvTsXYwJw46uP539uKRRT4ymZzlm9QjAiB+1KH/G9f9pEEL9rtaSOG7JF5D0JcOjlze4MGVFs+ZrQIhALKOUFBNr2zEsyJIjw2PlvEucdlG77UniszjXTROHSPd'
  };
  return new Access(Object.assign(opts, options));
}
