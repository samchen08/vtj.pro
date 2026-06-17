<template>
  <div class="field-demo" style="max-width: 600px">
    <h3>编辑器类型</h3>
    <XForm :model="editorModel" :footer="false">
      <XField name="text" label="文本" editor="text"></XField>
      <XField name="textarea" label="多行文本" editor="textarea"></XField>
      <XField name="number" label="数字" editor="number"></XField>
      <XField name="select" label="下拉选择" editor="select" :options="options"></XField>
      <XField name="radio" label="单选" editor="radio" :options="options"></XField>
      <XField name="checkbox" label="多选" editor="checkbox" :options="options"></XField>
      <XField name="switch" label="开关" editor="switch"></XField>
      <XField name="date" label="日期" editor="date"></XField>
      <XField name="datetime" label="日期时间" editor="datetime"></XField>
      <XField name="rate" label="评分" editor="rate"></XField>
      <XField name="slider" label="滑块" editor="slider"></XField>
    </XForm>

    <h3>提示信息 + Tooltip 校验</h3>
    <XForm :model="tooltipModel" :footer="false" :tooltip-message="true">
      <XField name="name" label="姓名" editor="text" :rules="[{ required: true, message: '请输入姓名' }]"></XField>
      <XField name="tip" label="带提示" editor="text" tip="请输入您的手机号码"></XField>
    </XForm>

    <h3>自定义编辑器插槽</h3>
    <XForm :model="slotModel" :footer="false">
      <XField name="custom" label="自定义">
        <template #editor>
          <div class="custom-editor">
            <span>自定义编辑器内容</span>
          </div>
        </template>
      </XField>
    </XForm>
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { XForm, XField } from '@vtj/ui';

  const options = [
    { label: '选项 A', value: 'a' },
    { label: '选项 B', value: 'b' },
    { label: '选项 C', value: 'c' }
  ];

  const editorModel = reactive({
    text: '',
    textarea: '',
    number: null,
    select: null,
    radio: null,
    checkbox: [],
    switch: false,
    date: null,
    datetime: null,
    rate: null,
    slider: null
  });

  const tooltipModel = reactive({ name: '', tip: '' });
  const slotModel = reactive({ custom: '' });
</script>
<style lang="scss" scoped>
  .field-demo {
    padding: 20px;
    h3 {
      margin: 20px 0 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #333;
    }
    .custom-editor {
      padding: 8px 12px;
      background: #f5f7fa;
      border-radius: 4px;
      color: #666;
    }
  }
</style>
