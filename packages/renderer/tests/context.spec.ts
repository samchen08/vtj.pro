import { expect, test, describe, beforeEach, vi } from 'vitest';
import { Context } from '../src/render/context';
import { ContextMode, CONTEXT_HOST } from '../src/constants';

describe('Context', () => {
  let context: Context;

  beforeEach(() => {
    context = new Context({
      mode: ContextMode.Runtime,
      dsl: {
        id: 'test-id',
        transform: { 'func-1': 'transformed-value' }
      } as any,
      attrs: {
        $components: { MyComponent: {} },
        $libs: { lodash: {} },
        $apis: { fetchData: async () => ({}) }
      }
    });
  });

  test('constructor initializes with mode and dsl', () => {
    expect(context.__mode).toBe(ContextMode.Runtime);
    expect(context.__id).toBe('test-id');
  });

  test('constructor sets default values', () => {
    expect(context.state).toEqual({});
    expect(context.context).toEqual({});
    expect(context.props).toEqual({});
    expect(context.$props).toEqual({});
    // refs/reactives 不在 Context 构造函数中初始化，
    // 而是通过 setup() 中 Object.assign(this, attrs) 动态挂载
    expect((context as any).refs).toBeUndefined();
    expect((context as any).reactives).toBeUndefined();
  });

  test('constructor assigns attrs to instance', () => {
    expect(context.$components).toEqual({ MyComponent: {} });
    expect(context.$libs).toEqual({ lodash: {} });
    expect(context.$apis.fetchData).toBeDefined();
  });

  test('constructor uses empty id when dsl has no id', () => {
    const c = new Context({ mode: ContextMode.Design });
    expect(c.__id).toBeNull();
  });

  test('__parseFunction returns undefined when code is null', () => {
    expect(context.__parseFunction(undefined)).toBeUndefined();
  });

  test('__parseFunction uses transform in Runtime mode', () => {
    const result = context.__parseFunction({
      id: 'func-1',
      type: 'JSFunction',
      value: 'return 1'
    });
    // transform 'transformed-value' overrides the value, but it's not valid JS code
    // so the result will be undefined (parse error caught by logger)
    expect(result).toBeUndefined();
  });

  test('__parseFunction uses original value when transform not found', () => {
    const result = context.__parseFunction({
      id: 'unknown-id',
      type: 'JSFunction',
      value: '() => 42'
    });
    expect(result).toBeDefined();
    expect(typeof result).toBe('function');
  });

  test('__parseExpression returns undefined when code is null', () => {
    expect(context.__parseExpression(undefined)).toBeUndefined();
  });

  test('__parseExpression uses transform in Runtime mode', () => {
    const result = context.__parseExpression({
      id: 'func-1',
      type: 'JSExpression',
      value: '42'
    });
    // transform 'transformed-value' overrides, but it's not valid JS expression
    expect(result).toBeUndefined();
  });

  test('__parseExpression parses plain expression', () => {
    const result = context.__parseExpression({
      type: 'JSExpression',
      value: '42'
    });
    expect(result).toBe(42);
  });

  test('__ref in VNode mode returns undefined', () => {
    const vnodeCtx = new Context({ mode: ContextMode.VNode });
    expect(vnodeCtx.__ref('any-id')).toBeUndefined();
  });

  test('__ref returns a function', () => {
    const refFunc = context.__ref('block-id');
    expect(typeof refFunc).toBe('function');
  });

  test('__ref caches the function by id', () => {
    const refFunc1 = context.__ref('block-id');
    const refFunc2 = context.__ref('block-id');
    expect(refFunc1).toBe(refFunc2);
  });

  test('__ref with non-matching id stores context ref', () => {
    context.__ref('other-id');
    expect(context.__contextRefs['other-id']).toBe(context);
  });

  test('__ref with same id does not store context ref', () => {
    context.__ref('test-id');
    expect(context.__contextRefs['test-id']).toBeUndefined();
  });

  test('__ref without id returns unique function each call', () => {
    const refFunc1 = context.__ref();
    const refFunc2 = context.__ref();
    expect(refFunc1).not.toBe(refFunc2);
  });

  test('__ref stores ref by string name', async () => {
    const refFunc = context.__ref(null, 'myRef');
    const mockEl = { nodeType: 1 };
    await refFunc(mockEl);
    expect(context.$refs['myRef']).toBe(mockEl);
  });

  test('__ref with function ref calls the function', async () => {
    const fn = vi.fn();
    const refFunc = context.__ref(null, fn);
    const mockEl = { nodeType: 1 };
    await refFunc(mockEl);
    expect(fn).toHaveBeenCalledWith(mockEl);
  });

  test('__getRefEl returns el when no existing ref', () => {
    const el = {};
    expect(context.__getRefEl({}, 'key', el)).toBe(el);
  });

  test('__getRefEl merges duplicates into array', () => {
    const el1 = { id: 1 };
    const el2 = { id: 2 };
    const refs: Record<string, any> = { key: el1 };
    const result = context.__getRefEl(refs, 'key', el2);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toContain(el1);
    expect(result).toContain(el2);
  });

  test('__getRefEl returns same el when el equals existing', () => {
    const el = {};
    const refs: Record<string, any> = { key: el };
    expect(context.__getRefEl(refs, 'key', el)).toBe(el);
  });

  test('__clone creates copy with merged context', () => {
    context.context = { existingKey: 'value1' };
    const cloned = context.__clone({ newKey: 'value2' });
    expect(cloned.context).toBeDefined();
    expect(cloned.context.existingKey).toBe('value1');
    expect(cloned.context.newKey).toBe('value2');
  });

  test('__clone sets __proto__ chain', () => {
    const cloned = context.__clone();
    expect(Object.getPrototypeOf(cloned)).toBe(context);
    expect(Object.getPrototypeOf(cloned.context)).toBe(context.context);
  });

  test('__proxy sets CONTEXT_HOST properties from instance', () => {
    // Manually call __proxy - normally called in setup
    (context as any).__instance = {
      $el: { tagName: 'DIV' },
      $emit: vi.fn()
    };
    (context as any).__proxy();
    expect(context.$el).toBeDefined();
    expect(context.$emit).toBeDefined();
  });

  test('__cleanup resets CONTEXT_HOST properties to null', () => {
    (context as any).$el = 'something';
    (context as any).__cleanup();
    expect((context as any).$el).toBeNull();
  });

  test('__reset clears refs and context', () => {
    context.__refs = { some: 'ref' };
    context.__refCaches = { some: 'cache' };
    context.$refs = { some: 'ref' };
    context.__contextRefs = { some: context };
    context.context = { some: 'data' };
    (context as any).__reset();
    expect(context.__refs).toEqual({});
    expect(context.__refCaches).toEqual({});
    expect(context.$refs).toEqual({});
    expect(context.__contextRefs).toEqual({});
    expect(context.context).toEqual({});
  });

  test('setup with no current instance returns early', () => {
    const mockVue = {
      getCurrentInstance: () => null
    };
    context.setup({}, mockVue);
    expect(context.__instance).toBeNull();
  });

  test('setup registers proxy, mount, unmount and beforeUpdate hooks', () => {
    const onMounted = vi.fn();
    const onUnmounted = vi.fn();
    const onBeforeUpdate = vi.fn();
    const mockVue = {
      getCurrentInstance: () => ({
        proxy: { $el: null, $emit: vi.fn() },
        appContext: {
          config: { globalProperties: {} }
        }
      }),
      onMounted,
      onUnmounted,
      onBeforeUpdate
    };
    context.setup({}, mockVue);
    expect(onMounted).toHaveBeenCalled();
    expect(onUnmounted).toHaveBeenCalled();
    expect(onBeforeUpdate).toHaveBeenCalled();
  });
});
