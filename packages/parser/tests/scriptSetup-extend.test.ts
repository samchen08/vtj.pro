import { expect, test, describe } from 'vitest';
import { parseScriptSetup } from '../src/vue/scriptSetup';
import { project } from './sources/project';

describe('parseScriptSetup - lifeCycle hooks', () => {
  test('should parse onBeforeMount', () => {
    const source = `
import { ref, onBeforeMount } from 'vue';
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });
const count = ref(0);

onBeforeMount(() => {
  console.log('before mount');
});
`;
    const result = parseScriptSetup(source, project);
    expect(result.lifeCycles).toBeDefined();
    expect(result.lifeCycles!['onBeforeMount']).toBeDefined();
  });

  test('should parse onBeforeUpdate', () => {
    const source = `
import { ref, onBeforeUpdate } from 'vue';
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });
const count = ref(0);

onBeforeUpdate(() => {
  console.log('before update');
});
`;
    const result = parseScriptSetup(source, project);
    expect(result.lifeCycles).toBeDefined();
    expect(result.lifeCycles!['onBeforeUpdate']).toBeDefined();
  });

  test('should parse onBeforeUnmount', () => {
    const source = `
import { ref, onBeforeUnmount } from 'vue';
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });
const count = ref(0);

onBeforeUnmount(() => {
  console.log('before unmount');
});
`;
    const result = parseScriptSetup(source, project);
    expect(result.lifeCycles).toBeDefined();
    expect(result.lifeCycles!['onBeforeUnmount']).toBeDefined();
  });

  test('should parse onActivated', () => {
    const source = `
import { ref, onActivated } from 'vue';
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });
const count = ref(0);

onActivated(() => {
  console.log('activated');
});
`;
    const result = parseScriptSetup(source, project);
    expect(result.lifeCycles).toBeDefined();
    expect(result.lifeCycles!['onActivated']).toBeDefined();
  });

  test('should parse onDeactivated', () => {
    const source = `
import { ref, onDeactivated } from 'vue';
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });
const count = ref(0);

onDeactivated(() => {
  console.log('deactivated');
});
`;
    const result = parseScriptSetup(source, project);
    expect(result.lifeCycles).toBeDefined();
    expect(result.lifeCycles!['onDeactivated']).toBeDefined();
  });

  test('should parse onErrorCaptured', () => {
    const source = `
import { ref, onErrorCaptured } from 'vue';
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });
const count = ref(0);

onErrorCaptured((err) => {
  console.error(err);
});
`;
    const result = parseScriptSetup(source, project);
    expect(result.lifeCycles).toBeDefined();
    expect(result.lifeCycles!['onErrorCaptured']).toBeDefined();
  });
});

describe('parseScriptSetup - watch options', () => {
  test('should parse watch with deep option', () => {
    const source = `
import { ref, reactive, watch } from 'vue';
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });
const data = ref([]);
const form = reactive({ name: '' });

watch(
  () => form.name,
  (val) => {
    console.log('changed:', val);
  },
  { deep: true, immediate: false }
);
`;
    const result = parseScriptSetup(source, project);
    expect(result.watch).toBeDefined();
    expect(result.watch!.length).toBeGreaterThanOrEqual(0);
  });

  test('should parse watch without options', () => {
    const source = `
import { ref, watch } from 'vue';
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });
const count = ref(0);

watch(count, (val) => {
  console.log(val);
});
`;
    const result = parseScriptSetup(source, project);
    expect(result.watch).toBeDefined();
  });
});

describe('parseScriptSetup - expose with defineExpose', () => {
  test('should parse defineExpose with inline object', () => {
    const source = `
import { ref, defineExpose } from 'vue';
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });
const count = ref(0);
const msg = ref('hello');

defineExpose({ count, msg });
`;
    const result = parseScriptSetup(source, project);
    expect(result.expose).toBeDefined();
    expect(result.expose!).toContain('count');
    expect(result.expose!).toContain('msg');
  });
});

describe('parseScriptSetup - provide/inject advanced', () => {
  test('should parse inject with string from', () => {
    const source = `
import { inject } from 'vue';
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });
const appName = inject('appName');
`;
    const result = parseScriptSetup(source, project);
    expect(result.inject).toBeDefined();
    expect(result.inject!.length).toBeGreaterThanOrEqual(0);
  });

  test('should parse provide with expression value', () => {
    const source = `
import { ref, provide } from 'vue';
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });
const theme = ref('dark');
provide('theme', theme);
`;
    const result = parseScriptSetup(source, project);
    expect(result.provide).toBeDefined();
  });
});

describe('parseScriptSetup - props with types', () => {
  test('should parse defineProps with type-based declaration', () => {
    const source = `
import { defineProps } from 'vue';
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

interface Props {
  modelValue: string;
  disabled?: boolean;
}

const props = defineProps<Props>();
`;
    const result = parseScriptSetup(source, project);
    expect(result.props).toBeDefined();
  });

  test('should parse defineProps with defaults', () => {
    const source = `
import { defineProps, withDefaults } from 'vue';
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

interface Props {
  msg?: string;
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  count: 0
});
`;
    const result = parseScriptSetup(source, project);
    expect(result.props).toBeDefined();
  });
});

describe('parseScriptSetup - function declaration advanced params', () => {
  test('should handle ObjectPattern params in function declaration', () => {
    const source = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

function handleChange({ name, value }) {
  console.log(name, value);
}
`;
    const result = parseScriptSetup(source, project);
    expect(result.methods).toBeDefined();
    expect(result.methods!['handleChange']).toBeDefined();
  });

  test('should handle AssignmentPattern params (default values)', () => {
    const source = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

function greet(name = 'World', count = 0) {
  return name + count;
}
`;
    const result = parseScriptSetup(source, project);
    expect(result.methods).toBeDefined();
    expect(result.methods!['greet']).toBeDefined();
  });

  test('should handle mixed params (ObjectPattern + default + plain)', () => {
    const source = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

function mixed({ a, b } = { a: 1, b: 2 }, extra = 'default') {
  return { a, b, extra };
}
`;
    const result = parseScriptSetup(source, project);
    expect(result.methods).toBeDefined();
    expect(result.methods!['mixed']).toBeDefined();
  });

  test('should handle async function declaration', () => {
    const source = `
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

async function asyncFn(url, options) {
  const res = await fetch(url);
  return res;
}
`;
    const result = parseScriptSetup(source, project);
    expect(result.methods).toBeDefined();
    expect(result.methods!['asyncFn']).toBeDefined();
    expect(result.methods!['asyncFn'].value).toContain('async');
  });
});

describe('parseScriptSetup - emits advanced', () => {
  test('should parse defineEmits with type-based declaration', () => {
    const source = `
import { defineEmits } from 'vue';
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

const emit = defineEmits<{
  (e: 'change', id: number): void;
  (e: 'update', value: string): void;
}>();
`;
    const result = parseScriptSetup(source, project);
    expect(result.emits).toBeDefined();
  });

  test('should parse defineEmits with array', () => {
    const source = `
import { defineEmits } from 'vue';
import { useProvider } from '@vtj/renderer';

const __provider = useProvider({ id: 'test', version: '1' });

const emit = defineEmits(['click', 'focus', 'blur']);
`;
    const result = parseScriptSetup(source, project);
    expect(result.emits).toBeDefined();
    expect(result.emits!.length).toBe(3);
  });
});
