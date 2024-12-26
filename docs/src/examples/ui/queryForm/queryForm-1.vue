<template>
  <div>
    <XQueryForm ref="formRef" size="default" :model="model" :items="items">
      <template #custom>
        <XField label="自定义"></XField>
      </template>
    </XQueryForm>
    <XAction @click="onClick" label="提交"></XAction>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { XQueryForm, XAction, XField, type QueryFormItems } from '@vtj/ui';

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
