import { expect, test } from 'vitest';
import { generator } from '../src';
import { test_composition as dsl } from './dsl/test_composition';

const map = new Map();

test('composition mode', async () => {
  let content: string = '';
  let err: any = null;
  try {
    content = await generator(dsl as any, map, [], 'web', false);
  } catch (e: any) {
    err = e;
    console.log('Generation error:', e?.message);
    if (e?.content) console.log('Generated source:\n', e.content);
  }
  console.log('======= Generated Vue =======');
  console.log(content);
  console.log('======= End =======');
  expect(err).toBeNull();
  expect(content).toContain('<script lang="ts" setup>');
  expect(content).toContain('defineProps');
  expect(content).toContain('defineEmits');
  expect(content).toContain('useProvider');
  expect(content).toContain('useRouter');
  expect(content).toContain('const router = useRouter()');
  expect(content).toContain('const count = ref(0)');
  expect(content).toContain('const form = reactive');
  expect(content).toContain('const state = reactive');
  expect(content).toContain('const total = computed');
  expect(content).toContain('const handleClick =');
  expect(content).toContain('const mouse = useMouse');
  expect(content).toContain('const { user, login } = useUserStore');
  expect(content).toContain('const theme = inject');
  expect(content).toContain('watch(');
  expect(content).toContain('onMounted(');
  expect(content).toContain("provide('appName'");
});
