<template>
  <div>
    <ElButton @click="visible = true">handle 插槽 </ElButton>
    <XDialogForm
      v-model="visible"
      title="弹窗表单"
      size="default"
      :form-props="{ labelWidth: '100px' }"
      :model="model"
      :rules="rules"
      @close="onClose"
      @submit="onSubmit"
      :submit-method="submitMethod">
      <XField label="标题" name="title"></XField>
      <XField
        label="我的内容"
        name="content"
        editor="select"
        :options="options"></XField>

      <template #extre>
        <ElButton type="success">自定义按钮-插槽</ElButton>
      </template>

      <template #handle>
        <ElButton type="success">自定义按钮-插槽</ElButton>
      </template>
    </XDialogForm>
  </div>
</template>

<script setup lang="ts">
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

  const options: any = ref([
    { label: '选项一', value: 1 },
    { label: '选项二', value: 2, disabled: true },
    { label: '选项三', value: 3 },
    { label: '选项四', value: 4 }
  ]);

  const onClose = () => {
    console.log('close');
  };

  const onSubmit = (m: any) => {
    console.log('submit', m);
  };

  const submitMethod = async (m: any) => {
    console.log('submitMethod', m);
    return true;
  };
</script>

<style scoped></style>
