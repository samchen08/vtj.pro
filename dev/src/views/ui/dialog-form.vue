<template>
  <div>
    <ElButton @click="visible = true">Open dialog </ElButton>
    <XDialogForm
      v-model="visible"
      primary
      title="弹窗表单"
      size="default"
      :form-props="{ labelWidth: '100px' }"
      :model="model"
      :rules="rules"
      @submit="onSubmit"
      :submit-method="submitMethod">
      <XField label="标题" name="title"></XField>
      <XField label="我的内容" name="content" editor="select"></XField>

      <template #handle>
        <span>ABC</span>
      </template>
    </XDialogForm>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElButton } from 'element-plus';
  import { XDialogForm, XField } from '@vtj/ui';

  const visible = ref(false);

  const rules = {
    title: [{ required: true, message: '我是必填项' }]
  };

  const model = {
    title: 'abc',
    content: '111'
  };

  const onSubmit = (m: any) => {
    console.log('submit', m);
  };

  const submitMethod = async (m: any) => {
    console.log('submitMethod', m);
    return true;
  };
</script>
