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

const __props = defineProps({
  title: { type: String, required: true, default: 'Hello' }
});

const __emit = defineEmits(['change', 'update']);

const __router = useRouter();
const __route = useRoute();
const { x, y } = useMouse();

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

const double = computed(() => count.value * 2);

const greeting = computed(() => {
  return __props.title + ' ' + message.value;
});

function increment() {
  count.value++;
  __emit('change', count.value);
}

async function fetchData() {
  __state.loading = true;
  const data = await fetch('/api/data');
  __state.list = await data.json();
  __state.loading = false;
}

const theme = inject('theme', 'light');

provide('count', count);

watch(
  () => count.value,
  (val) => {
    console.log('count changed:', val);
    __router.push('/result');
  },
  { immediate: true }
);

onMounted(() => {
  fetchData();
    console.log(__route.path);
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
    expect(result.lifeCycles!['onMounted']).toBeDefined();
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
    const mouse = result.composables!.find(
      (c) =>
        c.composable &&
        typeof c.composable === 'object' &&
        'value' in c.composable &&
        c.composable.value.includes('useMouse')
    );
    expect(mouse).toBeDefined();
    expect(mouse!.name).toBe('x'); // 第一个解构字段
    expect(mouse!.destructure).toEqual(['x', 'y']);
    // 验证 composable 表达式格式
    if (mouse!.composable && typeof mouse!.composable === 'object') {
      expect(mouse!.composable.value).toBe('this.$libs.VueUse.useMouse');
    }
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
      (c) =>
        typeof c.composable === 'object' &&
        (c.composable.value === 'useRouter' ||
          c.composable.value === 'useRoute')
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
    const mounted = result.lifeCycles!['onMounted'];
    expect(mounted).toBeDefined();
    // fetchData() → this.fetchData()
    expect(mounted.value).toContain('this.fetchData');
    // route.path → this.$route.path
    expect(mounted.value).toContain('this.$route');
  });

  test('composables destructure fields are transformed', async () => {
    const result = await parseVue({
      project,
      id: 'test-composition-17',
      name: 'CompositionDemo',
      source: compositionSource
    });

    // useMouse destructure: x, y should be in composables
    const mouse = result.composables!.find(
      (c) => c.name === 'x' && c.destructure?.includes('y')
    );
    expect(mouse).toBeDefined();
  });
});

describe('parseVue Composition mode with i18n', () => {
  const i18nSource = `
<template>
  <div>
    <p>{{ title }}</p>
    <button @click="showMessage">Click</button>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';

const __props = defineProps({ title: String });

const __i18n = useI18n();
const count = ref(0);

function showMessage() {
  const msg = __i18n.t('hello');
  __i18n.n(count.value);
  nextTick(() => console.log(msg));
}
</script>
`;

  test('i18n special forms are correctly transformed', async () => {
    const result = await parseVue({
      project,
      id: 'test-i18n-1',
      name: 'I18nDemo',
      source: i18nSource
    });

    expect(result.apiMode).toBe('composition');

    const showMessage = result.methods!['showMessage'];
    expect(showMessage).toBeDefined();
    // __i18n.t('hello') → this.$t('hello')
    expect(showMessage.value).toContain('this.$t(');
    // __i18n.n(count.value) → this.$n(this.count.value)
    expect(showMessage.value).toContain('this.$n(');
    // nextTick → this.$nextTick
    expect(showMessage.value).toContain('this.$nextTick');
  });
});

describe('parseVue Composition mode with element-plus globals', () => {
  const elSource = `
<template>
  <div>
    <el-button @click="handleClick">Click</el-button>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';

function handleClick() {
  ElMessage.success('ok');
  ElMessageBox.confirm('sure?');
}
</script>
`;

  test('element-plus global APIs are correctly transformed', async () => {
    const result = await parseVue({
      project,
      id: 'test-el-1',
      name: 'ElDemo',
      source: elSource
    });

    expect(result.apiMode).toBe('composition');

    const handleClick = result.methods!['handleClick'];
    expect(handleClick).toBeDefined();
    // ElMessage.success('ok') → this.$message.success('ok')
    expect(handleClick.value).toContain('this.$message');
    // ElMessageBox.confirm('sure?') → this.$confirm('sure?')
    expect(handleClick.value).toContain('this.$confirm');
  });
});

describe('parseVue Composition mode props in template expressions', () => {
  const propsSource = `
<template>
  <span>{{ __props.title }}</span>
  <span>{{ title }}</span>
</template>

<script lang="ts" setup>
// @ts-nocheck

import { computed } from 'vue';
import { useProvider } from '@vtj/renderer';
const __props = defineProps({
  title: {
    type: [String],
    required: false,
    default: ''
  }
});

const __provider = useProvider({ id: '1kwhcdeh', version: '1781199016753' });

</script>
<style lang="css" scoped>

</style>
`;

  test('__props.title in template → this.title', async () => {
    const result = await parseVue({
      project,
      id: 'test-props-template',
      name: 'PropsDemo',
      source: propsSource
    });

    expect(result.apiMode).toBe('composition');
    expect(result.nodes).toBeDefined();
    expect(result.nodes!.length).toBeGreaterThan(0);

    // Find the span with __props.title expression
    const spanNode = result.nodes!.find(
      (n) => n.name === 'span' && typeof n.children === 'object'
    );
    expect(spanNode).toBeDefined();

    const children = spanNode!.children as any;
    // __props.title → this.title (NOT this.$this.title)
    expect(children.value).toBe('this.title');
    expect(children.value).not.toContain('$this');
  });

  test('bare prop name title in template → this.title', async () => {
    const result = await parseVue({
      project,
      id: 'test-props-bare',
      name: 'PropsBareDemo',
      source: propsSource
    });

    // Find the span with bare title expression
    const spanNodes = result.nodes!.filter(
      (n) => n.name === 'span' && typeof n.children === 'object'
    );
    expect(spanNodes.length).toBe(2);

    const secondSpan = spanNodes[1];
    const children = secondSpan.children as any;
    // bare title → this.title
    expect(children.value).toBe('this.title');
  });
});

describe('parseVue Composition mode with $t in template', () => {
  const templateI18nSource = `
<template>
  <div>
     {{ $t('ABC') }}
  </div>
</template>
<script lang="ts" setup>
  // @ts-nocheck

  import { ref, inject } from 'vue';
  import { useProvider } from '@vtj/renderer';

  const __provider = useProvider({ id: 'el0ka4ve', version: '1781414479968' });

  const theme = inject('theme', 'light');

  const value = ref('hello')
</script>
<style lang="css" scoped>
  /* 组件样式内容 */
</style>
`;

  test("$t('ABC') in template → this.$t('ABC')", async () => {
    const result = await parseVue({
      project,
      id: 'test-template-i18n',
      name: 'TemplateI18nDemo',
      source: templateI18nSource
    });

    expect(result.apiMode).toBe('composition');
    expect(result.nodes).toBeDefined();
    expect(result.nodes!.length).toBeGreaterThan(0);

    // Find the div node
    const divNode = result.nodes![0];
    expect(divNode.name).toBe('div');

    // Check the children expression
    const children = divNode.children as any;
    expect(children.type).toBe('JSExpression');
    // $t('ABC') → this.$t('ABC')
    expect(children.value).toBe("this.$t('ABC')");
  });
});

describe('parseVue Composition mode with destructured i18n', () => {
  const destructureI18nSource = `
<template>
  <div>
    <p>{{ greeting }}</p>
    <button @click="handleClick">Click</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, n, d } = useI18n();
const count = ref(0);

function handleClick() {
  const msg = t('hello');
  const formatted = n(count.value);
  const dateStr = d(new Date(), 'short');
}
</script>
`;

  test('destructured i18n fields are correctly mapped to $xxx APIs', async () => {
    const result = await parseVue({
      project,
      id: 'test-destructure-i18n',
      name: 'DestructuredI18nDemo',
      source: destructureI18nSource
    });

    expect(result.apiMode).toBe('composition');

    const handleClick = result.methods!['handleClick'];
    expect(handleClick).toBeDefined();
    // t('hello') → this.$t('hello')
    expect(handleClick.value).toContain('this.$t(');
    // n(count.value) → this.$n(this.count.value)
    expect(handleClick.value).toContain('this.$n(');
    // d(new Date(), 'short') → this.$d(new Date(), 'short')
    expect(handleClick.value).toContain('this.$d(');
  });
});

describe('parseVue Composition mode with destructured i18n mixed with non-destructured', () => {
  const mixedSource = `
<template>
  <div>
    <button @click="handleClick">Click</button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const __i18n = useI18n();

function handleClick() {
  __i18n.t('hello');
}
</script>
`;

  test('non-destructured i18n still works alongside destructured support', async () => {
    const result = await parseVue({
      project,
      id: 'test-mixed-i18n',
      name: 'MixedI18nDemo',
      source: mixedSource
    });

    expect(result.apiMode).toBe('composition');

    const handleClick = result.methods!['handleClick'];
    expect(handleClick).toBeDefined();
    // __i18n.t('hello') → this.$t('hello') (member map, unchanged)
    expect(handleClick.value).toContain('this.$t(');
  });
});
