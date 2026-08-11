import { expect, test, describe } from 'vitest';
import { parseVue } from '../src/vue';
import { project } from './sources/project';

// 项目 apis 中不包含 getArticleList —— 模拟 AI 生成的非标准数据源代码场景
const source = `
<template>
  <div>
    <ElButton @click="handleStart">Start</ElButton>
  </div>
</template>
<script lang="ts" setup>
  // @ts-nocheck
  import { useProvider } from '@vtj/renderer';
  import { reactive } from 'vue';
  import { ElButton } from 'element-plus';

  const __provider = useProvider({ id: '1n7ez7ge', version: '1786263156111' });

  const __state = reactive({ loading: false, articles: [] });
  const loadArticles = async () => {
    __state.loading = true;
    try {
      const res = await __provider.apis['getArticleList']();
      const data = res && res.data ? res.data : res;
      __state.articles = Array.isArray(data)
        ? data
        : data && (data.list || data.records)
          ? data.list || data.records
          : [];
    } finally {
      __state.loading = false;
    }
  };
  const handleStart = () => {
    loadArticles();
  };
</script>
<style lang="css" scoped>
  .welcome-page { min-height: 100vh; }
</style>
`;

describe('parseVue - dataSource strict template collection (e2e)', () => {
  test('non-standard dataSource code should be kept as regular method', async () => {
    const result = await parseVue({
      project: { ...project },
      id: 'ds-fallback',
      name: 'DSFallback',
      source
    });

    expect(result.apiMode).toBe('composition');
    // 非标准模板（直接调用 + 函数体含业务逻辑）不采集为数据源，
    // 作为普通方法保留完整逻辑，避免 transform 丢失
    expect(result.dataSources!['loadArticles']).toBeUndefined();
    const method = result.methods!['loadArticles'];
    expect(method).toBeDefined();
    expect(method.value).toContain("this.$provider.apis['getArticleList']()");
    expect(method.value).toContain('Array.isArray(data)');
  });
});
