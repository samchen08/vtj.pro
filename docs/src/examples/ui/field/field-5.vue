<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { XField } from '@vtj/ui';
  import { ElInput } from 'element-plus';

  const fieldValue = ref('');

  const onChange = (val: any) => {
    console.log('onChange', val);
  };

  const onFocus = () => {
    console.log('onFocus');
  };

  const onBlur = () => {
    console.log('onBlur');
  };

  const options: any = ref([
    { label: '选项一', value: 1 },
    { label: '选项二', value: 2, disabled: true },
    { label: '选项三', value: 3 },
    { label: '选项四', value: 4 }
  ]);

  const optionsLoader = () => {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve(options.value);
      }, 0);
    });
  };
</script>
