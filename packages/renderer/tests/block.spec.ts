import { expect, test, describe, beforeEach, vi } from 'vitest';
import { createRenderer, createDataSources } from '../src/render/block';
import { ContextMode } from '../src/constants';
import { Context } from '../src/render/context';

describe('block - createRenderer', () => {
  const Vue = {
    defineComponent: (options: any) => options,
    computed: vi.fn((fn: any) => ({ value: fn() })),
    reactive: vi.fn((obj: any) => obj),
    ref: vi.fn((val: any) => ({ value: val })),
    markRaw: vi.fn((obj: any) => obj),
    createVNode: vi.fn((tag: any, props: any, children: any) => ({
      tag,
      props,
      children
    })),
    provide: vi.fn(),
    inject: vi.fn((key: any, defaultValue: any) => defaultValue),
    getCurrentInstance: () => ({
      proxy: {
        $el: null,
        $emit: vi.fn()
      },
      appContext: {
        config: { globalProperties: {} }
      }
    }),
    onMounted: vi.fn(),
    onUnmounted: vi.fn(),
    onBeforeUpdate: vi.fn(),
    watch: vi.fn(),
    onBeforeMount: vi.fn(),
    onBeforeUnmount: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('createRenderer creates renderer with options mode', () => {
    const dsl = {
      name: 'TestBlock',
      id: 'test-id',
      state: { count: 0 },
      computed: {},
      methods: {},
      props: ['title'],
      emits: ['click'],
      nodes: [
        {
          component: 'div',
          children: [{ component: 'span', children: 'hello' }]
        }
      ],
      lifeCycles: {},
      watch: [],
      dataSources: {},
      css: '',
      apiMode: 'options'
    } as any;

    const { renderer, context } = createRenderer({
      Vue,
      mode: ContextMode.Runtime,
      dsl
    });

    expect(renderer.name).toBe('TestBlock');
    expect(context.__mode).toBe(ContextMode.Runtime);
    expect(renderer.props).toBeDefined();
    expect(renderer.props.title).toBeDefined();
    expect(renderer.emits).toEqual(['click']);
  });

  test('createRenderer handles multiple nodes', () => {
    const dsl = {
      name: 'MultiBlock',
      id: 'multi-id',
      state: {},
      computed: {},
      methods: {},
      props: [],
      emits: [],
      nodes: [
        { component: 'div', children: 'first' },
        { component: 'div', children: 'second' }
      ],
      lifeCycles: {},
      watch: [],
      dataSources: {},
      css: '',
      apiMode: 'options'
    } as any;

    const { renderer } = createRenderer({
      Vue,
      mode: ContextMode.Runtime,
      dsl
    });

    const vnode = renderer.render();
    expect(vnode).toBeDefined();
    expect(vnode.tag).toBe('div');
    expect(vnode.children.length).toBe(2);
  });

  test('createRenderer with null nodes returns null', () => {
    const dsl = {
      name: 'NullBlock',
      nodes: null,
      state: {},
      computed: {},
      methods: {},
      props: [],
      emits: [],
      lifeCycles: {},
      watch: [],
      dataSources: {},
      css: ''
    } as any;

    const { renderer } = createRenderer({
      Vue,
      mode: ContextMode.Runtime,
      dsl
    });

    expect(renderer.render()).toBeNull();
  });
});

describe('block - Composition API mode', () => {
  const Vue = {
    defineComponent: (options: any) => options,
    computed: vi.fn((fn: any) => ({ value: fn() })),
    reactive: vi.fn((obj: any) => obj),
    ref: vi.fn((val: any) => ({ value: val })),
    markRaw: vi.fn((obj: any) => obj),
    createVNode: vi.fn((tag: any, props: any, children: any) => ({
      tag,
      props,
      children
    })),
    provide: vi.fn(),
    inject: vi.fn((key: any, defaultValue: any) => defaultValue),
    getCurrentInstance: () => ({
      proxy: {
        $el: null,
        $emit: vi.fn()
      },
      appContext: {
        config: { globalProperties: {} }
      }
    }),
    onMounted: vi.fn(),
    onUnmounted: vi.fn(),
    onBeforeUpdate: vi.fn(),
    watch: vi.fn(),
    onBeforeMount: vi.fn(),
    onMountedHook: vi.fn((fn: any) => fn),
    onBeforeUnmount: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('createRenderer creates refs and reactives in composition mode', () => {
    const dsl = {
      name: 'CompositionBlock',
      id: 'comp-id',
      state: {},
      refs: {
        count: 0,
        message: { type: 'JSExpression', value: '"hello"' }
      },
      reactives: {
        user: { name: 'test' },
        meta: { type: 'JSExpression', value: '({ role: "admin" })' }
      },
      computed: {},
      methods: {},
      props: [],
      emits: [],
      nodes: [{ component: 'div' }],
      lifeCycles: {},
      watch: [],
      dataSources: {},
      css: '',
      apiMode: 'composition',
      composables: [],
      provide: {}
    } as any;

    const { renderer, context } = createRenderer({
      Vue,
      mode: ContextMode.Runtime,
      dsl
    });

    // Composition 模式应该在 setup 中创建 refs 和 reactives
    expect(renderer.name).toBe('CompositionBlock');
    expect(context).toBeDefined();
  });

  test('createRenderer with composables calls createComposables', () => {
    const composableFn = vi.fn(() => ({ result: 'composed' }));
    const dsl = {
      name: 'ComposableBlock',
      id: 'comp-id-2',
      state: {},
      refs: {},
      reactives: {},
      computed: {},
      methods: {},
      props: [],
      emits: [],
      nodes: [{ component: 'div' }],
      lifeCycles: {},
      watch: [],
      dataSources: {},
      css: '',
      apiMode: 'composition',
      composables: [
        {
          name: 'useCustom',
          composable: 'useCustom',
          args: [],
          destructure: ['result']
        }
      ],
      provide: {},
      libs: {
        useCustom: composableFn
      }
    } as any;

    const VueWithLibs = {
      ...Vue,
      useCustom: composableFn
    };

    const { renderer, context } = createRenderer({
      Vue: VueWithLibs,
      mode: ContextMode.Runtime,
      dsl,
      libs: { useCustom: composableFn }
    });

    expect(renderer.name).toBe('ComposableBlock');
    expect(context).toBeDefined();
  });

  test('createRenderer with composition lifecycles', () => {
    const onBeforeMountFn = vi.fn();
    const dsl = {
      name: 'LifecycleBlock',
      id: 'lifecycle-id',
      state: {},
      refs: {},
      reactives: {},
      computed: {},
      methods: {},
      props: [],
      emits: [],
      nodes: [{ component: 'div' }],
      lifeCycles: {
        onBeforeMount: {
          type: 'JSFunction',
          value: 'async function() { return "done"; }'
        }
      },
      watch: [],
      dataSources: {},
      css: '',
      apiMode: 'composition',
      composables: [],
      provide: {}
    } as any;

    const { renderer } = createRenderer({
      Vue,
      mode: ContextMode.Runtime,
      dsl
    });

    expect(renderer.name).toBe('LifecycleBlock');
  });
});

describe('block - createDataSources', () => {
  test('createDataSources with mock type', () => {
    const context = new Context({ mode: ContextMode.Runtime });
    const sources = {
      mockApi: {
        type: 'mock',
        handler: async () => ({ data: 'mocked' })
      }
    } as any;

    const result = createDataSources(sources, context);
    expect(result.mockApi).toBeDefined();
    expect(typeof result.mockApi).toBe('function');
  });

  test('createDataSources with api ref', () => {
    const apiFn = vi.fn().mockResolvedValue('api-result');
    const context = new Context({
      mode: ContextMode.Runtime,
      attrs: {
        $apis: { getUser: apiFn }
      }
    });

    const sources = {
      fetchUser: {
        type: 'api',
        ref: 'getUser'
      }
    } as any;

    const result = createDataSources(sources, context);
    expect(result.fetchUser).toBeDefined();
    expect(typeof result.fetchUser).toBe('function');
  });

  test('createDataSources with api ref and transform function', async () => {
    const apiFn = vi.fn().mockResolvedValue({ name: 'Alice' });
    const context = new Context({
      mode: ContextMode.Runtime,
      attrs: {
        $apis: { getUser: apiFn }
      }
    });

    const sources = {
      fetchUser: {
        type: 'api',
        ref: 'getUser',
        transform: {
          type: 'JSFunction',
          value: 'function(data) { return data.name.toUpperCase(); }'
        }
      }
    } as any;

    const result = createDataSources(sources, context);
    expect(result.fetchUser).toBeDefined();
  });

  test('createDataSources without api ref still creates handler function', () => {
    const context = new Context({
      mode: ContextMode.Runtime,
      attrs: { $apis: {} }
    });

    const sources = {
      noRefApi: {
        type: 'api',
        ref: 'nonExistentApi'
      }
    } as any;

    const result = createDataSources(sources, context);
    expect(result.noRefApi).toBeDefined();
    expect(typeof result.noRefApi).toBe('function');
  });
});
