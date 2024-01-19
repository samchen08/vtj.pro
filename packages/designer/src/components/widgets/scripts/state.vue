<template>
  <Group
    title="状态数据"
    :current="props.current"
    :context="props.context"
    :list="list"
    nameLabel="状态数据名称"
    valueLabel="状态初始值 [ JSExpression ]"
    :createEmpty="createEmpty"
    :remove="remove"
    :submit="submit"></Group>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { BlockModel, type JSExpression } from '@vtj/core';
  import { type Context, JSCodeToString } from '@vtj/renderer';
  import Group from './group.vue';
  import { notify, expressionValidate } from '../../../utils';

  export interface Props {
    context: Context | null;
    current: BlockModel | null;
  }
  const props = defineProps<Props>();
  const list = computed(() => {
    const entries = Object.entries(props.current?.state || {});
    return entries.map(([name, value]) => {
      return { name, value: JSCodeToString(value) };
    });
  });
  const createEmpty = () => {
    return {
      name: '',
      value: ''
    };
  };

  const remove = (data: any) => {
    return props.current?.removeState(data.name);
  };
  const submit = async (form: any, edit: boolean) => {
    const { name, value } = form;
    if (!edit && !!props.current?.state[name]) {
      notify(`名称 ${name} 已存在，请更换！`);
      return false;
    }
    const code: JSExpression = {
      type: 'JSExpression',
      value
    };
    const valid = expressionValidate(code, props.context, true);
    if (!valid) return false;
    props.current?.setState(name, code);
    return true;
  };
</script>
