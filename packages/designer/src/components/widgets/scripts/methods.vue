<template>
  <Group
    title="组件方法"
    :current="props.current"
    :context="props.context"
    :list="list"
    nameLabel="方法名称"
    valueLabel="方法函数 [ JSFunction ]"
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
    const entries = Object.entries(props.current?.methods || {});
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
    return props.current?.removeFunction('methods', data.name);
  };
  const submit = async (form: any, edit: boolean) => {
    const { name, value } = form;
    if (!edit && !!props.current?.methods[name]) {
      notify(`名称 ${name} 已存在，请更换！`);
      return false;
    }
    const code: JSFunction = {
      type: 'JSFunction',
      value
    };
    const valid = expressionValidate(code, props.context, true);
    if (!valid) return false;

    props.current?.setFunction('methods', name, code);
    return true;
  };
</script>
