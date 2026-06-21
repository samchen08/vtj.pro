<template>
  <div class="grid-page-demo">
    <h3>分页表格（带加载器）</h3>
    <XGrid
      :columns="columns"
      :loader="loader"
      pager
      :page-size="10"
      :page-sizes="[10, 20, 50]"
      :height="400"
      @loaded="onLoaded">
    </XGrid>

    <h3>虚拟滚动</h3>
    <XGrid
      :columns="virtualColumns"
      :loader="virtualLoader"
      virtual
      :height="300"
      :page-size="100"
      @loaded="onLoaded">
    </XGrid>
  </div>
</template>
<script lang="ts" setup>
  import { XGrid, type GridColumns, type GridLoader } from '@vtj/ui';

  const columns: GridColumns = [
    { type: 'seq', title: '序号', width: 60 },
    { field: 'name', title: '姓名', width: 120 },
    { field: 'age', title: '年龄', width: 80 },
    { field: 'email', title: '邮箱', width: 200 },
    { field: 'city', title: '城市', width: 120 },
    { field: 'dept', title: '部门', width: 120 }
  ];

  const virtualColumns: GridColumns = [
    { type: 'seq', title: '序号', width: 60 },
    { field: 'name', title: '姓名', width: 120 },
    { field: 'age', title: '年龄', width: 80 },
    { field: 'email', title: '邮箱', width: 200 }
  ];

  const loader: GridLoader = (state) => {
    const { page = 1, pageSize = 10 } = state;
    const total = 86;
    const list = Array.from({ length: pageSize }, (_, i) => {
      const idx = (page - 1) * pageSize + i + 1;
      return {
        name: `用户 ${idx}`,
        age: 20 + (idx % 30),
        email: `user${idx}@example.com`,
        city: ['北京', '上海', '广州', '深圳', '杭州'][idx % 5],
        dept: ['技术部', '产品部', '市场部', '运营部'][idx % 4]
      };
    });
    return { list, total };
  };

  const virtualLoader: GridLoader = (state) => {
    const { page = 1, pageSize = 100 } = state;
    const total = 1000;
    const list = Array.from({ length: pageSize }, (_, i) => {
      const idx = (page - 1) * pageSize + i + 1;
      return {
        name: `虚拟用户 ${idx}`,
        age: 20 + (idx % 50),
        email: `vuser${idx}@example.com`
      };
    });
    return { list, total };
  };

  const onLoaded = (rows: any[]) => {
    console.log('loaded:', rows.length);
  };
</script>
<style lang="scss" scoped>
  .grid-page-demo {
    padding: 20px;
    h3 {
      margin: 20px 0 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #333;
    }
  }
</style>
