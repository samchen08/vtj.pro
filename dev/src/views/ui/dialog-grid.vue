<template>
  <div class="dialog-grid-demo">
    <h3>基础表格对话框</h3>
    <div class="demo-row">
      <XAction label="编辑表格数据" type="primary" @click="visible1 = true"></XAction>
    </div>
    <XDialogGrid
      v-model="visible1"
      title="编辑数据"
      :model="gridData1"
      :columns="columns"
      @submit="onSubmit1">
    </XDialogGrid>

    <h3>禁止增删行</h3>
    <div class="demo-row">
      <XAction label="只读表格" type="primary" @click="visible2 = true"></XAction>
    </div>
    <XDialogGrid
      v-model="visible2"
      title="查看数据"
      :model="gridData2"
      :columns="columns"
      :plus="false"
      :minus="false"
      :grid-props="{ editable: false }"
      @submit="onSubmit2">
    </XDialogGrid>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XDialogGrid, XAction, type GridColumns } from '@vtj/ui';

  const visible1 = ref(false);
  const visible2 = ref(false);

  const columns: GridColumns = [
    { field: 'name', title: '名称', editRender: { name: 'input' } },
    { field: 'age', title: '年龄', editRender: { name: 'input' } },
    { field: 'gender', title: '性别', editRender: { name: 'select', options: [{ label: '男', value: '男' }, { label: '女', value: '女' }] } },
    { field: 'score', title: '分数', editRender: { name: 'input' } }
  ];

  const gridData1 = [
    { name: '张三', age: 25, gender: '男', score: 90 },
    { name: '李四', age: 30, gender: '女', score: 85 }
  ];

  const gridData2 = [
    { name: '商品A', age: 100, gender: '男', score: 10 },
    { name: '商品B', age: 200, gender: '女', score: 20 }
  ];

  const onSubmit1 = (data: any) => {
    console.log('submit1:', data);
    visible1.value = false;
  };

  const onSubmit2 = (data: any) => {
    console.log('submit2:', data);
    visible2.value = false;
  };
</script>
<style lang="scss" scoped>
  .dialog-grid-demo {
    padding: 20px;
    h3 {
      margin: 20px 0 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #333;
    }
    .demo-row {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
  }
</style>
