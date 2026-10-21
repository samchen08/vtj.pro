import { expect, describe, test } from 'vitest';
import { parserComposition } from '../../../src/parser/composition';
import { Collecter } from '../../../src/collecter';
import type { BlockSchema } from '@vtj/core';

describe('parserComposition', () => {
  test('should parse empty DSL', () => {
    const dsl = { id: 'test', name: 'Test', apiMode: 'composition' } as any;
    const collecter = new Collecter(dsl, []);
    const token = parserComposition(collecter, new Map(), 'web');
    expect(token.id).toBe('test');
    expect(token.name).toBe('Test');
    expect(token.renderer).toBe('@vtj/renderer');
    expect(token.imports).not.toContain('getCurrentInstance');
    expect(token.globalApiDeclares).toBe('');
  });

  test('should execute custom global methods without an enhance key list', () => {
    const dsl: BlockSchema = {
      name: 'Test',
      methods: {
        read: {
          type: 'JSFunction',
          value: 'function() { return this.custom() + this.$custom; }'
        },
        refs: { type: 'JSFunction', value: '() => this.$refs' }
      }
    };
    const token = parserComposition(new Collecter(dsl, []), new Map());
    const read = new Function(
      'getCurrentInstance',
      `${token.globalApiDeclares}\n${token.methods}\nreturn read();`
    );
    expect(read(() => ({ proxy: { custom: () => 7, $custom: 3 } }))).toBe(10);
    expect(token.imports.match(/\bgetCurrentInstance\b/g)).toHaveLength(1);
    expect(token.globalApiDeclares).toBe(
      'const __instance = getCurrentInstance();'
    );
  });

  test('should not import APIs shadowed by local refs and props', () => {
    const dsl: BlockSchema = {
      name: 'Test',
      refs: { $router: 42 },
      props: ['$emit'],
      methods: {
        read: {
          type: 'JSFunction',
          value: '() => this.$router.value + this.$emit'
        }
      }
    };
    const token = parserComposition(new Collecter(dsl, []), new Map());
    expect(token.methods).toContain('$router.value + __props.$emit');
    expect(token.imports).not.toContain('vue-router');
    expect(token.imports).not.toContain('getCurrentInstance');
    expect(token.needsEmit).toBe(false);
    expect(token.globalApiDeclares).toBe('');
  });

  test('should collect globals used by setup, lifecycle and composable calls', () => {
    const dsl: BlockSchema = {
      name: 'Test',
      setup: { type: 'JSFunction', value: '() => this.$router.push("/")' },
      lifeCycles: {
        mounted: { type: 'JSFunction', value: '() => this.custom()' }
      },
      composables: [
        {
          name: 'result',
          composable: { type: 'JSExpression', value: 'this.useCustom' },
          args: [{ type: 'JSExpression', value: 'this.$attrs' }]
        }
      ]
    };
    const token = parserComposition(new Collecter(dsl, []), new Map());
    expect(token.setupStatements).toContain('__router.push("/")');
    expect(token.lifeCycles).toContain('__instance.proxy.custom()');
    expect(token.composables).toContain(
      'const result = __instance.proxy.useCustom(__attrs)'
    );
    expect(token.imports).toContain('getCurrentInstance');
    expect(token.imports).toContain('useRouter');
    expect(token.imports).toContain('useAttrs');
    expect(token.globalApiDeclares).toContain('const __attrs = useAttrs();');
    expect(token.globalApiDeclares).toContain('const __router = useRouter();');
  });

  test('should parse state as reactive', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      apiMode: 'composition',
      state: { count: 0, title: 'hello' },
      nodes: []
    } as any;
    const collecter = new Collecter(dsl, []);
    const token = parserComposition(collecter, new Map(), 'web');
    expect(token.state).toContain('const __state = reactive({');
    expect(token.state).toContain('count: 0');
    expect(token.state).toContain('title: "hello"');
  });

  test('should parse refs', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      apiMode: 'composition',
      refs: { count: 0, name: 'vtj' },
      nodes: []
    } as any;
    const collecter = new Collecter(dsl, []);
    const token = parserComposition(collecter, new Map(), 'web');
    expect(token.refs).toContain('const count = ref(0)');
    expect(token.refs).toContain('const name = ref("vtj")');
  });

  test('should parse reactives', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      apiMode: 'composition',
      reactives: { form: { name: '', age: 0 } },
      nodes: []
    } as any;
    const collecter = new Collecter(dsl, []);
    const token = parserComposition(collecter, new Map(), 'web');
    expect(token.reactives).toContain(
      'const form = reactive({"name":"","age":0})'
    );
  });

  test('should parse props and emits', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      apiMode: 'composition',
      props: [{ name: 'title', type: 'String', default: 'Hi' }],
      emits: ['change'],
      nodes: []
    } as any;
    const collecter = new Collecter(dsl, []);
    const token = parserComposition(collecter, new Map(), 'web');
    expect(token.props).toContain('title');
    expect(token.emits).toContain("'change'");
  });
});
