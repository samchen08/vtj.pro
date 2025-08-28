<template>
  <XDialog
    title="导入 OpenAPI/Swagger API"
    width="70%"
    height="70%"
    maximizable
    cancel
    submit="确定导入"
    @submit="onSubmit">
    <XGrid
      v-if="columns"
      ref="gridRef"
      height="100%"
      :columns="columns"
      :data="props.data"
      :editRenders="editRenders"
      :editRules="editRules"
      resizable
      sync-resize
      auto-resize
      editable></XGrid>
  </XDialog>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XDialog, XGrid, type GridColumns } from '@vtj/ui';
  import { notify } from '../../../utils';

  export interface Props {
    data?: any;
    saveApis?: any;
  }

  const props = withDefaults(defineProps<Props>(), {
    data: () => []
  });

  const gridRef = ref();

  const columns: GridColumns = [
    {
      type: 'checkbox',
      width: 60
    },
    {
      type: 'seq',
      title: '序号',
      width: 60
    },
    {
      field: 'method',
      title: '请求方法',
      minWidth: 100
    },
    {
      field: 'settings.type',
      title: '请求类型',
      minWidth: 100
    },
    {
      field: 'url',
      title: 'URL',
      minWidth: 300
    },
    {
      field: 'name',
      title: '调用名称',
      minWidth: 100
    },
    {
      field: 'label',
      title: '备注',
      minWidth: 100
    }
  ];

  const editRenders = {
    method: {
      name: 'XSelect',
      props: {
        options: [
          {
            label: 'GET',
            value: 'get'
          },
          {
            label: 'POST',
            value: 'post'
          },
          {
            label: 'PUT',
            value: 'put'
          },
          {
            label: 'PATCH',
            value: 'patch'
          },
          {
            label: 'DELETE',
            value: 'delete'
          }
        ]
      }
    },
    'settings.type': {
      name: 'XSelect',
      props: {
        options: [
          {
            label: '表单',
            value: 'form'
          },
          {
            label: 'JSON',
            value: 'json'
          },
          {
            label: '文件',
            value: 'data'
          }
        ]
      }
    },
    url: 'XInput',
    name: 'XInput',
    label: 'XInput'
  };

  const editRules = {
    method: [{ required: true, message: '不能为空' }],
    'settings.type': [{ required: true, message: '不能为空' }],
    url: [{ required: true, message: '不能为空' }],
    name: [{ required: true, message: '不能为空' }],
    label: [{ required: true, message: '不能为空' }]
  };

  const onSubmit = async () => {
    const errors = await gridRef.value?.validate();
    if (errors) {
      notify('请补充完整数据');
      return;
    }
    const rows = gridRef.value?.getSelected();
    if (rows && rows.length) {
      if (props.saveApis) {
        props.saveApis(rows);
      }
    } else {
      notify('请选择需要导入的数据');
    }
  };
</script>
