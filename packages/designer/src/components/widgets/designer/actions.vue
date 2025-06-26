<template>
  <div class="v-actions" :class="[`is-${props.position}`]">
    <XAction
      mode="icon"
      size="small"
      :icon="VtjIconLayers"
      :label="title"
      :menus="menus"
      background="none"
      @command="onCommand"></XAction>
    <XAction
      v-if="isShowEdit"
      mode="icon"
      size="small"
      :icon="Edit"
      background="none"
      title="修改区块"
      @click="onOpenBlock"></XAction>
    <XActionBar
      :disabled="!visible"
      mode="icon"
      size="small"
      :items="items"
      background="none"
      @click="onClick"></XActionBar>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { XAction, XActionBar } from '@vtj/ui';
  import {
    VtjIconLayers,
    VtjIconArrowUp,
    VtjIconArrowDown,
    VtjIconCopy,
    VtjIconRemove,
    Edit,
    Rank
  } from '@vtj/icons';
  import { NodeModel, BlockModel, isBlock, type NodeFrom } from '@vtj/core';
  import { confirm } from '../../../utils';

  export interface Props {
    position?: string;
    model: NodeModel | BlockModel;
    path?: Array<NodeModel | BlockModel>;
  }

  const props = withDefaults(defineProps<Props>(), {
    path: () => []
  });

  const emits = defineEmits(['action', 'dragstart', 'dragend']);

  const title = computed(() => props.model.name);

  const visible = computed(() => {
    return !isBlock(props.model) && !props.model.locked;
  });

  const menus = computed(() => {
    return props.path.map((n) => {
      return {
        command: n,
        label: n.name,
        onMouseenter: () => {
          emits('action', { type: 'hover', model: n });
        }
      };
    });
  });

  const items = [
    {
      name: 'move',
      icon: Rank,
      title: '移动',
      draggable: true,
      onDragstart: () => {
        emits('dragstart', props.model);
      },
      onDragend: () => {
        emits('dragend', props.model);
      }
    },
    {
      name: 'prev',
      icon: VtjIconArrowUp,
      title: '向前移动'
    },
    {
      name: 'next',
      icon: VtjIconArrowDown,
      title: '向后移动'
    },
    {
      name: 'copy',
      icon: VtjIconCopy,
      title: '复制'
    },
    {
      name: 'remove',
      icon: VtjIconRemove,
      title: '删除'
    }
  ];

  const isShowEdit = computed(() => {
    const from = (props.model as any)?.from as NodeFrom;
    return typeof from === 'object' && from.type === 'Schema';
  });

  const onCommand = (item: any) => {
    emits('action', { type: 'selected', model: item.command });
  };
  const onClick = async (action: any) => {
    if (action.name === 'remove') {
      if (await confirm('确定删除?')) {
        emits('action', { type: action.name, model: props.model });
      }
    } else {
      emits('action', { type: action.name, model: props.model });
    }
  };

  const onOpenBlock = () => {
    emits('action', { type: 'open', model: props.model });
  };
</script>
