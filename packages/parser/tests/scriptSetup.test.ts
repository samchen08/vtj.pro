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
    expect(result.lifeCycles!['mounted']).toBeDefined();
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
