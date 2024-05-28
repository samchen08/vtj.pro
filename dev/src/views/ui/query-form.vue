<template>
  <div>
    <XQueryForm ref="formRef" size="default" :model="model" :items="items">
    </XQueryForm>
    <XAction @click="onClick" label="提交"></XAction>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { XQueryForm, XAction } from '@vtj/web';

  const formRef = ref();

  const model = reactive({
    F1: 'abc'
  });

  const items = [
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
    }
  ];

  const onClick = () => {
    formRef.value.submit();
  };
</script>
