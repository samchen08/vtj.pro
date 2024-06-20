<template>
  <div>
    <XField label="单选">
      <template #editor>
        <XPicker
          ref="pickerRef"
          value-key="id"
          label-key="name"
          query-key="name"
          :columns="columns"
          :fields="fields"
          :loader="asyncLoader"
          @change="onChange"
          @picked="onPicked"></XPicker>
      </template>
    </XField>
    <XField label="多选">
      <template #editor>
        <XPicker
          v-model="modelValue2"
          multiple
          :max-collapse-tags="5"
          value-key="id"
          label-key="name"
          query-key="name"
          :columns="columns"
          :fields="fields"
          :loader="loader"
          @change="onChange"
          @picked="onPicked"></XPicker>
      </template>
    </XField>
    <XField label="多选对象值">
      <template #editor>
        <XPicker
          v-model="modelValue3"
          multiple
          raw
          append
          :max-collapse-tags="5"
          value-key="id"
          label-key="name"
          query-key="name"
          :default-query="defaultQuery"
          :columns="columns"
          :fields="fields"
          :loader="loader"
          @change="onChange"
          @picked="onPicked"></XPicker>
      </template>
    </XField>
    <div>modelValue1: {{ modelValue1 }}</div>
    <div>modelValue2: {{ modelValue2 }}</div>
    <div>modelValue3: {{ modelValue3 }}</div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, watch, type Ref, nextTick } from 'vue';
  import {
    XPicker,
    XField,
    type PickerColumns,
    type PickerFields
  } from '@vtj/ui';
  import { request } from '@vtj/utils';
  const pickerRef = ref();
  const modelValue1 = ref();
  const modelValue2 = ref([]);
  const modelValue3 = ref([
    {
      id: '123',
      name: 'ABC'
    }
  ]);

  const columns: Ref<any> = ref([]);

  const columns2: PickerColumns = [
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
      editor: 'select'
    },
    {
      label: '入职时间开始',
      name: 'join-start',
      editor: 'date',
      props: {
        valueFormat: 'YYYY-MM-DD'
      }
    },
    {
      label: '入职时间结束',
      name: 'join-end',
      editor: 'date',
      props: {
        valueFormat: 'YYYY-MM-DD'
      }
    },
    {
      label: '年龄大于',
      name: 'age-start',
      editor: 'number'
    },
    {
      label: '年龄小于',
      name: 'age-end',
      editor: 'number'
    }
  ];

  const fetchData = (data: any) => {
    return request({
      url: '/mock-api/list',
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
    // console.log('query', { ...params, ...model, tab: tabValue.value });
    return await fetchData({
      ...form,
      currentPage: page,
      pageSize,
      total: 1000
    });
  };

  const asyncLoader = ref();

  const defaultQuery = () => {
    return {
      name: 'default'
    };
  };

  const onChange = (data: any) => {
    console.log('change', data);
  };

  const onPicked = (raw: any) => {
    console.log('onPicked', raw);
  };

  watch(
    () => pickerRef.value?.visible,
    async (v: boolean) => {
      console.log('change', v);
      await nextTick();
      setTimeout(() => {
        columns.value = columns2;
        asyncLoader.value = loader;
      }, 1000);
    }
  );
</script>
