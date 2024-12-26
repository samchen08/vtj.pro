<template>
  <div>
    <XQueryForm
      ref="formRef"
      size="default"
      :model="model"
      :items="items"
      :inlineColumns="1">
      <template #custom>
        <XField label="自定义"></XField>
      </template>
    </XQueryForm>

    <XQueryForm
      ref="formRef"
      size="default"
      :model="model"
      :items="items"
      :collapsible="false"
      :inline="true">
      <template #custom>
        <XField label="自定义"></XField>
      </template>
    </XQueryForm>

    <XQueryForm
      ref="formRef"
      size="default"
      :model="model"
      :items="items"
      :collapsible="false"
      :inline="false">
      <template #custom>
        <XField label="自定义"></XField>
      </template>
    </XQueryForm>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { XQueryForm, XField, type QueryFormItems } from '@vtj/ui';

  const formRef = ref();

  const model = reactive({
    F1: 'abc'
  });

  const items: QueryFormItems = [
    {
      label: '姓名',
      name: 'name',
      required: true,
      editor: 'select',
      options: [
        {
          label: '选项一',
          value: 1
        }
      ]
    },
    {
      label: '年龄',
      name: 'age',
      required: true
    },
    'custom'
  ];

  const onClick = () => {
    formRef.value.submit();
  };
</script>
