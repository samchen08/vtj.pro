<template>
  <XDialogForm
    :title="title"
    width="800px"
    height="500px"
    :model="model"
    :form-props="{ tooltipMessage: false }"
    :submit-method="submit">
    <XField
      name="name"
      label="注入名称"
      required
      tip="名称为英文驼峰格式"
      :disabled="!!props.item"
      :rules="{
        message: '名称格式错误',
        pattern: NAME_REGEX
      }"></XField>
    <XField name="from" label="来源名称" tip="默认和注入名称一致"></XField>
    <XField name="default.value" label="默认值" editor="none">
      <Editor
        v-model="(model.default as any).value"
        height="200px"
        dark></Editor>
    </XField>
  </XDialogForm>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { XDialogForm, XField } from '@vtj/ui';
  import { type Context } from '@vtj/renderer';
  import {
    type BlockInject,
    type JSExpression,
    type BlockModel
  } from '@vtj/core';
  import Editor from '../../editor';
  import { NAME_REGEX } from '../../../constants';
  import { expressionValidate } from '../../../utils';

  export interface Props {
    item?: BlockInject;
    current: BlockModel;
    context: Context;
  }

  defineOptions({
    name: 'DefinedInjectsDialog'
  });

  const props = defineProps<Props>();
  const title = computed(() => (props.item ? '编辑注入' : '新增注入'));
  const model = ref<BlockInject>(
    Object.assign(
      {
        default: {
          type: 'JSExpression',
          value: 'null'
        }
      },
      props.item
    )
  );

  const submit = async (data: any) => {
    const defaults = data.default as JSExpression;
    if (defaults) {
      defaults.value = defaults.value || 'null';
      const ret = expressionValidate(defaults, props.context, true);
      if (!ret) {
        return false;
      }
    }
    props.current.setInject(data);
    return true;
  };
</script>
