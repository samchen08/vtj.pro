<template>
  <div class="grid-edit-demo" style="max-width: 500px">
    <h3>基础表格编辑器</h3>
    <XGridEditor
      v-model="data1"
      :columns="columns"
      title="编辑数据"
      @change="onChange1">
    </XGridEditor>
    <p>当前值：{{ JSON.stringify(data1) }}</p>

    <h3>自定义标题 + 无增删行</h3>
    <XGridEditor
      v-model="data2"
      :columns="columns"
      title="只读查看"
      :plus="false"
      :minus="false"
      :grid-props="{ editable: false }"
      @change="onChange2">
    </XGridEditor>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XGridEditor, type GridColumns } from '@vtj/ui';

  const columns: GridColumns = [
    { field: 'name', title: '名称', editRender: { name: 'input' } },
    { field: 'value', title: '值', editRender: { name: 'input' } }
  ];

  const data1 = ref([
    { name: 'host', value: 'localhost' },
    { name: 'port', value: '8080' }
  ]);

  const data2 = ref([
    { name: 'theme', value: 'light' },
    { name: 'lang', value: 'zh-CN' }
  ]);

  const onChange1 = (data: any) => {
    console.log('change1:', data);
  };

  const onChange2 = (data: any) => {
    console.log('change2:', data);
  };
</script>
<style lang="scss" scoped>
  .grid-edit-demo {
    padding: 20px;
    h3 {
      margin: 20px 0 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #333;
    }
    p {
      font-size: 13px;
      color: #666;
      margin: 8px 0;
    }
  }
</style>
