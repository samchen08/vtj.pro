<template>
  <div>
    <XField
      label="数据选择器"
      editor="picker"
      :props="{ loader, columns, valueKey: 'id', onPicked }">
    </XField>
    <XField
      label="表格编辑器"
      editor="grid"
      :model-value="{ a: 1 }"
      :props="dialogGrid">
    </XField>
  </div>
</template>

<script setup lang="ts">
  import { XField } from '@vtj/ui';
  import { request, arrayToKv, kvToArray } from '@vtj/utils';

  const fetchData = (data: any) => {
    return request({
      url: '/api',
      method: 'get',
      data,
      settings: {
        originResponse: false
      }
    });
  };

  const loader: any = async (params: any) => {
    console.log('do load', params);
    const { page, pageSize = 50, form } = params || {};
    return await fetchData({
      ...form,
      currentPage: page,
      pageSize,
      total: 1000
    });
  };

  const columns = [
    {
      field: 'id',
      title: 'ID'
    },
    {
      field: 'name',
      title: '姓名'
    },

    {
      field: 'sex',
      title: '性别'
    },
    {
      field: 'age',
      title: '年龄'
    },
    {
      field: 'intro',
      title: '简介'
    },
    {
      field: 'join',
      title: '入职日期'
    },
    {
      field: 'create',
      title: '创建时间'
    }
  ];

  const onPicked = (data: any) => {
    console.log('picked', data);
  };

  const dialogGrid = {
    title: '键值对',
    columns: [
      {
        type: 'checkbox',
        title: '',
        width: 60
      },
      {
        type: 'seq',
        title: '序号',
        width: 60
      },
      {
        field: 'key',
        title: '键',
        editRender: {
          name: 'XInput'
        }
      },
      {
        field: 'value',
        title: '值',
        editRender: {
          name: 'XInput'
        }
      }
    ],
    formatter: kvToArray,
    valueFormatter: arrayToKv
  };
</script>
