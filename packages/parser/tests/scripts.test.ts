import { expect, test, describe } from 'vitest';
import { parseScripts } from '../src/vue/scripts';
import { project } from './sources/project';

const optionsScriptSource = `
import { defineComponent, ref, reactive, computed } from 'vue';
import { ElButton } from 'element-plus';

export default defineComponent({
  name: 'TestComponent',
  props: {
    title: { type: String, required: true, default: 'Hello' }
  },
  setup() {
    const state = reactive({
      items: [],
      loading: false
    });
    return { items, loading };
  }
});
`;

describe('parseScripts', () => {
  const result = parseScripts(optionsScriptSource, project);

  test('should parse imports', () => {
    expect(result.imports).toBeDefined();
    expect(result.imports!.length).toBeGreaterThan(0);
  });

  test('should parse state from setup', () => {
    expect(result.state).toBeDefined();
    expect(result.state!['items']).toBeDefined();
    expect(result.state!['loading']).toBeDefined();
  });
});

const emitsSource = `
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'Aaa',
  emits: [
    'update:pageSize',
    'update:pageNum',
    'row-click',
    'smt-add',
    'sort-change'
  ],
  setup() {
    const state = reactive({});
    return { state };
  }
});
`;

describe('parseScripts emits', () => {
  const result = parseScripts(emitsSource, project);

  test('should parse emits array from Options API', () => {
    expect(result.emits).toBeDefined();
    expect(result.emits!.length).toBe(5);
    expect(result.emits![0]).toEqual({ name: 'update:pageSize', params: [] });
    expect(result.emits![1]).toEqual({ name: 'update:pageNum', params: [] });
    expect(result.emits![4]).toEqual({ name: 'sort-change', params: [] });
  });
});
