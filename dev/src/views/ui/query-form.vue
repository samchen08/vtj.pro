<template>
  <div>
    <XQueryForm
      ref="formRef"
      size="default"
      :model="model"
      :items="items"
      @submit="onSubmit">
      <template #custom>
        <XField label="自定义"></XField>
      </template>
    </XQueryForm>
    <XAction @click="onClick" label="提交"></XAction>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { XQueryForm, XAction, XField, type QueryFormItems } from '@vtj/web';

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
      defaultValue: 1,
      options: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        }
      ]
    },
    'custom'
  ];

  const onClick = () => {
    formRef.value.submit();
  };

  const onSubmit = () => {
    console.log('submit', model);
  };
</script>
