<template>
  <div class="query-form-demo">
    <h3>基础查询表单</h3>
    <XQueryForm
      ref="queryFormRef"
      :items="queryItems"
      @submit="onSubmit"
      @reset="onReset">
    </XQueryForm>

    <h3>自定义列数 + 收起展开</h3>
    <XQueryForm
      ref="queryFormRef2"
      :items="queryItems2"
      :inline-columns="2"
      @submit="onSubmit"
      @reset="onReset">
    </XQueryForm>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XQueryForm } from '@vtj/ui';

  const queryFormRef = ref();
  const queryFormRef2 = ref();

  const queryItems = [
    { name: 'keyword', label: '关键词', editor: 'text' as const, props: { placeholder: '输入关键词搜索' } },
    { name: 'status', label: '状态', editor: 'select' as const, options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
    { name: 'date', label: '日期', editor: 'date' as const }
  ];

  const queryItems2 = [
    { name: 'name', label: '名称', editor: 'text' as const },
    { name: 'category', label: '分类', editor: 'select' as const, options: [{ label: 'A类', value: 'a' }, { label: 'B类', value: 'b' }] },
    { name: 'status', label: '状态', editor: 'select' as const, options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
    { name: 'dateRange', label: '日期范围', editor: 'date' as const, props: { type: 'daterange' } }
  ];

  const onSubmit = (model: any) => {
    console.log('submit:', model);
  };

  const onReset = () => {
    console.log('reset');
  };
</script>
<style lang="scss" scoped>
  .query-form-demo {
    padding: 20px;
    h3 {
      margin: 20px 0 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #333;
    }
    .x-query-form {
      margin-bottom: 16px;
      border: 1px solid #eee;
      border-radius: 4px;
      padding: 12px;
    }
  }
</style>
