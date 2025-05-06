<template>
  <div
    class="v-box"
    :class="classes"
    :draggable="draggable"
    @dragstart="onDragStart"
    @dragend="onDragEnd">
    <XContainer direction="column" justify="center" align="center">
      <slot>
        <XIcon
          v-if="props.icon"
          class="v-box__icon"
          :icon="getIcon(props.icon)"
          :size="24"></XIcon>
        <span v-else class="v-box__name">{{ props.name }}</span>
        <span class="v-box__label">{{ props.title }}</span>
      </slot>
    </XContainer>
    <XContainer
      v-if="props.editable"
      class="v-box__footer"
      justify="flex-end"
      align="center">
      <XAction
        :icon="MoreFilled"
        mode="icon"
        size="small"
        background="none"
        type="info"
        :dropdown="{ placement: 'bottom-end' }"
        :menus="menus"
        @command="onCommand"></XAction>
    </XContainer>
    <span
      v-if="props.tag"
      class="v-box__tag"
      :class="{ [`is-${props.tagType}`]: !!props.tagType }">
      {{ props.tag }}
    </span>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { XContainer, XAction, XIcon } from '@vtj/ui';
  import {
    VtjIconEdit,
    VtjIconRemove,
    MoreFilled,
    VtjIconCopy
  } from '@vtj/icons';
  import * as VtjIcons from '@vtj/icons';
  import { ElMessageBox } from 'element-plus';

  export interface Props {
    name: string;
    icon?: string;
    title: string;
    editable?: boolean;
    active?: boolean;
    draggable?: boolean;
    tag?: string;
    tagType?: 'warning' | 'success' | 'danger' | 'primary';
  }

  const props = defineProps<Props>();
  const emits = defineEmits(['copy', 'edit', 'remove', 'dragstart', 'dragend']);

  const getIcon = (icon?: string) => {
    return icon ? (VtjIcons as any)[icon] : null;
  };

  const menus = [
    {
      label: '复制',
      command: 'copy',
      icon: VtjIconCopy
    },
    {
      label: '编辑',
      command: 'edit',
      icon: VtjIconEdit
    },
    {
      label: '删除',
      command: 'remove',
      icon: VtjIconRemove
    }
  ];

  const onEdit = () => {
    emits('edit');
  };

  const onCopy = () => {
    emits('copy');
  };

  const onRemove = async () => {
    const ret = await ElMessageBox.confirm('确认删除？', '提示', {
      type: 'warning'
    }).catch(() => false);
    if (ret) {
      emits('remove');
    }
  };

  const onCommand = (item: any) => {
    if (item.command === 'edit') {
      onEdit();
    }
    if (item.command === 'remove') {
      onRemove();
    }
    if (item.command === 'copy') {
      onCopy();
    }
  };

  const classes = computed(() => {
    return {
      'is-active': props.active,
      'is-draggable': props.draggable
    };
  });

  const onDragStart = () => {
    emits('dragstart', props);
  };

  const onDragEnd = () => {
    emits('dragend', props);
  };

  defineOptions({
    name: 'VBox'
  });
</script>
