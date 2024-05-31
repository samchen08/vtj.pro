<template>
  <XDialogForm
    :title="title"
    width="600px"
    height="200px"
    :model="model"
    :form-props="{ tooltipMessage: false }"
    :submit-method="submit">
    <XField
      name="name"
      label="事件名称"
      required
      :disabled="!!props.item"
      :rules="{
        message: '名称格式错误',
        pattern: NAME_REGEX
      }"></XField>
    <XField
      name="params"
      label="参数"
      editor="select"
      placeholder="输入参数名称回车确定"
      :options="[
        { label: 'e', value: 'e' },
        { label: 'data', value: 'data' },
        { label: 'params', value: 'params' },
        { label: 'item', value: 'item' },
        { label: 'index', value: 'index' }
      ]"
      :props="{
        multiple: true,
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true
      }"
      :rules="{ validator: paramsValidator }"></XField>
  </XDialogForm>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { XDialogForm, XField } from '@vtj/ui';
  import { type Context } from '@vtj/renderer';
  import { type BlockModel, type BlockEmit } from '@vtj/core';
  import { NAME_REGEX } from '../../../constants';

  export interface Props {
    item?: BlockEmit;
    current: BlockModel;
    context: Context;
  }

  defineOptions({
    name: 'DefinedEventsDialog'
  });

  const props = defineProps<Props>();
  const title = computed(() => (props.item ? '编辑定义事件' : '新增定义事件'));
  const model = ref(props.item);

  const paramsValidator = (_rule: any, value: any, callback: any) => {
    if (Array.isArray(value)) {
      const valid = value.every((n) => NAME_REGEX.test(n));
      if (!valid) {
        callback(new Error('参数名称格式错误'));
      } else {
        callback();
      }
    } else {
      callback(new Error('参数名称必须是数组形式'));
    }
  };

  const submit = async (data: any) => {
    if (props.item) {
      props.current.removeEmit(props.item.name, true);
    }
    props.current.setEmit(data);
    return true;
  };
</script>
