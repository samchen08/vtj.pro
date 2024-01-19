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
      label="属性名称"
      required
      tip="名称为英文驼峰格式"
      :disabled="!!props.item"
      :rules="{
        message: '名称格式错误',
        pattern: NAME_REGEX
      }"></XField>
    <XField
      name="type"
      label="数据类型"
      editor="checkbox"
      :props="{ button: true, size: 'small' }"
      :options="dataTypes"
      required></XField>
    <XField name="required" label="必须" editor="switch"></XField>
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
  import { DATA_TYPES, type Context } from '@vtj/renderer';
  import {
    type BlockProp,
    type JSExpression,
    type BlockModel
  } from '@vtj/core';
  import Editor from '../../editor';
  import { NAME_REGEX } from '../../../constants';
  import { expressionValidate } from '../../../utils';

  export interface Props {
    item?: BlockProp;
    current: BlockModel;
    context: Context;
  }

  defineOptions({
    name: 'DefinedPropsDialog'
  });

  const props = defineProps<Props>();
  const title = computed(() => (props.item ? '编辑定义属性' : '新增定义属性'));
  const model = ref<BlockProp>(
    Object.assign(
      {
        default: {
          type: 'JSExpression',
          value: ''
        }
      },
      props.item
    )
  );

  const dataTypes = Object.keys(DATA_TYPES).map((item) => ({
    label: item,
    value: item
  }));

  const submit = async (data: any) => {
    const defaults = data.default as JSExpression;
    if (defaults) {
      const ret = expressionValidate(defaults, props.context, true);
      if (!ret) {
        return false;
      }
    }
    props.current.setProp(data);
    return true;
  };
</script>
