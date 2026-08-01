import { expect, test, describe, vi, beforeEach } from 'vitest';
import {
  Provider,
  createProvider,
  useProvider,
  useGlobals,
  useStore,
  usePinia,
  useRequest,
  useLibs,
  useApis
} from '../src/provider/provider';
import { ContextMode } from '../src/constants';

vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    inject: vi.fn().mockReturnValue(null),
    defineAsyncComponent: (fn: any) => fn
  };
});

vi.mock('@vtj/utils', async () => {
  const actual = await vi.importActual('@vtj/utils');
  return {
    ...actual,
    loadScript: vi.fn(),
    loadCss: vi.fn(),
    jsonp: vi.fn(),
    request: { send: vi.fn().mockResolvedValue({ data: {} }) },
    url: { append: vi.fn((url: string) => url) },
    debounce: (fn: any) => fn,
    logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() }
  };
});

vi.mock('../src/render', () => ({
  createRenderer: vi
    .fn()
    .mockReturnValue({ renderer: { name: 'MockRenderer' } }),
  createLoader: vi.fn().mockReturnValue(() => 'div'),
  getPlugin: vi.fn().mockResolvedValue(null)
}));

vi.mock('../src/render/loader', () => ({
  getPlugin: vi.fn().mockResolvedValue(null),
  createLoader: vi.fn().mockReturnValue(() => 'div'),
  clearLoaderCache: vi.fn()
}));

vi.mock('../src/utils', async () => {
  const actual = await vi.importActual('../src/utils');
  return {
    ...actual,
    isVuePlugin: vi.fn().mockReturnValue(false),
    getMock: vi.fn().mockReturnValue(null),
    parseDeps: vi.fn().mockReturnValue({
      libraryExports: [],
      libraryMap: {},
      materials: [],
      materialExports: [],
      materialMapLibrary: {},
      libraryLocaleMap: {}
    }),
    isCSSUrl: vi.fn().mockReturnValue(false),
    isJSUrl: vi.fn().mockReturnValue(false),
    loadCssUrl: vi.fn(),
    loadScriptUrl: vi.fn(),
    getRawComponent: vi.fn((item: any, lib: any) => lib[item.name] || {})
  };
});

vi.mock('../src/provider/globals', () => ({
  initRuntimeGlobals: vi.fn()
}));

vi.mock('../src/provider/i18n', () => ({
  initI18n: vi.fn()
}));

function createRouterMock() {
  return {
    hasRoute: vi.fn().mockReturnValue(false),
    removeRoute: vi.fn(),
    addRoute: vi.fn()
  } as any;
}

function createMockService() {
  return {
    init: vi.fn().mockResolvedValue({}),
    getFile: vi.fn().mockResolvedValue(null),
    saveProject: vi.fn(),
    getExtension: vi.fn(),
    getConfig: vi.fn().mockReturnValue({}),
    getFiles: vi.fn().mockResolvedValue([])
  } as any;
}

describe('Provider - constructor', () => {
  test('creates provider with minimal options in Design mode', () => {
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'test-proj', name: 'Test', pages: [] }
    });
    expect(provider.mode).toBe(ContextMode.Design);
    expect(provider.project).toBeDefined();
    expect(provider.project!.id).toBe('test-proj');
  });

  test('creates provider in Runtime mode with uniapp platform', () => {
    const service = createMockService();
    service.init.mockResolvedValue({
      id: 'rt-proj',
      pages: [],
      apis: [],
      meta: [],
      env: [],
      platform: 'uniapp'
    });
    const provider = new Provider({
      service,
      mode: ContextMode.Runtime,
      project: { id: 'rt-proj', name: 'RT', pages: [] }
    });
    expect(provider.mode).toBe(ContextMode.Runtime);
    expect(provider.service).toBe(service);
  });

  test('connects access when provided', () => {
    const service = createMockService();
    const connectSpy = vi.fn();
    const access = { connect: connectSpy };
    new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' },
      adapter: { access } as any
    });
    expect(connectSpy).toHaveBeenCalled();
  });

  test('stores dependencies', () => {
    const service = createMockService();
    const deps = { lib1: async () => ({}) };
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' },
      dependencies: deps
    });
    expect(provider.dependencies).toBe(deps);
  });

  test('stores materials', () => {
    const service = createMockService();
    const mats = { mat1: async () => ({}) };
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' },
      materials: mats
    });
    expect(provider.materials).toBe(mats);
  });
});

describe('Provider - load', () => {
  test('loads project and initializes in Runtime mode', async () => {
    const service = createMockService();
    service.init.mockResolvedValue({
      id: 'loaded-proj',
      pages: [],
      apis: [],
      meta: [],
      env: [],
      platform: 'uniapp'
    });
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'loaded-proj' }
    });
    await provider.load({
      id: 'loaded-proj',
      pages: [],
      apis: [],
      meta: [],
      env: [],
      platform: 'uniapp'
    } as any);
    expect(provider.project).toBeDefined();
    expect(provider.project!.id).toBe('loaded-proj');
  });

  test('load triggers ready event', async () => {
    const service = createMockService();
    service.init.mockResolvedValue({
      id: 'rdy-proj',
      pages: [],
      apis: [],
      meta: [],
      env: [],
      platform: 'uniapp'
    });
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'rdy-proj' }
    });
    const readySpy = vi.fn();
    provider.ready(readySpy);
    await provider.load({
      id: 'rdy-proj',
      pages: [],
      apis: [],
      meta: [],
      env: [],
      platform: 'uniapp'
    } as any);
    expect(readySpy).toHaveBeenCalled();
  });

  test('load initializes router for non-uniapp platform', async () => {
    const service = createMockService();
    const router = createRouterMock();
    service.init.mockResolvedValue({
      id: 'router-proj',
      pages: [],
      apis: [],
      meta: [],
      env: [],
      platform: 'h5'
    });
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'router-proj' },
      router
    });
    await provider.load({
      id: 'router-proj',
      pages: [],
      apis: [],
      meta: [],
      env: [],
      platform: 'h5'
    } as any);
    expect(router.addRoute).toHaveBeenCalled();
  });

  test('load with routeAppendTo', async () => {
    const service = createMockService();
    const router = createRouterMock();
    service.init.mockResolvedValue({
      id: 'append-proj',
      pages: [],
      apis: [],
      meta: [],
      env: [],
      platform: 'h5'
    });
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'append-proj' },
      router,
      routeAppendTo: 'main'
    } as any);
    await provider.load({
      id: 'append-proj',
      pages: [],
      apis: [],
      meta: [],
      env: [],
      platform: 'h5'
    } as any);
    expect(router.addRoute).toHaveBeenCalled();
  });

  test('load handles existing routes', async () => {
    const service = createMockService();
    const router = createRouterMock();
    router.hasRoute.mockReturnValue(true);
    service.init.mockResolvedValue({
      id: 'existing-proj',
      pages: [],
      apis: [],
      meta: [],
      env: [],
      platform: 'h5'
    });
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'existing-proj' },
      router
    });
    await provider.load({
      id: 'existing-proj',
      pages: [],
      apis: [],
      meta: [],
      env: [],
      platform: 'h5'
    } as any);
    expect(router.removeRoute).toHaveBeenCalled();
  });

  test('load with enableStaticRoute and homepage', async () => {
    const service = createMockService();
    const router = createRouterMock();
    service.init.mockResolvedValue({
      id: 'static-proj',
      homepage: 'p1',
      pages: [{ id: 'p1', title: 'P1', type: 'page' }],
      apis: [],
      meta: [],
      env: [],
      platform: 'h5'
    });
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'static-proj' },
      router,
      enableStaticRoute: true
    });
    await provider.load({
      id: 'static-proj',
      homepage: 'p1',
      pages: [{ id: 'p1', title: 'P1', type: 'page' }],
      apis: [],
      meta: [],
      env: [],
      platform: 'h5'
    } as any);
    expect(router.addRoute).toHaveBeenCalled();
  });

  test('uses the loaded project platform when deciding router initialization', async () => {
    const service = createMockService();
    const router = createRouterMock();
    service.init.mockResolvedValue({
      id: 'uni-project',
      pages: [],
      apis: [],
      meta: [],
      env: [],
      platform: 'uniapp'
    });
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'uni-project' },
      router
    });

    await provider.load({ id: 'uni-project' } as any);

    expect(router.addRoute).not.toHaveBeenCalled();
  });

  test('passes routeMeta to generated static routes', async () => {
    const service = createMockService();
    const router = createRouterMock();
    service.init.mockResolvedValue({
      id: 'static-meta',
      pages: [{ id: 'p1', title: 'P1', type: 'page' }],
      apis: [],
      meta: [],
      env: [],
      platform: 'h5'
    });
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'static-meta' },
      router,
      enableStaticRoute: true,
      routeMeta: { requiresAuth: true }
    });

    await provider.load({ id: 'static-meta', platform: 'h5' } as any);

    const pageRoute = router.addRoute.mock.calls
      .map((args: any[]) => args.at(-1))
      .find((route: any) => route.name === 'p1');
    expect(pageRoute.meta.requiresAuth).toBe(true);
  });

  test('load with enableStaticRoute without homepage', async () => {
    const service = createMockService();
    const router = createRouterMock();
    service.init.mockResolvedValue({
      id: 'static-no-hp',
      pages: [],
      apis: [],
      meta: [],
      env: [],
      platform: 'h5'
    });
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'static-no-hp' },
      router,
      enableStaticRoute: true
    });
    await provider.load({
      id: 'static-no-hp',
      pages: [],
      apis: [],
      meta: [],
      env: [],
      platform: 'h5'
    } as any);
    expect(router.addRoute).toHaveBeenCalled();
  });
});

describe('Provider - page/file methods', () => {
  let provider: Provider;

  beforeEach(() => {
    const service = createMockService();
    provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: {
        id: 'test-project',
        name: 'Test',
        pages: [
          { id: 'page1', title: 'Page 1', type: 'page' },
          {
            id: 'page2',
            title: 'Page 2',
            type: 'page',
            children: [
              { id: 'sub1', title: 'Sub 1', type: 'page' },
              {
                id: 'sub2',
                title: 'Sub 2',
                type: 'page',
                dir: true,
                children: [{ id: 'deep1', title: 'Deep 1', type: 'page' }]
              }
            ]
          }
        ],
        blocks: [{ id: 'block1', name: 'Block 1', type: 'block' }]
      } as any
    });
  });

  test('getPage returns direct child pages', () => {
    expect(provider.getPage('page1')?.title).toBe('Page 1');
    expect(provider.getPage('nonexistent')).toBeNull();
  });

  test('getPage returns nested pages', () => {
    const sub = provider.getPage('sub1');
    expect(sub).toBeDefined();
    expect(sub?.title).toBe('Sub 1');
  });

  test('getPage returns deeply nested pages', () => {
    const deep = provider.getPage('deep1');
    expect(deep).toBeDefined();
    expect(deep?.title).toBe('Deep 1');
  });

  test('getFile returns page files', () => {
    const file = provider.getFile('page1');
    expect(file).toBeDefined();
  });

  test('getFile returns block files', () => {
    const file = provider.getFile('block1');
    expect(file).toBeDefined();
  });

  test('getFile returns null for unknown', () => {
    expect(provider.getFile('unknown')).toBeNull();
  });

  test('getHomepage returns first page when no homepage set', () => {
    const hp = provider.getHomepage();
    expect(hp?.id).toBe('page1');
  });

  test('getHomepage returns specified homepage', () => {
    (provider as any).project.homepage = 'page2';
    const hp = provider.getHomepage();
    expect(hp?.id).toBe('page2');
  });

  test('getFirstPage returns first non-layout, non-dir page', () => {
    const page = provider.getFirstPage();
    expect(page?.id).toBe('page1');
  });

  test('getFirstPage returns null when no pages', () => {
    (provider as any).project.pages = [];
    expect(provider.getFirstPage()).toBeNull();
  });

  test('getMenus creates menu structure', () => {
    const menus = provider.getMenus();
    expect(menus.length).toBeGreaterThan(0);
  });

  test('getMenus with custom prefix', () => {
    const menus = provider.getMenus('page', '/custom');
    expect(menus.length).toBeGreaterThan(0);
  });

  test('createMock returns mock function', () => {
    const mockFn = provider.createMock((x: number) => ({ count: x }));
    expect(typeof mockFn).toBe('function');
  });
});

describe('Provider - createMock', () => {
  test('createMock without mockjs warns', () => {
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' }
    });
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const mockFn = provider.createMock(() => ({ count: 1 }));
    expect(typeof mockFn).toBe('function');
    warnSpy.mockRestore();
  });

  test('createMock handles func throwing', async () => {
    const { logger } = await import('@vtj/utils');
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' }
    });
    const mockFn = provider.createMock(() => {
      throw new Error('bad');
    });
    const result = await mockFn();
    expect(logger.warn).toHaveBeenCalled();
  });
});

describe('Provider - getDsl', () => {
  test('getDsl returns null when no module and service fails', async () => {
    const service = createMockService();
    service.getFile.mockRejectedValue(new Error('not found'));
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' }
    });
    const dsl = await provider.getDsl('unknown');
    expect(dsl).toBeNull();
  });

  test('getDsl from service', async () => {
    const service = createMockService();
    service.getFile.mockResolvedValue({ id: 'dsl1', name: 'TestDsl' });
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'proj' }
    });
    const dsl = await provider.getDsl('dsl1');
    expect(dsl).toEqual({ id: 'dsl1', name: 'TestDsl' });
  });
});

describe('Provider - getDslByUrl', () => {
  test('getDslByUrl returns null when no request adapter', async () => {
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' },
      adapter: { request: null as any }
    });
    const result = await provider.getDslByUrl('http://example.com/dsl');
    expect(result).toBeNull();
  });

  test('getDslByUrl fetches and caches', async () => {
    const sendSpy = vi
      .fn()
      .mockResolvedValue({ data: { id: 'url-dsl', name: 'UrlDsl' } });
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' },
      adapter: { request: { send: sendSpy } as any }
    });
    const result = await provider.getDslByUrl('http://example.com/dsl');
    expect(result).toEqual({ id: 'url-dsl', name: 'UrlDsl' });
    // Second call should use cache
    const cached = await provider.getDslByUrl('http://example.com/dsl');
    expect(cached).toEqual({ id: 'url-dsl', name: 'UrlDsl' });
    expect(sendSpy).toHaveBeenCalledTimes(1);
  });

  test('getDslByUrl handles request failure', async () => {
    const sendSpy = vi.fn().mockRejectedValue(new Error('fail'));
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' },
      adapter: { request: { send: sendSpy } as any }
    });
    const result = await provider.getDslByUrl('http://example.com/bad');
    expect(result).toBeNull();
  });

  test('getDslByUrl retries after a transient request failure', async () => {
    const dsl = { id: 'url-dsl', name: 'UrlDsl' };
    const sendSpy = vi
      .fn()
      .mockRejectedValueOnce(new Error('temporary'))
      .mockResolvedValueOnce({ data: dsl });
    const provider = new Provider({
      service: createMockService(),
      mode: ContextMode.Design,
      project: { id: 'p1' },
      adapter: { request: { send: sendSpy } as any }
    });

    expect(await provider.getDslByUrl('http://example.com/retry')).toBeNull();
    expect(await provider.getDslByUrl('http://example.com/retry')).toEqual(dsl);
    expect(sendSpy).toHaveBeenCalledTimes(2);
  });
});

describe('Provider - createDslRenderer', () => {
  test('createDslRenderer returns renderer', () => {
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' }
    });
    (provider as any).library.Vue = {
      computed: vi.fn().mockReturnValue({ value: {} })
    };
    const result = provider.createDslRenderer({
      id: 'block1',
      type: 'Block',
      name: 'Test'
    } as any);
    expect(result).toBeDefined();
    expect(result.renderer).toBeDefined();
  });
});

describe('Provider - getRenderComponent', () => {
  test('returns null for unknown file', async () => {
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1', pages: [], blocks: [] }
    });
    const result = await provider.getRenderComponent('unknown');
    expect(result).toBeNull();
  });

  test('returns renderer for known file', async () => {
    const service = createMockService();
    service.getFile.mockResolvedValue({
      id: 'b1',
      type: 'Block',
      name: 'Test'
    });
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: {
        id: 'p1',
        pages: [],
        blocks: [{ id: 'b1', name: 'Block', title: 'Block', type: 'block' }]
      }
    });
    (provider as any).library.Vue = {
      computed: vi.fn().mockReturnValue({ value: {} })
    };
    const result = await provider.getRenderComponent('b1');
    expect(result).toBeDefined();
  });

  test('calls output callback when file found', async () => {
    const service = createMockService();
    const outputSpy = vi.fn();
    service.getFile.mockResolvedValue({
      id: 'b1',
      type: 'Block',
      name: 'Test'
    });
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: {
        id: 'p1',
        pages: [],
        blocks: [{ id: 'b1', name: 'Block', title: 'Block', type: 'block' }]
      }
    });
    (provider as any).library.Vue = {
      computed: vi.fn().mockReturnValue({ value: {} })
    };
    await provider.getRenderComponent('b1', outputSpy);
    expect(outputSpy).toHaveBeenCalled();
  });

  test('returns null when dsl not found', async () => {
    const service = createMockService();
    service.getFile.mockResolvedValue(null);
    const provider = new Provider({
      service,
      mode: ContextMode.Runtime,
      project: {
        id: 'p1',
        pages: [],
        blocks: [{ id: 'b2', name: 'Block', title: 'Block', type: 'block' }]
      }
    });
    const result = await provider.getRenderComponent('b2');
    expect(result).toBeNull();
  });
});

describe('Provider - defineUrlSchemaComponent', () => {
  test('returns async component', async () => {
    const sendSpy = vi.fn().mockResolvedValue({
      data: { id: 'url-comp', type: 'Block', name: 'UrlComp' }
    });
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' },
      adapter: { request: { send: sendSpy } as any }
    });
    (provider as any).library.Vue = {};
    const comp = provider.defineUrlSchemaComponent('http://example.com/comp');
    expect(comp).toBeDefined();
  });
});

describe('Provider - definePluginComponent', () => {
  test('returns async component', () => {
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' }
    });
    const comp = provider.definePluginComponent({
      type: 'Plugin',
      urls: [],
      library: 'lib'
    } as any);
    expect(comp).toBeDefined();
  });
});

describe('Provider - install', () => {
  test('install sets global properties and provides', () => {
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: {
        id: 'p1',
        pages: [],
        apis: [],
        meta: [],
        platform: 'uniapp'
      }
    });
    const globalProperties: Record<string, any> = { installed: {} };
    const app = {
      config: { globalProperties },
      use: vi.fn(),
      provide: vi.fn()
    } as any;

    provider.install(app);
    expect(app.provide).toHaveBeenCalled();
    expect(app.config.globalProperties.$provider).toBe(provider);
    expect(app.config.globalProperties.$apis).toBeDefined();
    expect(app.config.globalProperties.$request).toBeDefined();
  });

  test('install with Vue library plugin', async () => {
    const { isVuePlugin } = await import('../src/utils');
    (isVuePlugin as any).mockReturnValue(true);

    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Runtime,
      project: { id: 'p1', pages: [], apis: [], meta: [], platform: 'uniapp' }
    });
    (provider as any).library = {
      'element-ui': { install: vi.fn() }
    };
    const globalProperties: Record<string, any> = { installed: {} };
    const app = {
      config: { globalProperties },
      use: vi.fn(),
      provide: vi.fn()
    } as any;

    provider.install(app);
    expect(app.use).toHaveBeenCalled();
    (isVuePlugin as any).mockReturnValue(false);
  });

  test('install with custom install function', () => {
    const service = createMockService();
    const installSpy = vi.fn();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1', pages: [], apis: [], meta: [], platform: 'uniapp' },
      install: installSpy
    });
    const globalProperties: Record<string, any> = { installed: {} };
    const app = {
      config: { globalProperties },
      use: vi.fn(),
      provide: vi.fn()
    } as any;

    provider.install(app);
    expect(app.use).toHaveBeenCalledWith(installSpy);
  });

  test('install with access adapter', () => {
    const service = createMockService();
    const accessInstallSpy = vi.fn();
    const access = { install: accessInstallSpy, connect: vi.fn() };
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1', pages: [], apis: [], meta: [], platform: 'uniapp' },
      adapter: { access } as any
    });
    const globalProperties: Record<string, any> = { installed: {} };
    const app = {
      config: { globalProperties },
      use: vi.fn(),
      provide: vi.fn()
    } as any;

    provider.install(app);
    expect(app.use).toHaveBeenCalledWith(access);
  });

  test('install initializes globals for non-uniapp non-design', async () => {
    const { initRuntimeGlobals } = await import('../src/provider/globals');
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Runtime,
      project: { id: 'p1', pages: [], apis: [], meta: [], platform: 'h5' }
    });
    const globalProperties: Record<string, any> = { installed: {} };
    const app = {
      config: { globalProperties },
      use: vi.fn(),
      provide: vi.fn()
    } as any;

    provider.install(app);
    expect(initRuntimeGlobals).toHaveBeenCalled();
  });
});

describe('Provider - initEnv', () => {
  test('initEnv handles empty config', () => {
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' }
    });
    provider.initEnv([]);
    expect(provider.env).toEqual({});
  });

  test('initEnv parses env config', () => {
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' },
      nodeEnv: 'development' as any
    });
    provider.initEnv([
      {
        name: 'API_BASE',
        development: 'http://dev',
        production: 'http://prod'
      },
      { name: 'DEBUG', development: 'true', production: 'false' }
    ] as any);
    expect(provider.env.API_BASE).toBe('http://dev');
    expect(provider.env.DEBUG).toBe('true');
  });

  test('initEnv production mode', () => {
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' },
      nodeEnv: 'production' as any
    });
    provider.initEnv([
      { name: 'API_BASE', development: 'http://dev', production: 'http://prod' }
    ] as any);
    expect(provider.env.API_BASE).toBe('http://prod');
  });
});

describe('Provider - initGlobals/initI18n', () => {
  test('initGlobals delegates to initRuntimeGlobals', async () => {
    const { initRuntimeGlobals } = await import('../src/provider/globals');
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' }
    });
    provider.initGlobals({}, { app: {} as any });
    expect(initRuntimeGlobals).toHaveBeenCalled();
  });

  test('initI18n delegates to initI18n', async () => {
    const { initI18n } = await import('../src/provider/i18n');
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' }
    });
    provider.initI18n({} as any, {});
    expect(initI18n).toHaveBeenCalled();
  });
});

describe('Provider - initMock', () => {
  test('initMock without mockjs is noop', () => {
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' }
    });
    expect(() => provider.initMock()).not.toThrow();
  });

  test('initMock with mockjs sets up', async () => {
    const { getMock } = await import('../src/utils');
    const setupSpy = vi.fn();
    (getMock as any).mockReturnValue({ setup: setupSpy });

    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' }
    });
    provider.initMock();
    expect(setupSpy).toHaveBeenCalledWith({ timeout: '50-500' });

    (getMock as any).mockReturnValue(null);
  });
});

describe('createProvider', () => {
  test('creates provider and returns onReady', () => {
    const service = createMockService();
    const result = createProvider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' }
    });
    expect(result.provider).toBeInstanceOf(Provider);
    expect(typeof result.onReady).toBe('function');
    expect(result.ready).toBeInstanceOf(Promise);
  });

  test('ready resolves to the initialized provider', async () => {
    const service = createMockService();
    const result = createProvider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' }
    });

    await expect(result.ready).resolves.toBe(result.provider);
  });

  test('ready rejects when runtime initialization fails', async () => {
    const service = createMockService();
    service.init.mockRejectedValue(new Error('load failed'));
    const result = createProvider({
      service,
      mode: ContextMode.Runtime,
      project: { id: 'p1' }
    });

    await expect(result.ready).rejects.toThrow('load failed');
  });

  test('onReady calls callback when ready', () => {
    const service = createMockService();
    const { provider, onReady } = createProvider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' }
    });
    const callback = vi.fn();
    onReady(callback);
    (provider as any).triggerReady();
    expect(callback).toHaveBeenCalled();
  });
});

describe('useProvider', () => {
  test('throws when provider not found', async () => {
    const { inject } = await import('vue');
    (inject as any).mockReturnValue(null);
    expect(() => useProvider()).toThrow('Can not find provider');
  });

  test('returns provider when found', async () => {
    const { inject } = await import('vue');
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' }
    });
    (inject as any).mockReturnValue(provider);
    const result = useProvider();
    expect(result).toBe(provider);
  });
});

describe('useGlobals/useStore/usePinia/useRequest/useLibs/useApis', () => {
  test('useGlobals returns empty when no provider', async () => {
    const { inject } = await import('vue');
    (inject as any).mockReturnValue(null);
    expect(useGlobals()).toEqual({});
  });

  test('useGlobals returns globals from provider', async () => {
    const { inject } = await import('vue');
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' }
    });
    provider.globals = { $store: { test: true } };
    (inject as any).mockReturnValue(provider);
    expect(useGlobals()).toEqual({ $store: { test: true } });
  });

  test('useStore returns store from globals', async () => {
    const { inject } = await import('vue');
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' }
    });
    provider.globals = { $store: { state: {} } };
    (inject as any).mockReturnValue(provider);
    expect(useStore()).toEqual({ state: {} });
  });

  test('usePinia returns pinia from globals', async () => {
    const { inject } = await import('vue');
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' }
    });
    provider.globals = { $pinia: { _s: new Map() } };
    (inject as any).mockReturnValue(provider);
    expect(usePinia()).toEqual({ _s: new Map() });
  });

  test('useRequest returns request from globals', async () => {
    const { inject } = await import('vue');
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' }
    });
    const req = { send: vi.fn() };
    provider.globals = { $request: req };
    (inject as any).mockReturnValue(provider);
    expect(useRequest()).toBe(req);
  });

  test('useLibs returns libs from globals', async () => {
    const { inject } = await import('vue');
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' }
    });
    provider.globals = { $libs: { Vue: {} } };
    (inject as any).mockReturnValue(provider);
    expect(useLibs()).toEqual({ Vue: {} });
  });

  test('useApis returns apis from globals', async () => {
    const { inject } = await import('vue');
    const service = createMockService();
    const provider = new Provider({
      service,
      mode: ContextMode.Design,
      project: { id: 'p1' }
    });
    provider.globals = { $apis: { fetch: vi.fn() } };
    (inject as any).mockReturnValue(provider);
    expect(useApis()).toEqual({ fetch: expect.any(Function) });
  });
});
