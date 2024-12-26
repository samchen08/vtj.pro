<template>
  <div>
    <ElButton @click="visible1 = true">extra-handle 插槽 </ElButton>
    <ElButton @click="visible2 = true">footer 插槽 </ElButton>
    <XDialogForm
      v-model="visible1"
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

      <template #extra>
        <ElButton type="success">插槽-- extra</ElButton>
      </template>

      <template #handle>
        <ElButton type="success">插槽--handle</ElButton>
      </template>
    </XDialogForm>

    <XDialogForm
      v-model="visible2"
      title="弹窗表单"
      size="default"
      :form-props="{ labelWidth: '100px' }"
      :model="model"
      :rules="rules"
      @close="onClose"
      @submit="onSubmit"
      :submit-method="submitMethod">
      <h1>footer 插槽只能单独使用</h1>

      <template #extra>
        <ElButton type="success">插槽-- extra</ElButton>
      </template>

      <template #handle>
        <ElButton type="success">插槽--handle</ElButton>
      </template>

      <template #footer>
        <ElButton type="success">插槽--footer</ElButton>
      </template>
    </XDialogForm>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { ElButton } from 'element-plus';
  import { XDialogForm, XField } from '@vtj/ui';

  const visible1 = ref(false);
  const visible2 = ref(false);

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
