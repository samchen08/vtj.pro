<template>
  <div class="grid-demo">
    <h3>基础表格</h3>
    <XGrid :columns="basicColumns" :data="basicData" :height="200"></XGrid>

    <h3>可编辑表格</h3>
    <XGrid
      :columns="editColumns"
      :data="editData"
      :height="250"
      editable
      @edit-change="onEditChange">
    </XGrid>

    <h3>行拖拽排序</h3>
    <XGrid
      :columns="sortColumns"
      :data="sortData"
      :height="200"
      row-sortable
      @row-sort="onRowSort">
    </XGrid>

    <h3>列拖拽排序</h3>
    <XGrid
      :columns="colSortColumns"
      :data="colSortData"
      :height="200"
      column-sortable
      resizable>
    </XGrid>
  </div>
</template>
<script lang="ts" setup>
  import { XGrid, type GridColumns } from '@vtj/ui';

  const basicColumns: GridColumns = [
    { type: 'seq', title: '序号', width: 60 },
    { field: 'name', title: '姓名' },
    { field: 'age', title: '年龄' },
    { field: 'city', title: '城市' }
  ];

  const basicData = [
    { name: '张三', age: 25, city: '北京' },
    { name: '李四', age: 30, city: '上海' },
    { name: '王五', age: 28, city: '广州' }
  ];

  const editColumns: GridColumns = [
    { type: 'seq', title: '序号', width: 60 },
    { field: 'name', title: '姓名', editRender: { name: 'input' } },
    { field: 'age', title: '年龄', editRender: { name: 'input' } },
    { field: 'gender', title: '性别', editRender: { name: 'select', options: [{ label: '男', value: '男' }, { label: '女', value: '女' }] } }
  ];

  const editData = [
    { name: '张三', age: 25, gender: '男' },
    { name: '李四', age: 30, gender: '女' }
  ];

  const sortColumns: GridColumns = [
    { type: 'seq', title: '序号', width: 60 },
    { field: 'name', title: '姓名' },
    { field: 'score', title: '分数' }
  ];

  const sortData = [
    { name: '张三', score: 90 },
    { name: '李四', score: 85 },
    { name: '王五', score: 95 },
    { name: '赵六', score: 80 }
  ];

  const colSortColumns: GridColumns = [
    { type: 'seq', title: '序号', width: 60 },
    { field: 'name', title: '姓名' },
    { field: 'dept', title: '部门' },
    { field: 'role', title: '角色' }
  ];

  const colSortData = [
    { name: '张三', dept: '技术部', role: '开发' },
    { name: '李四', dept: '产品部', role: '产品经理' }
  ];

  const onEditChange = (rows: any[]) => {
    console.log('editChange:', rows);
  };

  const onRowSort = (e: any) => {
    console.log('rowSort:', e);
  };
</script>
<style lang="scss" scoped>
  .grid-demo {
    padding: 20px;
    h3 {
      margin: 20px 0 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #333;
    }
    .x-grid {
      margin-bottom: 16px;
    }
  }
</style>
