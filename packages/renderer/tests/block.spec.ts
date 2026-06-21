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
  const createVueMock = () => ({
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
  });

  let Vue: ReturnType<typeof createVueMock>;

  beforeEach(() => {
    Vue = createVueMock();
  });

  test('createRenderer creates refs with correct values in composition mode', async () => {
    const dsl = {
      name: 'RefsBlock',
      state: {},
      refs: {
        count: 0,
        message: { type: 'JSExpression', value: '"hello"' }
      },
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
      composables: [],
      provide: {}
    } as any;

    const { renderer } = createRenderer({
      Vue,
      mode: ContextMode.Runtime,
      dsl
    });
    await renderer.setup({});

    // 验证 Vue.ref 被正确调用：count=0, message="hello"
    expect(Vue.ref).toHaveBeenCalledWith(0);
    expect(Vue.ref).toHaveBeenCalledWith('hello');
  });

  test('createRenderer creates reactives with correct values in composition mode', async () => {
    const dsl = {
      name: 'ReactivesBlock',
      state: {},
      refs: {},
      reactives: {
        user: { name: 'test' }
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

    const { renderer } = createRenderer({
      Vue,
      mode: ContextMode.Runtime,
      dsl
    });
    await renderer.setup({});

    // 验证 Vue.reactive 被调用于 user
    expect(Vue.reactive).toHaveBeenCalledWith({ name: 'test' });
  });

  test('createRenderer does not create refs in options mode', async () => {
    const dsl = {
      name: 'OptionsBlock',
      state: { count: 0 },
      refs: { count: 0 },
      reactives: { user: {} },
      computed: {},
      methods: {},
      props: [],
      emits: [],
      nodes: [{ component: 'div' }],
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
    await renderer.setup({});

    // Options 模式下不应调用 Vue.ref 创建 composition refs
    expect(Vue.ref).not.toHaveBeenCalled();
    // Vue.reactive 只被调用于 state，不用于 composition reactives
    expect(Vue.reactive).toHaveBeenCalledTimes(1);
  });

  test('createRenderer registers composition lifecycle hooks', async () => {
    const dsl = {
      name: 'LifecycleBlock',
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
          value: 'function() { return "before-mount"; }'
        },
        mounted: {
          type: 'JSFunction',
          value: 'function() { return "mounted"; }'
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
    await renderer.setup({});

    // 验证 onBeforeMount 被注册
    expect(Vue.onBeforeMount).toHaveBeenCalledTimes(1);
    // 验证 mounted（Options名）被映射为 onMounted 注册
    // context.setup 内部也调用了 onMounted，所以总计 2 次
    expect(Vue.onMounted).toHaveBeenCalledTimes(2);
  });

  test('createRenderer calls Vue.provide for composition provide', async () => {
    const dsl = {
      name: 'ProvideBlock',
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
      composables: [],
      provide: {
        theme: 'light'
      }
    } as any;

    const { renderer } = createRenderer({
      Vue,
      mode: ContextMode.Runtime,
      dsl
    });
    await renderer.setup({});

    // 验证 Vue.provide 被调用
    expect(Vue.provide).toHaveBeenCalledWith('theme', 'light');
  });

  test('createRenderer handles failing setup gracefully', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const dsl = {
      name: 'FailingSetupBlock',
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
      composables: [],
      provide: {},
      setup: {
        type: 'JSFunction',
        value: 'function() { throw new Error("setup boom"); }'
      }
    } as any;

    const { renderer } = createRenderer({
      Vue,
      mode: ContextMode.Runtime,
      dsl
    });
    // setup 执行不应抛出未捕获异常
    await expect(renderer.setup({})).resolves.toBeDefined();
    expect(warnSpy).toHaveBeenCalledWith(
      '[VTJ] Composition setup 执行失败',
      expect.any(Error)
    );
    warnSpy.mockRestore();
  });

  test('createRenderer handles failing created lifecycle gracefully', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const dsl = {
      name: 'FailingCreatedBlock',
      state: {},
      refs: {},
      reactives: {},
      computed: {},
      methods: {},
      props: [],
      emits: [],
      nodes: [{ component: 'div' }],
      lifeCycles: {
        created: {
          type: 'JSFunction',
          value: 'function() { throw new Error("created boom"); }'
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
    // created 执行不应抛出未捕获异常
    await expect(renderer.setup({})).resolves.toBeDefined();
    expect(warnSpy).toHaveBeenCalledWith(
      '[VTJ] Composition 生命周期 "created" 执行失败',
      expect.any(Error)
    );
    warnSpy.mockRestore();
  });

  test('createRenderer returns refs and reactives in setup return', async () => {
    const dsl = {
      name: 'ReturnBlock',
      state: { foo: 'bar' },
      refs: { count: 0 },
      reactives: { form: { name: '' } },
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

    const { renderer } = createRenderer({
      Vue,
      mode: ContextMode.Runtime,
      dsl
    });

    // 验证 setup return 中包含 state、refs、reactives
    const setupReturn = await renderer.setup({});
    expect(setupReturn).toHaveProperty('state');
    expect(setupReturn).toHaveProperty('count');
    expect(setupReturn).toHaveProperty('form');
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
