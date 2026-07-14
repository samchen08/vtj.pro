import { expect, test, describe, vi } from 'vitest';
import { Access } from '../src/plugins/access';

// Mock dependencies
vi.mock('@vtj/utils', async () => {
  const actual = await vi.importActual('@vtj/utils');
  return {
    ...actual,
    unRSA: vi.fn(),
    storage: {
      get: vi.fn().mockReturnValue(null),
      save: vi.fn(),
      remove: vi.fn()
    },
    cookie: {
      get: vi.fn().mockReturnValue(null),
      set: vi.fn(),
      remove: vi.fn()
    },
    delay: vi.fn().mockResolvedValue(undefined),
    toArray: (v: any) => (Array.isArray(v) ? v : [v])
  };
});

describe('Access - constructor', () => {
  test('creates with empty options', () => {
    const access = new Access({});
    expect(access.options).toBeDefined();
    expect(access.options.authKey).toBe('Authorization');
  });

  test('overrides defaults', () => {
    const access = new Access({ authKey: 'X-Token', session: true });
    expect(access.options.authKey).toBe('X-Token');
    expect(access.options.session).toBe(true);
  });
});

describe('Access - login/logout', () => {
  test('login saves data to storage', async () => {
    const { storage, cookie } = await import('@vtj/utils');
    const access = new Access({});
    access.login({ token: 'test123', permissions: { home: true } });
    expect(storage.save).toHaveBeenCalled();
  });

  test('login with session stores cookie', async () => {
    const { cookie } = await import('@vtj/utils');
    const access = new Access({ session: true });
    access.login({ token: 'session123', permissions: {} });
    expect(cookie.set).toHaveBeenCalled();
  });

  test('logout clears data and redirects', async () => {
    const { storage, cookie } = await import('@vtj/utils');
    const access = new Access({});
    access.logout();
    expect(storage.remove).toHaveBeenCalled();
  });
});

describe('Access - can/some', () => {
  test('can checks object permissions', () => {
    const access = new Access({});
    (access as any).data = { permissions: { home: true, about: false } };
    expect(access.can('home')).toBe(true);
    expect(access.can('about')).toBe(false);
  });

  test('can checks array permissions', () => {
    const access = new Access({});
    (access as any).data = { permissions: ['home', 'about'] };
    expect(access.can('home')).toBe(true);
    expect(access.can('settings')).toBe(false);
  });

  test('can with function', () => {
    const access = new Access({});
    (access as any).data = { permissions: { a: true } };
    const fn = (p: any) => p.a === true;
    expect(access.can(fn)).toBe(true);
  });

  test('can with appName prefix', () => {
    const access = new Access({ appName: 'myapp' });
    (access as any).data = { permissions: { 'myapp.home': true } };
    expect(access.can('home')).toBe(true);
  });

  test('can with multiple codes', () => {
    const access = new Access({});
    (access as any).data = { permissions: { a: true, b: true } };
    expect(access.can(['a', 'b'])).toBe(true);
    expect(access.can(['a', 'c'])).toBe(false);
  });

  test('some checks any permission', () => {
    const access = new Access({});
    (access as any).data = { permissions: { a: true, c: true } };
    expect(access.some(['a', 'b'])).toBe(true);
    expect(access.some(['b', 'd'])).toBe(false);
  });
});

describe('Access - isLogined/getToken/getData', () => {
  test('isLogined returns false when no token', () => {
    const access = new Access({});
    expect(access.isLogined()).toBe(false);
  });

  test('isLogined returns true when token exists', () => {
    const access = new Access({});
    (access as any).data = { token: 'abc123', permissions: {} };
    expect(access.isLogined()).toBe(true);
  });

  test('getToken returns token', () => {
    const access = new Access({});
    (access as any).data = { token: 'mytoken', permissions: {} };
    expect(access.getToken()).toBe('mytoken');
  });

  test('getData returns full data', () => {
    const access = new Access({});
    (access as any).data = { token: 't', permissions: {} };
    expect(access.getData()).toEqual({ token: 't', permissions: {} });
  });
});

describe('Access - install', () => {
  test('install sets global properties', () => {
    const access = new Access({});
    const app = {
      config: { globalProperties: {} },
      provide: vi.fn()
    } as any;
    access.install(app);
    expect(app.config.globalProperties.$access).toBe(access);
  });
});

describe('Access - intercept', () => {
  test('enableIntercept / disableIntercept', () => {
    const access = new Access({});
    access.disableIntercept();
    expect((access as any).interceptResponse).toBe(false);
    access.enableIntercept();
    expect((access as any).interceptResponse).toBe(true);
  });
});

describe('Access - login with string data', () => {
  test('login with string token', async () => {
    const { storage } = await import('@vtj/utils');
    const access = new Access({});
    access.login(JSON.stringify({ token: 'str123', permissions: {} }));
    expect(storage.save).toHaveBeenCalled();
  });
});

describe('Access - some with array permissions', () => {
  test('some with array permissions', () => {
    const access = new Access({});
    (access as any).data = { permissions: ['admin', 'user'] };
    expect(access.some(['admin'])).toBe(true);
    expect(access.some(['superadmin'])).toBe(false);
  });
});

describe('Access - clear with session', () => {
  test('clear removes cookie when session enabled', async () => {
    const { cookie } = await import('@vtj/utils');
    const access = new Access({ session: true });
    (access as any).data = { token: 'x', permissions: {} };
    (access as any).clear();
    expect(cookie.remove).toHaveBeenCalledWith('Authorization');
  });
});

describe('Access - isLogined with session', () => {
  test('isLogined checks cookie when session enabled', async () => {
    const { cookie } = await import('@vtj/utils');
    (cookie.get as any).mockReturnValue('session-token');
    const access = new Access({ session: true });
    expect(access.isLogined()).toBe(true);
    (cookie.get as any).mockReturnValue(null);
  });
});

describe('Access - connect', () => {
  test('connect sets mode and sets up guard when router provided', () => {
    const access = new Access({});
    const router = { beforeEach: vi.fn() } as any;
    const request = { useRequest: vi.fn(), useResponse: vi.fn() } as any;
    access.connect({ mode: 1 as any, router, request });
    expect((access as any).mode).toBe(1);
    expect(router.beforeEach).toHaveBeenCalled();
    expect(request.useRequest).toHaveBeenCalled();
    expect(request.useResponse).toHaveBeenCalled();
  });

  test('connect skips guard in Design mode', async () => {
    const access = new Access({});
    const router = { beforeEach: vi.fn() } as any;
    const { ContextMode } = await import('../src/constants');
    access.connect({ mode: ContextMode.Design, router });
    expect(router.beforeEach).not.toHaveBeenCalled();
  });
});

describe('Access - guard', () => {
  test('guard allows whitelisted routes', async () => {
    const access = new Access({ whiteList: ['/public'] });
    const next = vi.fn();
    const to = { fullPath: '/public/page', path: '/public/page' } as any;
    await (access as any).guard(to, next);
    expect(next).toHaveBeenCalledWith();
  });

  test('guard allows auth path routes', async () => {
    const access = new Access({ auth: '/#/login' });
    const next = vi.fn();
    const to = { path: '/login' } as any;
    await (access as any).guard(to, next);
    expect(next).toHaveBeenCalledWith();
  });

  test('guard allows logged-in user with permission', async () => {
    const access = new Access({});
    (access as any).data = { token: 'tok', permissions: { home: true } };
    const next = vi.fn();
    const to = { path: '/home', meta: { permission: 'home' } } as any;
    await (access as any).guard(to, next);
    expect(next).toHaveBeenCalledWith();
  });

  test('guard denies when no permission', async () => {
    const access = new Access({ noPermissionMessage: 'no access' });
    (access as any).data = { token: 'tok', permissions: {} };
    (access as any).isTipShowing = false;
    const next = vi.fn();
    const to = { path: '/admin', meta: { permission: 'admin' } } as any;
    await (access as any).guard(to, next);
    expect(next).toHaveBeenCalledWith(false);
  });

  test('guard redirects to unauthorized string', async () => {
    const access = new Access({
      unauthorized: '/no-auth',
      noPermissionMessage: 'no'
    });
    (access as any).data = { token: 'tok', permissions: {} };
    (access as any).isTipShowing = false;
    const next = vi.fn();
    const to = { path: '/restricted', meta: { permission: 'admin' } } as any;
    await (access as any).guard(to, next);
    expect(next).toHaveBeenCalledWith('/no-auth');
  });

  test('guard calls unauthorized function', async () => {
    const unauthFn = vi.fn();
    const access = new Access({
      unauthorized: unauthFn,
      noPermissionMessage: 'no'
    });
    (access as any).data = { token: 'tok', permissions: {} };
    (access as any).isTipShowing = false;
    const next = vi.fn();
    const to = { path: '/restricted', meta: { permission: 'admin' } } as any;
    await (access as any).guard(to, next);
    expect(unauthFn).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(false);
  });

  test('guard sends to login when not logged in', async () => {
    const access = new Access({ auth: '/#/login' });
    const next = vi.fn();
    const to = { path: '/home' } as any;
    const { delay } = await import('@vtj/utils');
    await (access as any).guard(to, next);
    expect(next).toHaveBeenCalledWith(false);
  });
});

describe('Access - isWhiteList', () => {
  test('isWhiteList returns false when no whitelist', () => {
    const access = new Access({});
    expect((access as any).isWhiteList({ fullPath: '/home' })).toBe(false);
  });

  test('isWhiteList with array checks prefix', () => {
    const access = new Access({ whiteList: ['/public'] });
    expect((access as any).isWhiteList({ fullPath: '/public/home' })).toBe(
      true
    );
    expect((access as any).isWhiteList({ fullPath: '/private' })).toBe(false);
  });

  test('isWhiteList with function', () => {
    const fn = vi.fn().mockReturnValue(true);
    const access = new Access({ whiteList: fn });
    const to = { fullPath: '/test' };
    expect((access as any).isWhiteList(to)).toBe(true);
    expect(fn).toHaveBeenCalledWith(to);
  });
});

describe('Access - isAuthPath', () => {
  test('isAuthPath with custom function', () => {
    const isAuth = vi.fn().mockReturnValue(true);
    const access = new Access({ isAuth });
    const to = { path: '/login' };
    expect((access as any).isAuthPath(to)).toBe(true);
  });

  test('isAuthPath returns false for non-matching', () => {
    const access = new Access({ auth: '/#/login' });
    expect((access as any).isAuthPath({ path: '/home' })).toBe(false);
  });
});

describe('Access - toLogin', () => {
  test('toLogin does nothing when no auth', () => {
    const access = new Access({ auth: undefined });
    // Should not throw
    expect(() => (access as any).toLogin()).not.toThrow();
  });

  test('toLogin with function auth', () => {
    const authFn = vi.fn();
    const access = new Access({ auth: authFn });
    (access as any).toLogin();
    expect(authFn).toHaveBeenCalled();
  });

  test('toLogin with string auth', () => {
    const access = new Access({ auth: '/#/login' });
    // Sets location.href — just test it doesn't throw
    expect(() => (access as any).toLogin()).not.toThrow();
  });
});

describe('Access - RSA setData', () => {
  test('setData decrypts RSA string', async () => {
    const { unRSA } = await import('@vtj/utils');
    (unRSA as any).mockReturnValue('{"token":"decrypted","permissions":{}}');
    const access = new Access({ privateKey: 'key123' });
    (access as any).setData('encrypted-string');
    expect((access as any).data).toEqual({
      token: 'decrypted',
      permissions: {}
    });
  });

  test('setData handles RSA decrypt fail', async () => {
    const { unRSA } = await import('@vtj/utils');
    (unRSA as any).mockReturnValue(null);
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const access = new Access({ privateKey: 'key123' });
    (access as any).setData('bad-data');
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  test('setData decrypts RSA array', async () => {
    const { unRSA } = await import('@vtj/utils');
    (unRSA as any).mockClear();
    (unRSA as any).mockReturnValue('{"token":');
    const access = new Access({ privateKey: 'key123' });
    (access as any).setData(['part1', 'part2']);
    expect(unRSA).toHaveBeenCalledTimes(2);
  });

  test('setData handles JSON parse error in string', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const access = new Access({});
    (access as any).setData('not-valid-json');
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe('Access - hasRoutePermission', () => {
  test('hasRoutePermission for PAGE_ROUTE_NAME', async () => {
    const access = new Access({});
    (access as any).data = { permissions: { p1: true } };
    const { PAGE_ROUTE_NAME } = await import('../src/constants');
    const to: any = { name: PAGE_ROUTE_NAME, params: { id: 'p1' } };
    expect((access as any).hasRoutePermission(to)).toBe(true);
  });

  test('hasRoutePermission for __vtj__ meta', () => {
    const access = new Access({});
    (access as any).data = { permissions: { v1: true } };
    const to: any = { meta: { __vtj__: 'v1' } };
    expect((access as any).hasRoutePermission(to)).toBe(true);
  });

  test('hasRoutePermission for permission meta', () => {
    const access = new Access({});
    (access as any).data = { permissions: { admin: true } };
    const to: any = { meta: { permission: 'admin' } };
    expect((access as any).hasRoutePermission(to)).toBe(true);
  });

  test('hasRoutePermission default true', () => {
    const access = new Access({});
    (access as any).data = { permissions: {} };
    const to: any = { meta: {} };
    expect((access as any).hasRoutePermission(to)).toBe(true);
  });
});

describe('Access - isUnauthorized', () => {
  test('isUnauthorized checks status code', () => {
    const access = new Access({});
    expect((access as any).isUnauthorized({ status: 401 })).toBe(true);
    expect((access as any).isUnauthorized({ status: 200 })).toBe(false);
  });

  test('isUnauthorized checks data code', () => {
    const access = new Access({});
    expect(
      (access as any).isUnauthorized({ status: 200, data: { code: 401 } })
    ).toBe(true);
  });
});

describe('Access - showUnauthorizedAlert', () => {
  test('shows alert when unauthorized', async () => {
    const alertSpy = vi.fn().mockResolvedValue(true);
    const access = new Access({
      alert: alertSpy,
      unauthorizedMessage: 'expired'
    });
    (access as any).isTipShowing = false;
    const { delay } = await import('@vtj/utils');
    await (access as any).showUnauthorizedAlert({ status: 401 });
    expect(alertSpy).toHaveBeenCalled();
  });
});

describe('Access - showTip without alert', () => {
  test('showTip uses console.warn when no alert', async () => {
    const access = new Access({});
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    (access as any).isTipShowing = false;
    await (access as any).showTip('test message');
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  test('showTip skips when already showing', async () => {
    const access = new Access({});
    (access as any).isTipShowing = true;
    const result = await (access as any).showTip('test');
    expect(result).toBe(false);
  });
});
