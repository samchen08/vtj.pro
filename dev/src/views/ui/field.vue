<template>
  <div>
    <ElForm size="default">
      <XField
        ref="fieldRef"
        v-model="fieldValue"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange">
      </XField>

      <XField
        label="字段名称"
        label-width="100px"
        editor="text"
        required
        error="错误信息"
        :inline-message="true"
        :show-message="true"
        @change="onChange"
        :tooltipMessage="true"
        tooltip-position="outer">
      </XField>

      <XField
        label="字段名称"
        label-width="100px"
        editor="textarea"
        placeholder="多行文本"
        :disabled="disabled">
      </XField>

      <XField
        label="字段名称"
        error="错误信息"
        label-width="100px"
        editor="select"
        :props="{ multiple: true }"
        :options="optionsLoader"
        tooltip-position="outer">
        <template #option="{ option }">
          <div>-- {{ option.label }}</div>
        </template>
      </XField>

      <XField
        label="字段名称"
        error="错误信息"
        v-model="fieldValue"
        label-width="100px"
        :options="optionsLoader"
        tooltip-position="outer"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange">
        <template #editor="{ editor }">
          <ElInput v-bind="editor">
            <template #prepend>搜索</template>
          </ElInput>
        </template>
      </XField>

      <XField
        label="字段名称"
        error="错误信息"
        label-width="100px"
        editor="checkbox"
        :model-value="[2]"
        :props="{
          button: true
        }"
        :options="optionsLoader">
      </XField>
      <XField
        label="字段名称"
        error="错误信息"
        label-width="100px"
        editor="radio"
        :props="{
          button: true
        }"
        :options="optionsLoader">
      </XField>

      <XField label="Number" editor="number"> </XField>
      <XField label="日期" editor="date"> </XField>
      <XField label="日期时间" editor="datetime"> </XField>
      <XField label="时间" editor="time" width="400px"> </XField>
      <XField label="投票" editor="rate"> </XField>
      <XField label="开关" editor="switch"> </XField>
      <XField label="滑块" editor="slider"> </XField>
    </ElForm>
  </div>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { XField } from '@vtj/ui';
  import { ElInput, ElForm } from 'element-plus';

  const fieldValue = ref('');
  const fieldRef = ref();

  const disabled = ref(false);

  const onChange = (val: any) => {
    console.log('onChange', val);
  };

  const onFocus = () => {
    console.log('onFocus');
  };

  const onBlur = () => {
    console.log('onBlur');
  };

  const options: any = [
    { label: '选项一', value: 1 },
    { label: '选项二', value: 2, disabled: true },
    { label: '选项三', value: 3 },
    { label: '选项四', value: 4 }
  ];

  const optionsLoader = () => {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve(options);
      }, 0);
    });
  };

  setTimeout(() => {
    // disabled.value = true;
    // fieldValue.value = 'ABC';
    // fieldRef.value.focus();
    // console.log('fieldRef.value.focus', fieldRef.value.focus);
  }, 100);
</script>
