<template>
  <Panel :title="props.title" class="v-sub-panel" size="small" :fit="false">
    <ElForm size="small" label-width="80px" @keydown.enter.prevent.stop>
      <SetterWrapper
        v-for="item of props.items"
        v-bind="item"
        :key="`${item.name}_${props.node.id}`"
        :current="props.current"
        :context="props.context"
        :removable="props.removable"
        @change="onChange"
        @remove="onRemove">
      </SetterWrapper>
    </ElForm>
  </Panel>
</template>
<script lang="ts" setup>
  import { ElForm } from 'element-plus';
  import {
    type MaterialSetter,
    type NodeModel,
    type BlockModel
  } from '@vtj/core';
  import { type Context } from '@vtj/renderer';
  import { Panel } from '../../shared';
  import { SetterWrapper } from '../../../wrappers';

  export interface Props {
    context: Context | null;
    current: BlockModel | null;
    title: string;
    items: MaterialSetter[];
    node: NodeModel;
    removable?: boolean;
  }

  const props = defineProps<Props>();
  const emit = defineEmits(['change', 'remove']);

  const onChange = (name: string, value: any) => {
    emit('change', name, value);
  };

  const onRemove = (name: string) => {
    emit('remove', name);
  };
</script>
