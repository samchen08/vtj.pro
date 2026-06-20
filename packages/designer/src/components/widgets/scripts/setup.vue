<template>
  <Group
    title="初始化"
    :current="props.current"
    :context="props.context"
    :list="list"
    nameLabel=""
    valueLabel=""
    :createEmpty="createEmpty"
    :remove="remove"
    :submit="submit">
    <template #fields="{ model }">
      <XField
        class="v-binder__editor"
        name="setup"
        label="初始化函数 [ JSFunction ]"
        required>
        <template #editor>
          <Editor dark height="100%" v-model="model.setup"></Editor>
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

  const createEmpty = () => {
    return {
      setup: '() => { }'
    };
  };

  const list = computed(() => {
    return [
      {
        setup: JSCodeToString(props.current?.setup) || createEmpty().setup,
        name: 'setup',
        actions: ['edit']
      }
    ];
  });

  const remove = (_data: any) => {};

  const submit = async (form: any, _edit: boolean) => {
    const { setup } = form;

    const code: JSFunction = {
      type: 'JSFunction',
      value: setup
    };
    const valid = expressionValidate(code, props.context, true);
    if (!valid) return false;
    props.current?.setSetup(code);
    return true;
  };
</script>
