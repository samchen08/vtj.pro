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
  expect(content).toContain('nextTick');
  expect(content).toContain('useAttrs');
  expect(content).toContain('const attrs = useAttrs()');
  expect(content).toContain('getCurrentInstance');
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
  expect(content).toContain('const getEnv =');
  // 验证新增的全局 API
  expect(content).toContain('const __instance = getCurrentInstance()');
  expect(content).toContain('__instance.proxy.$parent');
  expect(content).toContain('__instance.proxy.$el');
  // 确保 getCurrentInstance 声明不重复
  expect(
    content.match(/const __instance = getCurrentInstance\(\)/g)?.length
  ).toBe(1);
  expect(content).toContain('provider');
});
