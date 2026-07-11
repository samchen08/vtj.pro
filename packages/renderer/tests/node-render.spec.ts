import { expect, test, describe, vi, beforeEach, beforeAll } from 'vitest';
import { Context } from '../src/render/context';
import { ContextMode } from '../src/constants';
import { nodeCache } from '../src/render/cache';

// 构建可复用的 Vue mock
function createVueMock(overrides: Record<string, any> = {}) {
  const directives: Record<string, any> = {};
  const components: Record<string, any> = {};
  return {
    createVNode: vi.fn((tag: any, props: any, children: any) => ({
      tag,
      props,
      children
    })),
    createTextVNode: vi.fn((text: string) => ({
      type: 'text',
      children: text
    })),
    withDirectives: vi.fn((vnode: any, dirs: any) => ({
      ...vnode,
      _withDirectives: dirs
    })),
    withModifiers: vi.fn((fn: Function, _modifiers: string[]) => fn),
    getCurrentInstance: () => ({
      proxy: { $el: null, $emit: vi.fn(), $refs: {} },
      appContext: {
        app: {
          directive: (name: string) => directives[name],
          component: (name: string) => components[name]
        },
        config: { globalProperties: {} }
      }
    }),
    isRef: vi.fn(() => false),
    ...overrides
  };
}

function createContext(attrs: Record<string, any> = {}) {
  return new Context({
    mode: ContextMode.Runtime,
    attrs: {
      $components: { ...attrs.$components },
      $libs: attrs.$libs || {},
      $apis: attrs.$apis || {},
      ...attrs
    }
  });
}

// 动态导入 nodeRender
let nodeRender: Function;
beforeAll(async () => {
  const mod = await import('../src/render/node');
  nodeRender = mod.nodeRender;
});

describe('nodeRender - basic', () => {
  beforeEach(() => {
    nodeCache.clear();
  });

  test('returns null for null/undefined dsl', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    expect(nodeRender(null, ctx, Vue)).toBeNull();
    expect(nodeRender(undefined, ctx, Vue)).toBeNull();
  });

  test('returns null for dsl without name', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    expect(nodeRender({ name: '' }, ctx, Vue)).toBeNull();
  });

  test('returns null for invisible dsl', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    expect(nodeRender({ name: 'div', invisible: true }, ctx, Vue)).toBeNull();
  });

  test('renders simple html tag node', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    const result = nodeRender(
      { name: 'div', id: 'n1', children: 'hello' },
      ctx,
      Vue
    );
    expect(result).toBeDefined();
    expect(result.tag).toBe('div');
  });

  test('renders component from context components', () => {
    const MyComp = { name: 'MyComp' };
    const Vue = createVueMock();
    const ctx = createContext({ $components: { MyComp } });
    const result = nodeRender(
      { name: 'MyComp', id: 'n1', children: 'hello' },
      ctx,
      Vue
    );
    expect(result).toBeDefined();
    expect(result.tag).toBe(MyComp);
  });

  test('renders built-in component tag', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    // 'component' is a built-in tag, should resolve from props.is
    const result = nodeRender(
      { name: 'component', id: 'n1', props: { is: 'div' } },
      ctx,
      Vue
    );
    expect(result).toBeDefined();
  });

  test('v-else-if/v-else without v-if returns null when not isBranch', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    const result = nodeRender(
      {
        name: 'div',
        id: 'n1',
        directives: [
          { name: 'v-else-if', value: { type: 'JSExpression', value: 'true' } }
        ]
      },
      ctx,
      Vue
    );
    expect(result).toBeNull();
  });
});

describe('nodeRender - v-if/v-else-if/v-else', () => {
  beforeEach(() => {
    nodeCache.clear();
  });

  test('v-if truthy renders node', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    const result = nodeRender(
      {
        name: 'div',
        id: 'n1',
        children: 'visible',
        directives: [
          { name: 'v-if', value: { type: 'JSExpression', value: 'true' } }
        ]
      },
      ctx,
      Vue
    );
    expect(result).toBeDefined();
    expect(result.tag).toBe('div');
  });

  test('v-if falsy returns null', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    const result = nodeRender(
      {
        name: 'div',
        id: 'n1',
        directives: [
          { name: 'v-if', value: { type: 'JSExpression', value: 'false' } }
        ]
      },
      ctx,
      Vue
    );
    // v-if falsy tries branchRender, but with only one brother (itself), returns null
    expect(result).toBeNull();
  });
});

describe('nodeRender - v-show/v-html/v-bind', () => {
  beforeEach(() => {
    nodeCache.clear();
  });

  test('v-show truthy keeps node visible', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    const result = nodeRender(
      {
        name: 'div',
        id: 'n1',
        children: 'text',
        directives: [
          { name: 'v-show', value: { type: 'JSExpression', value: 'true' } }
        ]
      },
      ctx,
      Vue
    );
    expect(result).toBeDefined();
    expect(result.props.style).toEqual({});
  });

  test('v-show falsy adds display:none', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    const result = nodeRender(
      {
        name: 'div',
        id: 'n1',
        children: 'text',
        directives: [
          { name: 'v-show', value: { type: 'JSExpression', value: 'false' } }
        ]
      },
      ctx,
      Vue
    );
    expect(result).toBeDefined();
    expect(result.props.style).toEqual({ display: 'none' });
  });

  test('v-html renders innerHTML', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    const result = nodeRender(
      {
        name: 'div',
        id: 'n1',
        children: 'text',
        directives: [
          {
            name: 'v-html',
            value: { type: 'JSExpression', value: '"<b>bold</b>"' }
          }
        ]
      },
      ctx,
      Vue
    );
    expect(result).toBeDefined();
    expect(result.props.innerHTML).toBe('<b>bold</b>');
  });

  test('v-html with empty value renders empty string', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    const result = nodeRender(
      {
        name: 'div',
        id: 'n1',
        directives: [
          { name: 'v-html', value: { type: 'JSExpression', value: '""' } }
        ]
      },
      ctx,
      Vue
    );
    expect(result).toBeDefined();
    expect(result.props.innerHTML).toBe('');
  });

  test('v-bind merges props', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    const result = nodeRender(
      {
        name: 'div',
        id: 'n1',
        props: { class: 'base' },
        directives: [
          {
            name: 'v-bind',
            value: { type: 'JSExpression', value: '({ id: "bound" })' }
          }
        ]
      },
      ctx,
      Vue
    );
    expect(result).toBeDefined();
    expect(result.props.id).toBe('bound');
    expect(result.props.class).toBe('base');
  });
});

describe('nodeRender - v-model', () => {
  beforeEach(() => {
    nodeCache.clear();
  });

  test('v-model on native html element', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    const result = nodeRender(
      {
        name: 'input',
        id: 'n1',
        directives: [
          {
            name: 'v-model',
            value: { type: 'JSExpression', value: 'myVal' },
            arg: { type: 'JSExpression', value: "'value'" }
          }
        ]
      },
      ctx,
      Vue
    );
    expect(result).toBeDefined();
    // Native v-model sets value + onInput
    expect(result.props.onInput).toBeDefined();
    expect('value' in result.props).toBe(true);
  });

  test('v-model on custom component', () => {
    const Vue = createVueMock();
    const ctx = createContext({ $components: { MyInput: {} } });
    const result = nodeRender(
      {
        name: 'MyInput',
        id: 'n1',
        directives: [
          {
            name: 'v-model',
            value: { type: 'JSExpression', value: 'myVal' }
          }
        ]
      },
      ctx,
      Vue
    );
    expect(result).toBeDefined();
    expect(result.props.modelValue).toBeUndefined();
    expect(result.props['onUpdate:modelValue']).toBeDefined();
  });
});

describe('nodeRender - v-for', () => {
  beforeEach(() => {
    nodeCache.clear();
  });

  test('v-for iterates array', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    const result = nodeRender(
      {
        name: 'div',
        id: 'n1',
        children: '{{item}}',
        directives: [
          {
            name: 'v-for',
            value: { type: 'JSExpression', value: '[1,2,3]' },
            iterator: { item: 'item', index: 'idx' }
          }
        ]
      },
      ctx,
      Vue
    );
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(3);
  });

  test('v-for with integer creates range', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    const result = nodeRender(
      {
        name: 'span',
        id: 'n1',
        children: 'x',
        directives: [
          {
            name: 'v-for',
            value: { type: 'JSExpression', value: '3' }
          }
        ]
      },
      ctx,
      Vue
    );
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(3);
  });

  test('v-for empty array returns empty', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    const result = nodeRender(
      {
        name: 'div',
        id: 'n1',
        directives: [
          {
            name: 'v-for',
            value: { type: 'JSExpression', value: '[]' }
          }
        ]
      },
      ctx,
      Vue
    );
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);
  });
});

describe('nodeRender - slots', () => {
  beforeEach(() => {
    nodeCache.clear();
  });

  test('renders text children', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    const result = nodeRender(
      { name: 'div', id: 'n1', children: 'plain text' },
      ctx,
      Vue
    );
    expect(result).toBeDefined();
    // children is string -> converted to slots with default slot
    expect(result.children).toBeDefined();
  });

  test('renders JSExpression children', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    const result = nodeRender(
      {
        name: 'div',
        id: 'n1',
        children: { type: 'JSExpression', value: '"dynamic"' }
      },
      ctx,
      Vue
    );
    expect(result).toBeDefined();
  });

  test('renders array children', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    const result = nodeRender(
      {
        name: 'div',
        id: 'n1',
        children: [
          { name: 'span', id: 'c1', children: 'a' },
          { name: 'span', id: 'c2', children: 'b' }
        ]
      },
      ctx,
      Vue
    );
    expect(result).toBeDefined();
    // children is array -> wrapped in default slot
    expect(result.children).toBeDefined();
    expect(result.children.default).toBeDefined();
  });

  test('node with slot="named" creates named slots', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    const result = nodeRender(
      {
        name: 'div',
        id: 'n1',
        children: [
          { name: 'span', id: 'c1', slot: 'header', children: 'h' },
          { name: 'span', id: 'c2', slot: 'default', children: 'd' }
        ]
      },
      ctx,
      Vue
    );
    expect(result).toBeDefined();
    expect(result.children).toBeDefined();
  });
});

describe('nodeRender - events', () => {
  beforeEach(() => {
    nodeCache.clear();
  });

  test('renders node with click event', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    const result = nodeRender(
      {
        name: 'button',
        id: 'n1',
        children: 'click me',
        events: {
          click: {
            handler: { type: 'JSFunction', value: 'function() { return 1; }' }
          }
        }
      },
      ctx,
      Vue
    );
    expect(result).toBeDefined();
  });
});

describe('nodeRender - multiple nodes return wrapper div', () => {
  test('single node renders directly', () => {
    const Vue = createVueMock();
    const ctx = createContext();
    // nodeRender itself handles single node - tested above
    // This tests in the context of block render's render function
    const result = nodeRender(
      { name: 'div', id: 'n1', children: 'single' },
      ctx,
      Vue,
      undefined,
      [{ name: 'div', id: 'n1', children: 'single' }],
      false,
      0
    );
    expect(result).toBeDefined();
    expect(result.tag).toBe('div');
  });
});

describe('nodeRender - design mode', () => {
  test('design mode adds data-vtj attribute', () => {
    const Vue = createVueMock();
    const ctx = new Context({
      mode: ContextMode.Design,
      attrs: { $components: {} }
    });
    const result = nodeRender(
      { name: 'div', id: 'n1', children: 'text' },
      ctx,
      Vue
    );
    expect(result).toBeDefined();
    expect(result.props['data-vtj']).toBe('n1');
  });
});
