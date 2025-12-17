<template>
  <Panel
    class="v-env-widget"
    title="环境变量"
    plus
    remove
    @plus="onAdd"
    @remove="onRemove">
    <XGrid
      ref="gridRef"
      size="mini"
      :columns="columns"
      :loader="loader"
      :editRules="editRules"
      :rowConfig="{ keyField: 'key' }"
      auto-resize
      editable
      border="none"
      :editConfig="{ mode: 'row', trigger: 'click', showStatus: false }"
      @edit-change="onChange">
      <template #top>
        <div>
          <ElInput
            size="small"
            :prefix-icon="Search"
            placeholder="请输入查询关键字..."
            v-model="keyword"
            clearable></ElInput>
        </div>
      </template>
    </XGrid>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { Panel } from '../../shared';
  import { XGrid, type GridColumns, type GridLoader } from '@vtj/ui';
  import { NodeEnv } from '@vtj/renderer';
  import { ElInput } from 'element-plus';
  import { Search } from '@vtj/icons';
  import { useProject } from '../../hooks';

  defineOptions({
    name: 'EnvWidget'
  });

  const { project } = useProject();

  const gridRef = ref();
  const keyword = ref('');

  const columns: GridColumns = [
    {
      type: 'checkbox',
      width: 40
    },
    {
      field: 'name',
      title: '名称',
      minWidth: 80,
      editRender: {
        name: 'XInput'
      }
    },
    {
      field: NodeEnv.Development,
      title: '开发',
      minWidth: 80,
      editRender: {
        name: 'XInput'
      }
    },
    {
      field: NodeEnv.Production,
      title: '生产',
      minWidth: 80,
      editRender: {
        name: 'XInput'
      }
    }
  ];

  const editRules = {
    name: [{ required: true, message: '不能为空' }],
    [NodeEnv.Development]: [{ required: true, message: '不能为空' }],
    [NodeEnv.Production]: [{ required: true, message: '不能为空' }]
  };

  const loader: GridLoader = async () => {
    let list: any[] = project.value?.env ?? [];
    list = keyword.value
      ? list.filter((n) => {
          return (
            n.name?.includes(keyword.value) ||
            n[NodeEnv.Development]?.includes(keyword.value) ||
            n[NodeEnv.Production]?.includes(keyword.value)
          );
        })
      : list;
    return {
      list,
      total: list.length
    };
  };

  const onAdd = () => {
    gridRef.value.insertActived({
      name: '',
      [NodeEnv.Development]: '',
      [NodeEnv.Production]: ''
    });
  };

  const onChange = async (rows: any) => {
    if (!project.value) return;
    const errors = await gridRef.value.validate();
    if (!errors) {
      const env = (rows || []).map((n: any) => {
        const { name, development, production } = n;
        return {
          name,
          development,
          production
        };
      });
      project.value.setEnv(env);
    }
  };

  const onRemove = async () => {
    if (gridRef.value) {
      const rows = gridRef.value.getSelected();
      gridRef.value.remove(rows);
    }
  };

  watch(keyword, () => {
    gridRef.value?.search();
  });
</script>
