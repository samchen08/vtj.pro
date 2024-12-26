<template>
  <div>
    <XPicker
      ref="pickerRef"
      value-key="id"
      label-key="name"
      query-key="name"
      v-model="pickerValue"
      :columns="columns"
      :fields="fields"
      :loader="asyncLoader"
      @change="onChange"
      @picked="onPicked"></XPicker>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { XPicker, type PickerFields } from '@vtj/ui';
  import { data } from './data';
  const pickerValue = ref();

  const columns = ref([
    {
      field: 'id',
      title: 'ID'
    },
    {
      field: 'name',
      title: '姓名',
      filters: [{ value: '' }],
      filterRender: {
        name: 'XInput'
      }
    },

    {
      field: 'sex',
      title: '性别',
      filters: [{ value: '' }],
      filterRender: {
        name: 'XSelect',
        props: {
          options: [
            { label: '男', value: 1 },
            { label: '女', value: 0 }
          ]
        }
      }
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
  ]);

  const fields: PickerFields = [
    {
      label: '姓名',
      name: 'name',
      editor: 'text',
      props: {}
    },
    {
      label: '姓别',
      name: 'sex',
      editor: 'select',
      disabled: true
    }
  ];

  const asyncLoader = async () => {
    return data;
  };

  const onChange = (data: any) => {
    console.log('change', data);
  };

  const onPicked = (raw: any) => {
    console.log('onPicked', raw);
  };
</script>

<style scoped></style>
