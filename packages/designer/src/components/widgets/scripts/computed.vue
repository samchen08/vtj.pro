<template>
  <Group
    title="计算属性"
    :current="props.current"
    :context="props.context"
    :list="list"
    nameLabel="计算属性名称"
    valueLabel="计算函数 [ JSFunction ]"
    :createEmpty="createEmpty"
    :remove="remove"
    :submit="submit"></Group>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { BlockModel, type JSFunction } from '@vtj/core';
  import { type Context, JSCodeToString } from '@vtj/renderer';
  import Group from './group.vue';
  import { notify, expressionValidate } from '../../../utils';

  export interface Props {
    context: Context | null;
    current: BlockModel | null;
  }
  const props = defineProps<Props>();
  const list = computed(() => {
    const entries = Object.entries(props.current?.computed || {});
    return entries.map(([name, value]) => {
      return { name, value: JSCodeToString(value) };
    });
  });
  const createEmpty = () => {
    return {
      name: '',
      value: '() => { }'
    };
  };

  const remove = (data: any) => {
    return props.current?.removeFunction('computed', data.name);
  };
  const submit = async (form: any, edit: boolean) => {
    const { name, value } = form;
    if (!edit && !!props.current?.computed[name]) {
      notify(`名称 ${name} 已存在，请更换！`);
      return false;
    }
    const code: JSFunction = {
      type: 'JSFunction',
      value
    };
    const valid = expressionValidate(code, props.context, true);
    if (!valid) return false;
    props.current?.setFunction('computed', name, code);
    return true;
  };
</script>
