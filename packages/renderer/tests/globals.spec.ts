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
});
