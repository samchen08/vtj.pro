<template>
  <div>
    <XContainer justify="space-between">
      <XField
        name="settings.loading"
        size="small"
        label="加载提示"
        editor="switch"></XField>
      <XField
        size="small"
        name="settings.failMessage"
        label="失败提示"
        editor="switch"></XField>
      <XField
        size="small"
        name="settings.validSuccess"
        label="校验成功"
        editor="switch"></XField>
      <XField
        size="small"
        name="settings.originResponse"
        label="原始响应"
        editor="switch"></XField>
      <XField
        size="small"
        name="settings.injectHeaders"
        label="注入请求头"
        editor="switch"></XField>
    </XContainer>
    <XField
      size="small"
      name="settings.type"
      label="发送数据类型"
      editor="radio"
      :options="typeOptions"
      :props="{ button: true }"></XField>
    <XField
      size="small"
      name="headers.value"
      label="请求头配置"
      tip="支持 JSExpression 或 JSFunction">
      <template #editor>
        <Editor
          dark
          height="260px"
          v-model="currentModel.headers.value"></Editor>
      </template>
    </XField>
  </div>
</template>
<script lang="ts" setup>
  import { inject } from 'vue';
  import { XContainer, XField } from '@vtj/ui';
  import Editor from '../../editor';
  const typeOptions = [
    {
      label: '表单',
      value: 'form'
    },
    {
      label: 'JSON',
      value: 'json'
    },
    {
      label: '文件',
      value: 'data'
    }
  ];

  const currentModel = inject('currentModel', null) as any;
</script>
