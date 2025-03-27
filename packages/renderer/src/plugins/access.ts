import { type InjectionKey, type App, inject } from 'vue';
import type {
  Router,
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router';
import {
  storage,
  cookie,
  toArray,
  Request,
  delay,
  unRSA,
  isFunction,
  isString
} from '@vtj/utils';
import { ContextMode, PAGE_ROUTE_NAME } from '../constants';

export interface AccessOptions {
  /**
   * 开启session, token 储存到cookie，关闭浏览器将登录失效
   */
  session: boolean;

  /**
   * 请求头和cookie记录token名称
   */
  authKey: string;

  /**
   * 本地缓存key前缀
   */
  storagePrefix: string;

  /**
   * 本地缓存key
   */
  storageKey: string;

  /**
   * 路由拦截白名单
   */
  whiteList?: string[] | ((to: RouteLocationNormalized) => boolean);

  /**
   * 未授权页面路由路径
   */
  unauthorized?: string | (() => void);

  /**
   * 授权登录页面 pathname
   */
  auth?: string | ((search: string) => void);

  /**
   * 判断是否登录页面
   * @param path
   * @returns
   */
  isAuth?: (to: RouteLocationNormalized) => boolean;

  /**
   * 重定向参数名
   */
  redirectParam?: string;

  /**
   * 未登录响应状态码
   */
  unauthorizedCode?: number;

  /**
   * 提示信息方法
   * @param message
   * @returns
   */
  alert?: (message: string, options?: Record<string, any>) => Promise<any>;

  /**
   * 未登录提示文本
   */
  unauthorizedMessage?: string;

  /**
   * 无权限提示
   */
  noPermissionMessage?: string;

  /**
   * RSA解密私钥
   */
  privateKey?: string;

  /**
   * 应用编码
   */
  appName?: string;
}

export interface AccessData {
  token: string;
  permissions: Record<string, boolean>;
  [index: string]: any;
}

export interface AccessConnectParams {
  /**
   * 请求类
   */
  request?: Request | null;
  /**
   * 路由
   */
  router?: Router | null;

  /**
   * 模式
   */
  mode?: ContextMode;
}

const defaults: AccessOptions = {
  session: false,
  authKey: 'Authorization',
  storageKey: 'ACCESS_STORAGE',
  storagePrefix: '__VTJ_',
  unauthorized: undefined,
  auth: '/#/login',
  redirectParam: 'r',
  unauthorizedCode: 401,
  unauthorizedMessage: '登录已经失效，请重新登录！',
  noPermissionMessage: '无权限访问该页面',
  appName: ''
};

export const ACCESS_KEY: InjectionKey<Access> = Symbol('access');

export class Access {
  public options: AccessOptions;
  private data: AccessData | null = null;
  private mode?: ContextMode = ContextMode.Raw;
  private interceptResponse: boolean = true;
  constructor(options: Partial<AccessOptions>) {
    this.options = Object.assign({}, defaults, options);
    this.loadData();
  }

  enableIntercept() {
    this.interceptResponse = true;
  }
  disableIntercept() {
    this.interceptResponse = false;
  }

  connect(params: AccessConnectParams) {
    const { mode, router, request } = params;
    this.mode = mode;
    if (router && this.mode === ContextMode.Raw) {
      this.setGuard(router);
    }
    if (request) {
      this.setRequest(request);
    }
  }

  login(data: AccessData | string | string[]) {
    const { storageKey, storagePrefix, session, authKey } = this.options;
    this.setData(data);
    if (!this.data) return;

    storage.save(storageKey, data, {
      type: 'local',
      prefix: storagePrefix
    });
    if (session) {
      cookie.set(authKey, this.data.token);
    }
  }

  clear() {
    const { storageKey, storagePrefix, session, authKey } = this.options;
    this.data = null;
    storage.remove(storageKey, {
      type: 'local',
      prefix: storagePrefix
    });
    if (session) {
      cookie.remove(authKey);
    }
  }

  logout() {
    this.clear();
    this.toLogin();
  }

  getData() {
    if (this.data) {
      return this.data;
    }
    this.loadData();
    return this.data;
  }

  getToken() {
    if (!this.data) {
      this.loadData();
    }
    return this.data?.token;
  }

  can(code: string | string[] | ((p: Record<string, boolean>) => boolean)) {
    const { appName } = this.options;
    const { permissions = {} } = this.data || {};
    if (typeof code === 'function') {
      return code(permissions);
    }
    const codes = toArray(code);
    return codes.every((n) => permissions[n] || permissions[appName + '.' + n]);
  }

  some(code: string | string[]) {
    const { appName } = this.options;
    const { permissions = {} } = this.data || {};
    const codes = toArray(code);
    return codes.some((n) => permissions[n] || permissions[appName + '.' + n]);
  }

  install(app: App) {
    app.config.globalProperties.$access = this;
    app.provide(ACCESS_KEY, this);
  }

  private isAuthPath(to: RouteLocationNormalized) {
    const { auth, isAuth } = this.options;
    if (isAuth) {
      return isAuth(to);
    }
    if (to.path && typeof auth === 'string') {
      const path = auth.split('#')[1] || auth;
      return to.path === path;
    }
    return false;
  }

  private toLogin() {
    const { auth, redirectParam } = this.options;
    if (!auth) return;
    // if (this.mode === ContextMode.Design) return;
    const search = redirectParam
      ? `?${redirectParam}=${encodeURIComponent(location.href)}`
      : '';
    if (typeof auth === 'function') {
      auth(search);
    } else {
      location.href = redirectParam ? `${auth}${search}` : auth;
    }
  }

  private setData(data: any) {
    const { privateKey } = this.options;
    if (Array.isArray(data) && privateKey) {
      const contents = data.map((n) => unRSA(n, privateKey));
      try {
        this.data = JSON.parse(contents.join(''));
      } catch (e) {
        console.warn(e);
      }
      return;
    }
    if (typeof data === 'string') {
      try {
        const content = privateKey ? unRSA(data, privateKey) : data;
        if (content) {
          this.data = JSON.parse(content);
        } else {
          console.warn('RSA解密失败或登录信息缺失');
        }
      } catch (e) {
        console.warn(e);
      }
    } else {
      this.data = data;
    }
  }

  private loadData() {
    const { storageKey, storagePrefix } = this.options;
    const data = storage.get(storageKey, {
      type: 'local',
      prefix: storagePrefix
    });

    this.setData(data || null);
  }

  private isLogined() {
    const { session, authKey } = this.options;
    if (session && authKey) {
      return !!cookie.get(authKey);
    }
    return !!this.getToken();
  }

  private hasRoutePermission(to: RouteLocationNormalized) {
    if (to.name === PAGE_ROUTE_NAME) {
      const id = to.params.id;
      return id && this.can(id);
    }
    return true;
  }

  private setGuard(router: Router) {
    router.beforeEach((to, _from, next) => this.guard(to, next));
  }

  private async guard(to: RouteLocationNormalized, next: NavigationGuardNext) {
    if (this.isWhiteList(to) || this.isAuthPath(to)) {
      return next();
    }

    if (this.isLogined()) {
      if (this.hasRoutePermission(to)) {
        return next();
      } else {
        const { noPermissionMessage = '无权限访问', unauthorized = false } =
          this.options;
        await this.showTip(noPermissionMessage);
        if (isFunction(unauthorized)) {
          unauthorized();
          return next(false);
        } else if (isString(unauthorized)) {
          return next(unauthorized);
        } else {
          return next(false);
        }
      }
    }
    next(false);
    this.toLogin();
  }

  private isWhiteList(to: RouteLocationNormalized) {
    const { whiteList } = this.options;
    if (!whiteList) return false;
    if (Array.isArray(whiteList)) {
      return whiteList.some((n) => to.fullPath.startsWith(n));
    } else {
      return whiteList(to);
    }
  }

  private isUnauthorized(res: any) {
    const { unauthorizedCode = 401 } = this.options;
    return (
      res.status === unauthorizedCode || res.data?.code === unauthorizedCode
    );
  }

  private async showUnauthorizedAlert(res: any) {
    const { unauthorizedMessage = '登录已失效' } = this.options;
    if (this.isUnauthorized(res)) {
      await this.showTip(unauthorizedMessage);
      this.toLogin();
    }
  }

  private async showTip(content: string) {
    const { alert } = this.options;
    if (alert) {
      // 延时是为了提示层渲染在loading的层级之上
      await delay(150);
      return await alert(content, {
        title: '提示',
        type: 'warning'
      }).catch(() => false);
    }
    return false;
  }

  private setRequest(request: Request) {
    request.useRequest((req) => {
      const token = this.data?.token;
      if (token) {
        req.headers[this.options.authKey] = this.data?.token;
      }
      return req;
    });
    request.useResponse(
      async (res) => {
        if (!this.interceptResponse) return res;
        await this.showUnauthorizedAlert(res);
        return res;
      },
      async (err) => {
        if (!this.interceptResponse) return Promise.reject(err);
        const res = err.response || err || {};
        await this.showUnauthorizedAlert(res);
        return Promise.reject(err);
      }
    );
  }
}

export function useAccess() {
  const access = inject(ACCESS_KEY, null);
  if (!access) {
    // console.warn(`access is null`);
  }
  return access as Access;
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $access: Access;
  }
}
