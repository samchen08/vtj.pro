<template>
  <div class="dialog-form-demo">
    <h3>基础表单对话框</h3>
    <div class="demo-row">
      <XAction label="新增用户" type="primary" @click="visible1 = true"></XAction>
    </div>
    <XDialogForm
      v-model="visible1"
      title="新增用户"
      :model="form1"
      :rules="rules1"
      submit="保存"
      cancel="取消"
      @submit="onForm1Submit"
      @close="visible1 = false">
      <XField name="name" label="姓名" editor="text" :rules="[{ required: true, message: '请输入姓名' }]"></XField>
      <XField name="age" label="年龄" editor="number"></XField>
      <XField name="gender" label="性别" editor="radio" :options="genderOptions"></XField>
    </XDialogForm>

    <h3>带自定义脚部</h3>
    <div class="demo-row">
      <XAction label="编辑配置" type="primary" @click="visible2 = true"></XAction>
    </div>
    <XDialogForm
      v-model="visible2"
      title="编辑配置"
      :model="form2"
      @close="visible2 = false">
      <XField name="key" label="配置键" editor="text"></XField>
      <XField name="value" label="配置值" editor="text"></XField>
      <template #extra>
        <span style="font-size: 12px; color: #999">提示：修改后需要保存</span>
      </template>
    </XDialogForm>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { XDialogForm, XField, XAction } from '@vtj/ui';

  const visible1 = ref(false);
  const visible2 = ref(false);

  const genderOptions = [
    { label: '男', value: 1 },
    { label: '女', value: 2 }
  ];

  const rules1 = {
    name: [{ required: true, message: '请输入姓名' }]
  };

  const form1 = reactive({ name: '', age: null, gender: null });
  const form2 = reactive({ key: '', value: '' });

  const onForm1Submit = (model: any) => {
    console.log('submit form1:', model);
    visible1.value = false;
  };
</script>
<style lang="scss" scoped>
  .dialog-form-demo {
    padding: 20px;
    h3 {
      margin: 20px 0 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #333;
    }
    .demo-row {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
  }
</style>
