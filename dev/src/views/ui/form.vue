<template>
  <div class="form-demo" style="max-width: 600px">
    <h3>基础表单</h3>
    <XForm ref="formRef1" :model="model1" :rules="rules" @submit="onSubmit">
      <XField name="name" label="姓名" editor="text" :rules="[{ required: true, message: '请输入姓名' }]"></XField>
      <XField name="email" label="邮箱" editor="text" :rules="[{ type: 'email', message: '请输入正确邮箱' }]"></XField>
      <XField name="gender" label="性别" editor="radio" :options="genderOptions"></XField>
    </XForm>

    <h3>Inline 内联表单</h3>
    <XForm ref="formRef2" :model="model2" inline @submit="onSubmit">
      <XField name="keyword" label="关键词" editor="text"></XField>
      <XField name="status" label="状态" editor="select" :options="statusOptions"></XField>
      <XField name="date" label="日期" editor="date"></XField>
    </XForm>

    <h3>不显示底部按钮</h3>
    <XForm ref="formRef3" :model="model3" :footer="false" @submit="onSubmit">
      <XField name="remark" label="备注" editor="textarea"></XField>
    </XForm>

    <h3>自定义底部按钮</h3>
    <XForm ref="formRef4" :model="model4" submit-text="保存" reset-text="清空" @submit="onSubmit" @reset="onReset">
      <XField name="title" label="标题" editor="text"></XField>
      <XField name="content" label="内容" editor="textarea"></XField>
      <template #action>
        <XAction label="自定义操作" type="warning" @click="onCustomAction"></XAction>
      </template>
    </XForm>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { XForm, XField, XAction } from '@vtj/ui';

  const formRef1 = ref();
  const formRef2 = ref();
  const formRef3 = ref();
  const formRef4 = ref();

  const genderOptions = [
    { label: '男', value: 1 },
    { label: '女', value: 2 }
  ];

  const statusOptions = [
    { label: '启用', value: 1 },
    { label: '禁用', value: 0 }
  ];

  const rules = {
    email: [{ type: 'email', message: '请输入正确邮箱地址' }]
  };

  const model1 = reactive({ name: '', email: '', gender: 1 });
  const model2 = reactive({ keyword: '', status: null, date: null });
  const model3 = reactive({ remark: '' });
  const model4 = reactive({ title: '', content: '' });

  const onSubmit = (model: any) => {
    console.log('submit:', model);
  };

  const onReset = () => {
    console.log('reset');
  };

  const onCustomAction = () => {
    console.log('custom action');
  };
</script>
<style lang="scss" scoped>
  .form-demo {
    padding: 20px;
    h3 {
      margin: 20px 0 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #333;
    }
    .x-form {
      margin-bottom: 16px;
    }
  }
</style>
