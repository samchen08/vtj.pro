import { expect, test, describe } from 'vitest';
import { parseScriptSetup } from '../src/vue/scriptSetup';
import { project } from './sources/project';

const setupSource = `
import { ref, reactive, computed, watch, onMounted, inject, provide, defineProps, defineEmits, defineExpose } from 'vue';
import { ElButton } from 'element-plus';

const props = defineProps({
  title: { type: String, required: true }
});

const emit = defineEmits(['change', 'update']);

const count = ref(0);
const message = ref('hello');

const __state = reactive({
  loading: false,
  list: []
});

const form = reactive({
  name: '',
  age: 0
});

const doubleCount = computed(() => count.value * 2);

function increment() {
  count.value++;
  emit('change', count.value);
}

const theme = inject('theme', 'light');

provide('key', 'value');

watch(
  () => count.value,
  (val) => {
    console.log('changed:', val);
  },
  { immediate: true }
);

onMounted(() => {
  console.log('mounted');
});

defineExpose({ count, increment });
`;

describe('parseScriptSetup', () => {
  const result = parseScriptSetup(setupSource, project);

  test('should parse imports', () => {
    expect(result.imports).toBeDefined();
    expect(result.imports!.length).toBeGreaterThan(0);
    const vueImport = result.imports!.find((i) => i.from === 'vue');
    expect(vueImport).toBeDefined();
  });

  test('should parse refs', () => {
    expect(result.refs).toBeDefined();
    expect(result.refs!['count']).toBeDefined();
    expect(result.refs!['message']).toBeDefined();
  });

  test('should parse state from reactive', () => {
    expect(result.state).toBeDefined();
    expect(result.state!['loading']).toBeDefined();
    expect(result.state!['list']).toBeDefined();
  });

  test('should parse other reactives', () => {
    expect(result.reactives).toBeDefined();
    expect(result.reactives!['form']).toBeDefined();
  });

  test('should parse computed', () => {
    expect(result.computed).toBeDefined();
    expect(result.computed!['doubleCount']).toBeDefined();
  });

  test('should parse methods', () => {
    expect(result.methods).toBeDefined();
    expect(result.methods!['increment']).toBeDefined();
  });

  test('should parse props via defineProps', () => {
    expect(result.props).toBeDefined();
    expect(result.props!.length).toBeGreaterThan(0);
  });

  test('should parse emits via defineEmits', () => {
    expect(result.emits).toBeDefined();
    expect(result.emits!.length).toBe(2);
  });

  test('should parse watch', () => {
    expect(result.watch).toBeDefined();
    expect(result.watch!.length).toBeGreaterThan(0);
  });

  test('should parse lifeCycles', () => {
    expect(result.lifeCycles).toBeDefined();
    expect(result.lifeCycles!['onMounted']).toBeDefined();
  });

  test('should parse inject', () => {
    expect(result.inject).toBeDefined();
    expect(result.inject!.length).toBeGreaterThan(0);
    expect(result.inject![0].name).toBe('theme');
  });

  test('should parse provide', () => {
    expect(result.provide).toBeDefined();
    expect(result.provide!['key']).toBeDefined();
  });

  test('should parse expose', () => {
    expect(result.expose).toBeDefined();
    expect(result.expose).toContain('count');
    expect(result.expose).toContain('increment');
  });
});

describe('parseScriptSetup with ClassDeclaration', () => {
  test('should throw error for top-level class declaration', () => {
    const classSource = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: '1kzck23e', version: '1781335863126' })

class TClass {

}
`;

    expect(() => parseScriptSetup(classSource, project)).toThrow(
      /无法处理顶层类声明/
    );
  });
});

describe('parseScriptSetup orphan variable fallback → reactive', () => {
  test('should convert const with {} to reactive', () => {
    const source = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

const data1 = {};
`;
    const result = parseScriptSetup(source, project);
    expect(result.reactives).toBeDefined();
    expect(result.reactives['data1']).toBeDefined();
    expect(result.reactives['data1']).toHaveProperty('value', '({})');
    // setup 中不应包含该游离声明
    if (result.setup) {
      expect(result.setup.value).not.toContain('data1');
    }
  });

  test('should convert const with [] to reactive', () => {
    const source = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

const data2 = [];
`;
    const result = parseScriptSetup(source, project);
    expect(result.reactives).toBeDefined();
    expect(result.reactives['data2']).toBeDefined();
    expect(result.reactives['data2']).toHaveProperty('value', '[]');
  });

  test('should convert multiple orphan {} and [] in same SFC', () => {
    const source = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

const data1 = {};
const data2 = [];
`;
    const result = parseScriptSetup(source, project);
    expect(result.reactives).toBeDefined();
    expect(result.reactives['data1']).toBeDefined();
    expect(result.reactives['data1']).toHaveProperty('value', '({})');
    expect(result.reactives['data2']).toBeDefined();
    expect(result.reactives['data2']).toHaveProperty('value', '[]');
  });

  test('should convert multiple declarators in one const with object/array literals', () => {
    const source = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

const a = {}, b = [];
`;
    const result = parseScriptSetup(source, project);
    expect(result.reactives).toBeDefined();
    expect(result.reactives['a']).toBeDefined();
    expect(result.reactives['a']).toHaveProperty('value', '({})');
    expect(result.reactives['b']).toBeDefined();
    expect(result.reactives['b']).toHaveProperty('value', '[]');
  });

  test('should throw error for const with number literal', () => {
    const source = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

const count = 42;
`;
    expect(() => parseScriptSetup(source, project)).toThrow(
      /无法处理顶层变量声明/
    );
  });

  test('should throw error for const with string literal', () => {
    const source = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

const title = 'hello';
`;
    expect(() => parseScriptSetup(source, project)).toThrow(
      /无法处理顶层变量声明/
    );
  });

  test('should throw error for const with Identifier', () => {
    const source = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });
const other = __provider;
`;
    expect(() => parseScriptSetup(source, project)).toThrow(
      /无法处理顶层变量声明/
    );
  });

  test('should throw error for local useXxx() call', () => {
    const source = `
import { ref } from 'vue';

function useMyHelper() {
  const x = ref(0);
  return x;
}

const val = useMyHelper();
`;
    expect(() => parseScriptSetup(source, project)).toThrow(
      /无法处理顶层变量声明/
    );
  });

  test('should throw error for const with unrecognized function call', () => {
    const source = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

const useMouse = function () {
  return { value: 'abc' };
};
const data4 = useMouse();
`;
    expect(() => parseScriptSetup(source, project)).toThrow(
      /无法处理顶层变量声明/
    );
  });

  test('should throw error for top-level class declaration', () => {
    const source = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

class KClass {}
`;
    expect(() => parseScriptSetup(source, project)).toThrow(
      /无法处理顶层类声明/
    );
  });
});
