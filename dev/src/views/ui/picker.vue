<template>
  <div class="demo-picker">
    <h3>基础用法</h3>
    <div class="demo-row">
      <XPicker
        :columns="columns"
        :fields="fields"
        :loader="loader"
        :dialog-props="{ title: '选择用户', width: '700px' }"
        v-model="value1"
      />
    </div>

    <h3>多选模式</h3>
    <div class="demo-row">
      <XPicker
        :columns="columns"
        :fields="fields"
        :loader="loader"
        multiple
        :dialog-props="{ title: '选择用户', width: '700px' }"
        v-model="value2"
      />
    </div>

    <h3>查询条件</h3>
    <div class="demo-row">
      <XPicker
        :columns="columns"
        :fields="fields"
        :loader="loader"
        query-key="keyword"
        :dialog-props="{ title: '选择用户', width: '700px' }"
        v-model="value3"
      />
    </div>

    <h3>禁用状态</h3>
    <div class="demo-row">
      <XPicker
        :columns="columns"
        :fields="fields"
        :loader="loader"
        disabled
        :dialog-props="{ title: '选择用户', width: '700px' }"
        v-model="value4"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { XPicker } from '@vtj/ui';

const columns = [
  { field: 'name', title: '姓名', width: 120 },
  { field: 'age', title: '年龄', width: 80 },
  { field: 'email', title: '邮箱' },
  { field: 'department', title: '部门', width: 120 }
];

const fields = [
  { name: 'keyword', label: '关键字', editor: 'text' as const },
  { name: 'department', label: '部门', editor: 'text' as const }
];

const mockData = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `用户${i + 1}`,
  age: 20 + (i % 30),
  email: `user${i + 1}@example.com`,
  department: i % 3 === 0 ? '技术部' : i % 3 === 1 ? '市场部' : '财务部'
}));

const loader = (params: any) => {
  const { page = 1, pageSize = 10 } = params;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    list: mockData.slice(start, end),
    total: mockData.length
  };
};

const value1 = ref(null);
const value2 = ref([]);
const value3 = ref(null);
const value4 = ref(null);
</script>

<style lang="scss" scoped>
.demo-picker {
  padding: 20px;

  h3 {
    margin: 16px 0 8px;
    font-size: 16px;
    font-weight: 600;
  }

  .demo-row {
    margin-bottom: 12px;
  }
}
</style>
