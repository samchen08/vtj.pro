<template>
  <Group
    title="侦听器"
    :current="props.current"
    :context="props.context"
    :list="list"
    nameLabel="侦听源 [ JSFunction ]"
    valueLabel="处理函数 [ JSFunction ]"
    :createEmpty="createEmpty"
    :remove="remove"
    :submit="submit"
    :itemTitle="itemTitle"
    grow>
    <template #fields="{ model, nameLabel, valueLabel }">
      <XField name="source" :label="nameLabel" required>
        <template #editor>
          <Editor dark height="100px" v-model="model.source"></Editor>
        </template>
      </XField>
      <XField
        name="deep"
        v-model="model.deep"
        label="深度监听"
        editor="switch"></XField>
      <XField
        name="immediate"
        v-model="model.immediate"
        label="立即执行"
        editor="switch"></XField>
      <XField name="handler" :label="valueLabel" required>
        <template #editor>
          <Editor dark height="130px" v-model="model.handler"></Editor>
        </template>
      </XField>
    </template>
  </Group>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { BlockModel, type JSFunction } from '@vtj/core';
  import { type Context, JSCodeToString } from '@vtj/renderer';
  import { XField } from '@vtj/ui';
  import Group from './group.vue';
  import Editor from '../../editor';
  import { expressionValidate } from '../../../utils';

  export interface Props {
    context: Context | null;
    current: BlockModel | null;
  }
  const props = defineProps<Props>();

  const list = computed(() => {
    return (props.current?.watch || []).map((n) => {
      return {
        ...n,
        source: JSCodeToString(n.source),
        handler: JSCodeToString(n.handler)
      };
    });
  });

  const createEmpty = () => {
    return {
      source: '() => { }',
      deep: false,
      immediate: false,
      handler: '() => { }'
    };
  };

  const itemTitle = (data: any) => {
    return data.source;
  };

  const remove = (data: any) => {
    return props.current?.removeWatch(data);
  };

  const submit = async (form: any, _edit: boolean) => {
    const source: JSFunction = {
      type: 'JSFunction',
      value: form.source
    };
    const handler: JSFunction = {
      type: 'JSFunction',
      value: form.handler
    };

    if (
      !expressionValidate(source, props.context, true) ||
      !expressionValidate(handler, props.context, true)
    ) {
      return false;
    }

    const data = {
      ...form,
      source,
      handler
    };
    props.current?.setWatch(data);
    return true;
  };
</script>
