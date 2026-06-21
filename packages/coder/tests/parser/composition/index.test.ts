import { expect, describe, test } from 'vitest';
import { parserComposition } from '../../../src/parser/composition';
import { Collecter } from '../../../src/collecter';

describe('parserComposition', () => {
  test('should parse empty DSL', () => {
    const dsl = { id: 'test', name: 'Test', apiMode: 'composition' } as any;
    const collecter = new Collecter(dsl, []);
    const token = parserComposition(collecter, new Map(), 'web');
    expect(token.id).toBe('test');
    expect(token.name).toBe('Test');
    expect(token.renderer).toBe('@vtj/renderer');
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
