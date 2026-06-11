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
  // 验证 vue-router API
  expect(content).toContain("from 'vue-router'");
  expect(content).toContain('useRouter');
  expect(content).toContain('useRoute');
  expect(content).toContain('const router = useRouter()');
  expect(content).toContain('const route = useRoute()');
  expect(content).toContain("router.push('/about')");
  expect(content).toContain('route.params.id');
  // 验证 vue-i18n API
  expect(content).toContain("from 'vue-i18n'");
  expect(content).toContain('useI18n');
  expect(content).toContain('const __i18n = useI18n()');
  expect(content).toContain("__i18n.t('hello')");
  expect(content).toContain('__i18n.locale');
  // 确保 useI18n 声明不重复
  expect(content.match(/const __i18n = useI18n\(\)/g)?.length).toBe(1);
  // 验证 $store 与 useProvider 合并到同一条 import
  expect(content).toContain('useStore');
  expect(content).toContain('useProvider, useStore');
  expect(content).toContain('const store = useStore()');
  expect(content).toContain('store.state.user');
  // 确保 @vtj/renderer 只有一条 import
  expect(content.match(/from '@vtj\/renderer'/g)?.length).toBe(1);
  expect(content).toContain('provider');
});
