import { expect, test, describe } from 'vitest';
import { parseVue } from '../src';
import { project } from './sources/project';

const compositionSource = `
<template>
  <div class="demo">
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <p>Double: {{ double }}</p>
    <button @click="increment">+1</button>
    <span>{{ greeting }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, inject, provide } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMouse } from '@vueuse/core';

const props = defineProps({
  title: { type: String, required: true, default: 'Hello' }
});

const emit = defineEmits(['change', 'update']);

const router = useRouter();
const route = useRoute();
const { x, y } = useMouse();

const count = ref(0);
const message = ref('hello');

const state = reactive({
  loading: false,
  list: []
});

const form = reactive({
  name: '',
  age: 0
});

const double = computed(() => count.value * 2);

const greeting = computed(() => {
  return props.title + ' ' + message.value;
});

function increment() {
  count.value++;
  emit('change', count.value);
}

async function fetchData() {
  state.loading = true;
  const data = await fetch('/api/data');
  state.list = await data.json();
  state.loading = false;
}

const theme = inject('theme', 'light');

provide('count', count);

watch(
  () => count.value,
  (val) => {
    console.log('count changed:', val);
    router.push('/result');
  },
  { immediate: true }
);

onMounted(() => {
  fetchData();
  console.log(route.path);
});

defineExpose({ count, increment });
</script>

<style scoped>
.demo { padding: 20px; }
</style>
`;

describe('parseVue Composition mode', () => {
  test('basic composition parsing', async () => {
    const result = await parseVue({
      project,
      id: 'test-composition-1',
      name: 'CompositionDemo',
      source: compositionSource
    });

    expect(result).toBeDefined();
    expect(result.apiMode).toBe('composition');
    expect(result.name).toBe('CompositionDemo');
  });

  test('refs are correctly parsed', async () => {
    const result = await parseVue({
      project,
      id: 'test-composition-2',
      name: 'CompositionDemo',
      source: compositionSource
    });

    expect(result.refs).toBeDefined();
    expect(result.refs!['count']).toBeDefined();
    expect(result.refs!['message']).toBeDefined();
  });

  test('state (reactive) is correctly parsed', async () => {
    const result = await parseVue({
      project,
      id: 'test-composition-3',
      name: 'CompositionDemo',
      source: compositionSource
    });

    expect(result.state).toBeDefined();
    expect(result.state!['loading']).toBeDefined();
    expect(result.state!['list']).toBeDefined();
  });

  test('reactives are correctly parsed', async () => {
    const result = await parseVue({
      project,
      id: 'test-composition-4',
      name: 'CompositionDemo',
      source: compositionSource
    });

    expect(result.reactives).toBeDefined();
    expect(result.reactives!['form']).toBeDefined();
  });

  test('computed is correctly parsed', async () => {
    const result = await parseVue({
      project,
      id: 'test-composition-5',
      name: 'CompositionDemo',
      source: compositionSource
    });

    expect(result.computed).toBeDefined();
    expect(result.computed!['double']).toBeDefined();
    expect(result.computed!['greeting']).toBeDefined();
  });

  test('methods are correctly parsed', async () => {
    const result = await parseVue({
      project,
      id: 'test-composition-6',
      name: 'CompositionDemo',
      source: compositionSource
    });

    expect(result.methods).toBeDefined();
    expect(result.methods!['increment']).toBeDefined();
    expect(result.methods!['fetchData']).toBeDefined();
  });

  test('props are correctly parsed', async () => {
    const result = await parseVue({
      project,
      id: 'test-composition-7',
      name: 'CompositionDemo',
      source: compositionSource
    });

    expect(result.props).toBeDefined();
    expect(result.props!.length).toBeGreaterThan(0);
    const titleProp = result.props!.find(
      (p) => typeof p !== 'string' && p.name === 'title'
    );
    expect(titleProp).toBeDefined();
  });

  test('watch is correctly parsed', async () => {
    const result = await parseVue({
      project,
      id: 'test-composition-8',
      name: 'CompositionDemo',
      source: compositionSource
    });

    expect(result.watch).toBeDefined();
    expect(result.watch!.length).toBeGreaterThan(0);
    expect(result.watch![0].immediate).toBe(true);
  });

  test('lifeCycles are correctly parsed', async () => {
    const result = await parseVue({
      project,
      id: 'test-composition-9',
      name: 'CompositionDemo',
      source: compositionSource
    });

    expect(result.lifeCycles).toBeDefined();
    expect(result.lifeCycles!['mounted']).toBeDefined();
  });

  test('inject is correctly parsed', async () => {
    const result = await parseVue({
      project,
      id: 'test-composition-10',
      name: 'CompositionDemo',
      source: compositionSource
    });

    expect(result.inject).toBeDefined();
    expect(result.inject!.length).toBeGreaterThan(0);
    expect(result.inject![0].name).toBe('theme');
  });

  test('provide is correctly parsed', async () => {
    const result = await parseVue({
      project,
      id: 'test-composition-11',
      name: 'CompositionDemo',
      source: compositionSource
    });

    expect(result.provide).toBeDefined();
    expect(result.provide!['count']).toBeDefined();
  });

  test('composables are correctly parsed (non-global)', async () => {
    const result = await parseVue({
      project,
      id: 'test-composition-12',
      name: 'CompositionDemo',
      source: compositionSource
    });

    expect(result.composables).toBeDefined();
    // useMouse should be collected as a composable
    const mouse = result.composables!.find((c) => c.composable === 'useMouse');
    expect(mouse).toBeDefined();
    expect(mouse!.from).toBe('@vueuse/core');
    expect(mouse!.destructure).toEqual(['x', 'y']);
  });

  test('global composables (vue-router) are NOT in composables', async () => {
    const result = await parseVue({
      project,
      id: 'test-composition-13',
      name: 'CompositionDemo',
      source: compositionSource
    });

    // useRouter/useRoute should NOT appear in composables
    const routerComposable = result.composables!.find(
      (c) => c.composable === 'useRouter' || c.composable === 'useRoute'
    );
    expect(routerComposable).toBeUndefined();
  });

  test('emits are correctly parsed', async () => {
    const result = await parseVue({
      project,
      id: 'test-composition-14',
      name: 'CompositionDemo',
      source: compositionSource
    });

    expect(result.emits).toBeDefined();
    expect(result.emits!.length).toBe(2);
    expect(result.emits!.find((e: any) => e.name === 'change')).toBeDefined();
    expect(result.emits!.find((e: any) => e.name === 'update')).toBeDefined();
  });

  test('expose is correctly parsed', async () => {
    const result = await parseVue({
      project,
      id: 'test-composition-15',
      name: 'CompositionDemo',
      source: compositionSource
    });

    expect(result.expose).toBeDefined();
    expect(result.expose).toContain('count');
    expect(result.expose).toContain('increment');
  });

  test('compositionPatch transforms code correctly', async () => {
    const result = await parseVue({
      project,
      id: 'test-composition-16',
      name: 'CompositionDemo',
      source: compositionSource
    });

    // Check that methods contain this.xxx pattern
    const increment = result.methods!['increment'];
    expect(increment).toBeDefined();
    // count.value++ → this.count++ in DSL
    expect(increment.value).toContain('this.count');

    // Check that lifeCycles contain this.xxx pattern
    const mounted = result.lifeCycles!['mounted'];
    expect(mounted).toBeDefined();
    // fetchData() → this.fetchData()
    expect(mounted.value).toContain('this.fetchData');
    // route.path → this.$route.path
    expect(mounted.value).toContain('this.$route');
  });
});
