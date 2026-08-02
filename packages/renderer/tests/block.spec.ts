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

    const loader = Object.assign(vi.fn(), { clear: vi.fn() });
    const {
      renderer,
      context,
      loader: resultLoader
    } = createRenderer({
      Vue,
      mode: ContextMode.Runtime,
      dsl,
      loader
    });

    expect(renderer.name).toBe('TestBlock');
    expect(context.__mode).toBe(ContextMode.Runtime);
    expect(renderer.props).toBeDefined();
    expect(renderer.props.title).toBeDefined();
    expect(renderer.emits).toEqual(['click']);
    expect(resultLoader).toBe(loader);
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
    // 同时 context.setup 和 block.setup 各注册了一个 onMounted（__proxy 和 syncContextFields），
    // 所以总计 3 次
    expect(Vue.onMounted).toHaveBeenCalledTimes(3);
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

  test('createRenderer creates independent context per instance (multi-instance props isolation)', async () => {
    const dsl = {
      name: 'MultiInstanceBlock',
      state: {},
      refs: {},
      reactives: {},
      computed: {},
      methods: {},
      props: [
        {
          name: 'propKey',
          type: ['String'],
          default: { type: 'JSExpression', value: "''" },
          required: false
        }
      ],
      emits: [],
      nodes: [{ component: 'div', id: 'n1' }],
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

    // 模拟第一个组件实例（propKey = 'k01'）
    const result1 = await renderer.setup({ propKey: 'k01' });
    const context1 = result1.vtj;

    // 模拟第二个组件实例（propKey = 'k02'）
    const result2 = await renderer.setup({ propKey: 'k02' });
    const context2 = result2.vtj;

    // 模拟第三个组件实例（propKey = 'k03'）
    const result3 = await renderer.setup({ propKey: 'k03' });
    const context3 = result3.vtj;

    // 验证每个实例拥有独立的 props，不会被后续实例覆盖
    expect(context1.props.propKey).toBe('k01');
    expect(context2.props.propKey).toBe('k02');
    expect(context3.props.propKey).toBe('k03');

    // 再次验证 context1 没有被 context2/context3 覆盖
    expect(context1.props.propKey).toBe('k01');
    expect(context2.props.propKey).toBe('k02');
  });
});

describe('block - circular reference detection', () => {
  // Mock window for adoptedStyleSheets (当 dsl 有 id 时会调用)
  const mockWindow = {
    CSSStyleSheet: class MockCSSStyleSheet {
      id = '';
      replaceSync() {}
    },
    document: {
      adoptedStyleSheets: [] as any[],
      head: { appendChild() {} },
      getElementById() {
        return null;
      },
      createElement() {
        return { id: '', innerHTML: '' };
      }
    }
  };

  const createVueMock = (injectValue: any = null) => ({
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
    inject: vi.fn((_key: any, defaultValue: any) => injectValue),
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

  test('detects circular reference and returns __vtjCircular flag', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    // 模拟父级渲染链中已包含当前区块 id
    const chainWithBlockA = new Set(['blockA']);
    const Vue = createVueMock(chainWithBlockA);

    const dsl = {
      name: 'BlockA',
      id: 'blockA',
      state: {},
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

    const setupReturn = await renderer.setup({});
    expect(setupReturn.__vtjCircular).toBe(true);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('检测到区块循环引用')
    );
    warnSpy.mockRestore();
  });

  test('render returns null for circular block', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const chainWithBlockA = new Set(['blockA']);
    const Vue = createVueMock(chainWithBlockA);

    const dsl = {
      name: 'BlockA',
      id: 'blockA',
      state: {},
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
    // 模拟 Vue 将 setup 返回值绑定到组件实例
    const instance = { __vtjCircular: true } as any;
    const result = renderer.render.call(instance);
    expect(result).toBeNull();
    warnSpy.mockRestore();
  });

  test('does not detect circular reference for first-level block', async () => {
    // 顶层区块：inject 返回 null（无父级链）
    const Vue = createVueMock(null);

    const dsl = {
      name: 'RootBlock',
      id: 'rootBlock',
      state: {},
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
      dsl,
      window: mockWindow
    });

    const setupReturn = await renderer.setup({});
    expect(setupReturn.__vtjCircular).toBeUndefined();
    // 验证 provide 被调用，传入了包含当前区块 id 的链
    expect(Vue.provide).toHaveBeenCalledWith(
      expect.any(Symbol),
      expect.any(Set)
    );
    const provideCall = Vue.provide.mock.calls[0];
    const providedChain = provideCall[1] as Set<string>;
    expect(providedChain.has('rootBlock')).toBe(true);
  });

  test('does not detect circular reference for sibling blocks with same id', async () => {
    // 模拟父级链包含 blockA，但当前区块是 blockB（兄弟节点场景）
    const parentChain = new Set(['blockA']);
    const Vue = createVueMock(parentChain);

    const dsl = {
      name: 'BlockB',
      id: 'blockB',
      state: {},
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
      dsl,
      window: mockWindow
    });

    const setupReturn = await renderer.setup({});
    expect(setupReturn.__vtjCircular).toBeUndefined();
    // 验证 provide 传入了包含 blockA 和 blockB 的链
    const provideCall = Vue.provide.mock.calls[0];
    const providedChain = provideCall[1] as Set<string>;
    expect(providedChain.has('blockA')).toBe(true);
    expect(providedChain.has('blockB')).toBe(true);
  });

  test('block without id does not trigger cycle detection', async () => {
    // 区块没有 id，不应触发循环检测
    const parentChain = new Set(['someBlock']);
    const Vue = createVueMock(parentChain);

    const dsl = {
      name: 'NoIdBlock',
      id: undefined,
      state: {},
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

    const setupReturn = await renderer.setup({});
    expect(setupReturn.__vtjCircular).toBeUndefined();
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

describe('block -createEmits handles BlockEmit objects', () => {
  test('createEmits from strings and BlockEmit objects', () => {
    const Vue = {
      defineComponent: (options: any) => options,
      computed: vi.fn((fn: any) => ({ value: fn() })),
      reactive: vi.fn((obj: any) => obj),
      markRaw: vi.fn((obj: any) => obj),
      createVNode: vi.fn((tag: any, props: any, children: any) => ({
        tag,
        props,
        children
      })),
      provide: vi.fn(),
      inject: vi.fn((_key: any, defaultValue: any) => defaultValue),
      getCurrentInstance: () => ({
        proxy: { $el: null, $emit: vi.fn() },
        appContext: { config: { globalProperties: {} } }
      }),
      onMounted: vi.fn(),
      onUnmounted: vi.fn(),
      onBeforeUpdate: vi.fn(),
      watch: vi.fn()
    };

    const dsl = {
      name: 'EmitBlock',
      state: {},
      computed: {},
      methods: {},
      props: [],
      emits: ['click', { name: 'update', description: '更新事件' }],
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

    expect(renderer.emits).toEqual(['click', 'update']);
  });
});

describe('block - createProps with type definitions', () => {
  test('createProps handles BlockProp with type', () => {
    const Vue = {
      defineComponent: (options: any) => options,
      computed: vi.fn((fn: any) => ({ value: fn() })),
      reactive: vi.fn((obj: any) => obj),
      markRaw: vi.fn((obj: any) => obj),
      createVNode: vi.fn((tag: any, props: any, children: any) => ({
        tag,
        props,
        children
      })),
      provide: vi.fn(),
      inject: vi.fn((_key: any, defaultValue: any) => defaultValue),
      getCurrentInstance: () => ({
        proxy: { $el: null, $emit: vi.fn() },
        appContext: { config: { globalProperties: {} } }
      }),
      onMounted: vi.fn(),
      onUnmounted: vi.fn(),
      onBeforeUpdate: vi.fn(),
      watch: vi.fn()
    };

    const dsl = {
      name: 'TypedPropsBlock',
      state: {},
      computed: {},
      methods: {},
      props: [
        {
          name: 'title',
          type: ['String'],
          required: true,
          default: { type: 'JSExpression', value: "'default title'" }
        },
        { name: 'count', type: 'Number' },
        'simpleProp'
      ],
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

    expect(renderer.props.title).toBeDefined();
    expect(renderer.props.title.required).toBe(true);
    expect(renderer.props.title.type).toBeDefined();
    expect(renderer.props.count).toBeDefined();
    expect(renderer.props.simpleProp).toBeDefined();
    // JSExpression default should be parsed
    expect(renderer.props.title.default).toBe('default title');
  });
});

describe('block - state with JSFunction values', () => {
  test('createRenderer handles state with JSFunction values', async () => {
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
      inject: vi.fn((_key: any, defaultValue: any) => defaultValue),
      getCurrentInstance: () => ({
        proxy: { $el: null, $emit: vi.fn() },
        appContext: { config: { globalProperties: {} } }
      }),
      onMounted: vi.fn(),
      onUnmounted: vi.fn(),
      onBeforeUpdate: vi.fn(),
      watch: vi.fn()
    };

    const dsl = {
      name: 'StateFuncBlock',
      state: {
        counter: { type: 'JSFunction', value: '() => 42' }
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
      apiMode: 'options'
    } as any;

    const { renderer } = createRenderer({
      Vue,
      mode: ContextMode.Runtime,
      dsl
    });

    const result = await renderer.setup({});
    expect(result.state).toBeDefined();
    expect(Vue.reactive).toHaveBeenCalled();
  });

  test('createRenderer handles state with JSExpression values', async () => {
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
      inject: vi.fn((_key: any, defaultValue: any) => defaultValue),
      getCurrentInstance: () => ({
        proxy: { $el: null, $emit: vi.fn() },
        appContext: { config: { globalProperties: {} } }
      }),
      onMounted: vi.fn(),
      onUnmounted: vi.fn(),
      onBeforeUpdate: vi.fn(),
      watch: vi.fn()
    };

    const dsl = {
      name: 'StateExprBlock',
      state: {
        count: { type: 'JSExpression', value: '100' }
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
      apiMode: 'options'
    } as any;

    const { renderer } = createRenderer({
      Vue,
      mode: ContextMode.Runtime,
      dsl
    });

    const result = await renderer.setup({});
    expect(result.state).toBeDefined();
    expect(Vue.reactive).toHaveBeenCalledWith(
      expect.objectContaining({ count: 100 })
    );
  });
});

describe('block - computed and methods', () => {
  test('createRenderer creates computed from JSFunction', async () => {
    const self = { count: 10 };
    const Vue = {
      defineComponent: (options: any) => options,
      computed: vi.fn((fn: any) => {
        // 模拟 Vue computed 在正确上下文中执行 getter
        try {
          return { value: fn() };
        } catch (e) {
          return { value: undefined };
        }
      }),
      reactive: vi.fn((obj: any) => obj),
      markRaw: vi.fn((obj: any) => obj),
      createVNode: vi.fn(() => null),
      provide: vi.fn(),
      inject: vi.fn((_key: any, defaultValue: any) => defaultValue),
      getCurrentInstance: () => ({
        proxy: { $el: null, $emit: vi.fn() },
        appContext: { config: { globalProperties: {} } }
      }),
      onMounted: vi.fn(),
      onUnmounted: vi.fn(),
      onBeforeUpdate: vi.fn(),
      watch: vi.fn()
    };

    const dsl = {
      name: 'ComputedBlock',
      state: { count: 10 },
      computed: {
        double: {
          type: 'JSFunction',
          value: 'function() { return this.count * 2; }'
        },
        triple: { type: 'JSExpression', value: 'this.count * 3' }
      },
      methods: {
        greet: { type: 'JSFunction', value: 'function() { return "hello"; }' }
      },
      props: [],
      emits: [],
      nodes: [{ component: 'div' }],
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

    await renderer.setup({});
    // Vue.computed should be called for both computed properties
    expect(Vue.computed).toHaveBeenCalled();
  });
});

describe('block - setWatches', () => {
  test('createRenderer sets up watches', async () => {
    const Vue = {
      defineComponent: (options: any) => options,
      computed: vi.fn((fn: any) => ({ value: fn() })),
      reactive: vi.fn((obj: any) => obj),
      markRaw: vi.fn((obj: any) => obj),
      createVNode: vi.fn(() => null),
      provide: vi.fn(),
      inject: vi.fn((_key: any, defaultValue: any) => defaultValue),
      getCurrentInstance: () => ({
        proxy: { $el: null, $emit: vi.fn() },
        appContext: { config: { globalProperties: {} } }
      }),
      onMounted: vi.fn(),
      onUnmounted: vi.fn(),
      onBeforeUpdate: vi.fn(),
      watch: vi.fn()
    };

    const dsl = {
      name: 'WatchBlock',
      state: { count: 0 },
      computed: {},
      methods: {},
      props: [],
      emits: [],
      nodes: [{ component: 'div' }],
      lifeCycles: {},
      watch: [
        {
          source: { type: 'JSExpression', value: '() => this.count' },
          handler: {
            type: 'JSFunction',
            value: 'function(nv) { console.log(nv); }'
          },
          deep: true,
          immediate: true
        }
      ],
      dataSources: {},
      css: ''
    } as any;

    const { renderer } = createRenderer({
      Vue,
      mode: ContextMode.Runtime,
      dsl
    });

    await renderer.setup({});
    expect(Vue.watch).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      expect.objectContaining({ deep: true, immediate: true })
    );
  });
});

describe('block - createInject', () => {
  test('createRenderer handles injects', async () => {
    const Vue = {
      defineComponent: (options: any) => options,
      computed: vi.fn((fn: any) => ({ value: fn() })),
      reactive: vi.fn((obj: any) => obj),
      markRaw: vi.fn((obj: any) => obj),
      createVNode: vi.fn(() => null),
      provide: vi.fn(),
      inject: vi.fn((key: any, defaultValue: any) => defaultValue),
      getCurrentInstance: () => ({
        proxy: { $el: null, $emit: vi.fn() },
        appContext: { config: { globalProperties: {} } }
      }),
      onMounted: vi.fn(),
      onUnmounted: vi.fn(),
      onBeforeUpdate: vi.fn(),
      watch: vi.fn()
    };

    const dsl = {
      name: 'InjectBlock',
      state: {},
      computed: {},
      methods: {},
      props: [],
      emits: [],
      inject: [
        { name: 'theme', from: { type: 'JSExpression', value: "'themeKey'" } },
        { name: 'locale', from: 'localeKey' },
        {
          name: 'config',
          from: { type: 'JSExpression', value: "'configKey'" },
          default: { type: 'JSExpression', value: "'defaultConfig'" }
        }
      ],
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
    // inject is also called for circular reference block chain detection
    expect(Vue.inject).toHaveBeenCalled();
    // theme: parsed from JSExpression "'themeKey'" = 'themeKey'
    expect(Vue.inject).toHaveBeenCalledWith('themeKey', null);
    // locale: from string 'localeKey'
    expect(Vue.inject).toHaveBeenCalledWith('localeKey', null);
    // config: from parsed "'configKey'" = 'configKey', default parsed "'defaultConfig'" = 'defaultConfig'
    expect(Vue.inject).toHaveBeenCalledWith('configKey', 'defaultConfig');
  });
});
