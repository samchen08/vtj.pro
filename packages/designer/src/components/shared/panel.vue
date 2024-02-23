<template>
  <XPanel
    class="v-panel"
    :class="classes"
    :border="false"
    :header="header"
    fit>
    <template #actions>
      <XAction
        v-if="props.plus"
        :size="($attrs as any).size"
        mode="icon"
        :icon="VtjIconPlus"
        background="hover"
        title="新增"
        @click="onClickPlus"></XAction>
      <XAction
        v-if="props.edit"
        :size="($attrs as any).size"
        mode="icon"
        :icon="EditPen"
        background="hover"
        title="编辑"
        @click="onClickEdit"></XAction>
      <XAction
        v-if="props.remove"
        :size="($attrs as any).size"
        mode="icon"
        :icon="Delete"
        background="hover"
        title="清除"
        @click="onClickRemove"></XAction>
      <XAction
        v-if="props.save"
        :size="($attrs as any).size"
        mode="icon"
        :icon="VtjIconSave"
        background="hover"
        title="保存"
        @click="onClickSave"></XAction>

      <XAction
        v-if="props.collapsable"
        v-show="collapsed"
        :size="($attrs as any).size"
        mode="icon"
        :icon="ArrowDown"
        background="hover"
        title="展开"
        @click="setCollapsed(false)"></XAction>
      <XAction
        v-if="props.collapsable"
        v-show="!collapsed"
        :size="($attrs as any).size"
        mode="icon"
        :icon="ArrowUp"
        background="hover"
        title="收起"
        @click="setCollapsed(true)"></XAction>
      <slot name="actions"></slot>
    </template>
    <slot></slot>
    <template #footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </template>
  </XPanel>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { XPanel, XAction } from '@vtj/ui';
  import {
    VtjIconPlus,
    Back,
    Delete,
    VtjIconSave,
    EditPen,
    ArrowDown,
    ArrowUp
  } from '@vtj/icons';

  export interface Props {
    title?: string;
    subtitle?: string;
    plus?: boolean;
    back?: boolean;
    edit?: boolean;
    remove?: boolean;
    save?: boolean;
    header?: boolean;
    collapsable?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    header: true
  });
  const emit = defineEmits(['plus', 'back', 'remove', 'save', 'edit']);

  const collapsed = ref(false);

  const classes = computed(() => {
    return {
      'is-collapsed': !!collapsed.value
    };
  });

  const onClickPlus = () => {
    emit('plus');
  };

  const onClickEdit = () => {
    emit('edit');
  };

  const onClickBack = () => {
    emit('back');
  };

  const onClickRemove = () => {
    emit('remove');
  };

  const onClickSave = () => {
    emit('save');
  };

  const header = computed(() => {
    return props.header
      ? {
          content: props.title,
          subtitle: props.subtitle,
          icon: props.back ? Back : undefined,
          onClickBack: props.back ? onClickBack : undefined,
          onClick: props.collapsable
            ? () => {
                collapsed.value = !collapsed.value;
              }
            : undefined
        }
      : null;
  });

  const setCollapsed = (value: boolean) => {
    collapsed.value = value;
  };

  defineOptions({
    name: 'VPanel'
  });
</script>
