<template>
  <div>
    <XAction
      label="showFooter"
      type="primary"
      @click="showFooter = !showFooter">
    </XAction>

    <XQueryForm
      ref="formRef"
      size="default"
      :model="model"
      :items="items"
      :inlineColumns="1"
      :rules="rules"
      :submitMethod="onSubmitMethod"
      submitText="提交"
      resetText="重置">
      <template #custom>
        <XField name="custom" required label="自定义"></XField>
      </template>
    </XQueryForm>

    <XQueryForm
      ref="formRef"
      size="default"
      :model="model"
      :items="items"
      :inlineColumns="1"
      :rules="rules"
      :submitMethod="onSubmitMethod"
      :footer="showFooter"
      submitText="提交"
      resetText="重置">
      <template #custom>
        <XField name="custom" required label="自定义"></XField>
      </template>
    </XQueryForm>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { XQueryForm, XField, XAction, type QueryFormItems } from '@vtj/ui';

  const formRef = ref();

  const model = reactive({
    F1: 'abc'
  });

  const showFooter = ref(false);

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
      name: 'age'
    },
    'custom'
  ];

  const validateCustom = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('Please input the custom'));
    } else {
      callback();
    }
  };

  const rules = reactive({
    name: [
      {
        required: true,
        message: 'Please input  name',
        trigger: ['blur', 'change']
      }
    ],
    age: [
      {
        required: true,
        message: 'Please input  name',
        trigger: ['blur', 'change']
      }
    ],
    custom: [{ validator: validateCustom, trigger: 'blur' }]
  });

  const onSubmitMethod = (model: any) => {
    console.log('onSubmitMethod', model);
  };
</script>
