import { expect, test, describe, vi, beforeEach } from 'vitest';
import { initRuntimeGlobals } from '../src/provider/globals';
import { ContextMode } from '../src/constants';

function createAppMock() {
  const globalProperties: Record<string, any> = {};
  return {
    use: vi.fn(),
    config: { globalProperties },
    _context: { config: { globalProperties } }
  } as any;
}

const mockDoc = {
  adoptedStyleSheets: [],
  getElementById: vi.fn().mockReturnValue(null),
  createElement: vi.fn().mockReturnValue({ id: '', innerHTML: '' }),
  head: { appendChild: vi.fn() }
};

function createOptions(overrides: Record<string, any> = {}) {
  return {
    app: createAppMock(),
    window: {
      document: mockDoc,
      CSSStyleSheet: class {
        id = '';
        replaceSync = vi.fn();
      },
      innerWidth: 375
    },
    adapter: {
      request: {
        setConfig: vi.fn(),
        useRequest: vi.fn().mockReturnValue(vi.fn()),
        useResponse: vi.fn().mockReturnValue(vi.fn())
      },
      jsonp: vi.fn(),
      access: undefined
    },
    library: {} as Record<string, any>,
    mode: ContextMode.Runtime,
    ...overrides
  } as any;
}

describe('initRuntimeGlobals', () => {
  beforeEach(() => {
    (globalThis as any).__uniConfig = undefined;
    vi.clearAllMocks();
  });

  test('initializes with empty globals', () => {
    const options = createOptions();
    expect(() => initRuntimeGlobals({}, options)).not.toThrow();
    expect(options.app.config.globalProperties.$libs).toBeDefined();
  });

  test('sets global styles', () => {
    const options = createOptions();
    expect(() =>
      initRuntimeGlobals({ css: 'body{margin:0}' }, options)
    ).not.toThrow();
  });

  test('creates Pinia store when available', () => {
    const createPinia = vi.fn().mockReturnValue({ install: vi.fn() });
    const defineStore = vi.fn().mockReturnValue(() => ({ state: {} }));
    const app = createAppMock();
    const options = createOptions({
      app,
      library: { Pinia: { createPinia, defineStore } }
    });

    initRuntimeGlobals(
      {
        store: {
          type: 'JSFunction',
          value: 'function(app){ return {state:()=>({})}; }'
        } as any
      },
      options
    );

    expect(createPinia).toHaveBeenCalled();
    expect(app.use).toHaveBeenCalled();
  });

  test('skips store creation when Pinia not available', () => {
    const app = createAppMock();
    const options = createOptions({ app, library: {} });

    expect(() =>
      initRuntimeGlobals(
        {
          store: {
            type: 'JSFunction',
            value: 'function(app){ return {}; }'
          } as any
        },
        options
      )
    ).not.toThrow();
  });

  test('calls createEnhance when enhance function provided', () => {
    const options = createOptions();
    expect(() =>
      initRuntimeGlobals(
        {
          enhance: { type: 'JSFunction', value: 'function(app, libs){}' } as any
        },
        options
      )
    ).not.toThrow();
  });

  test('sets axios config when provided', () => {
    const options = createOptions();
    initRuntimeGlobals(
      {
        axios: {
          type: 'JSFunction',
          value: 'function(app){ return {timeout:5000}; }'
        } as any
      },
      options
    );
    expect(options.adapter.request.setConfig).toHaveBeenCalled();
  });

  test('sets request interceptor', () => {
    const options = createOptions();
    initRuntimeGlobals(
      {
        request: {
          type: 'JSFunction',
          value: 'function(req,app){ return req; }'
        } as any
      },
      options
    );
    expect(options.adapter.request.useRequest).toHaveBeenCalled();
  });

  test('sets response interceptor', () => {
    const options = createOptions();
    initRuntimeGlobals(
      {
        response: {
          type: 'JSFunction',
          value: 'function(res,app){ return res; }'
        } as any
      },
      options
    );
    expect(options.adapter.request.useResponse).toHaveBeenCalled();
  });

  test('skips access creation when adapter has access', () => {
    const options = createOptions({
      adapter: {
        request: {
          setConfig: vi.fn(),
          useRequest: vi.fn().mockReturnValue(vi.fn()),
          useResponse: vi.fn().mockReturnValue(vi.fn())
        },
        jsonp: vi.fn(),
        access: { connect: vi.fn() }
      }
    });
    expect(() =>
      initRuntimeGlobals(
        {
          access: {
            type: 'JSFunction',
            value: 'function(app){ return {}; }'
          } as any
        },
        options
      )
    ).not.toThrow();
  });

  test('skips router guard when no router', () => {
    const options = createOptions();
    expect(() =>
      initRuntimeGlobals(
        {
          beforeEach: {
            type: 'JSFunction',
            value: 'function(to,from,next,app){}'
          } as any
        },
        options
      )
    ).not.toThrow();
  });

  test('creates access when globals.access provided and adapter has no access', () => {
    const app = createAppMock();
    const mockUse = vi.fn();
    app.use = mockUse;
    app.config.globalProperties.$router = {
      push: vi.fn(),
      beforeEach: vi.fn(),
      afterEach: vi.fn(),
      addRoute: vi.fn()
    };
    const options = createOptions({
      app,
      adapter: {
        request: {
          setConfig: vi.fn(),
          useRequest: vi.fn().mockReturnValue(vi.fn()),
          useResponse: vi.fn().mockReturnValue(vi.fn())
        },
        jsonp: vi.fn(),
        access: undefined
      }
    });

    expect(() =>
      initRuntimeGlobals(
        {
          access: {
            type: 'JSFunction',
            value: 'function(app){ return {}; }'
          } as any
        },
        options
      )
    ).not.toThrow();
    // Access instance was installed
    expect(mockUse).toHaveBeenCalled();
  });

  test('cleans up old request interceptor before setting new one', () => {
    const options = createOptions();
    const mockUnReq = vi.fn();
    const mockUnRes = vi.fn();
    const mockReq = options.adapter.request;
    mockReq.__unReq = mockUnReq;
    mockReq.__unRes = mockUnRes;

    initRuntimeGlobals(
      {
        request: {
          type: 'JSFunction',
          value: 'function(req,app){ return req; }'
        } as any,
        response: {
          type: 'JSFunction',
          value: 'function(res,app){ return res; }'
        } as any
      },
      options
    );

    expect(mockUnReq).toHaveBeenCalled();
    expect(mockUnRes).toHaveBeenCalled();
  });

  test('sets beforeEach router guard with router', () => {
    const app = createAppMock();
    const mockBeforeEach = vi.fn();
    app.config.globalProperties.$router = {
      beforeEach: mockBeforeEach,
      afterEach: vi.fn()
    };
    const options = createOptions({ app });

    initRuntimeGlobals(
      {
        beforeEach: {
          type: 'JSFunction',
          value: 'function(to,from,next,app){ next(); }'
        } as any
      },
      options
    );
    expect(mockBeforeEach).toHaveBeenCalled();
  });

  test('sets afterEach router guard with router', () => {
    const app = createAppMock();
    const mockAfterEach = vi.fn();
    app.config.globalProperties.$router = {
      beforeEach: vi.fn(),
      afterEach: mockAfterEach
    };
    const options = createOptions({ app });

    initRuntimeGlobals(
      {
        afterEach: {
          type: 'JSFunction',
          value: 'function(to,from,failure,app){}'
        } as any
      },
      options
    );
    expect(mockAfterEach).toHaveBeenCalled();
  });

  test('skips axios config when no adapter.request', () => {
    const options = createOptions({
      adapter: { request: undefined, jsonp: vi.fn() }
    });
    expect(() =>
      initRuntimeGlobals(
        {
          axios: {
            type: 'JSFunction',
            value: 'function(app){ return {}; }'
          } as any
        },
        options
      )
    ).not.toThrow();
  });

  test('skips store creation when store is not JSFunction', () => {
    const createPinia = vi.fn().mockReturnValue({ install: vi.fn() });
    const defineStore = vi.fn();
    const app = createAppMock();
    const options = createOptions({
      app,
      library: { Pinia: { createPinia, defineStore } }
    });

    expect(() =>
      initRuntimeGlobals({ store: {} as any }, options)
    ).not.toThrow();
    // Pinia is created but defineStore should not be called (not JSFunction)
    expect(defineStore).not.toHaveBeenCalled();
  });

  test('skips store when Pinia but store.value is empty', () => {
    const createPinia = vi.fn().mockReturnValue({ install: vi.fn() });
    const app = createAppMock();
    const options = createOptions({
      app,
      library: { Pinia: { createPinia, defineStore: vi.fn() } }
    });

    initRuntimeGlobals(
      {
        store: { type: 'JSFunction', value: '' } as any
      },
      options
    );
    expect(createPinia).toHaveBeenCalled(); // Pinia is created but store not
  });

  test('skips enhance when not JSFunction', () => {
    const options = createOptions();
    expect(() =>
      initRuntimeGlobals({ enhance: {} as any }, options)
    ).not.toThrow();
  });
});
