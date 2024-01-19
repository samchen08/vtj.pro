<template>
  <XPanel class="v-panel" :border="false" :header="header" fit>
    <template #actions>
      <XAction
        v-if="props.plus"
        :size="$attrs.size as any"
        mode="icon"
        :icon="VtjIconPlus"
        background="hover"
        title="新增"
        @click="onClickPlus"></XAction>
      <XAction
        v-if="props.remove"
        :size="$attrs.size as any"
        mode="icon"
        :icon="Delete"
        background="hover"
        title="清除"
        @click="onClickRemove"></XAction>
      <XAction
        v-if="props.save"
        :size="$attrs.size as any"
        mode="icon"
        :icon="VtjIconSave"
        background="hover"
        title="保存"
        @click="onClickSave"></XAction>
      <slot name="actions"></slot>
    </template>
    <slot></slot>
    <template #footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </template>
  </XPanel>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { XPanel, XAction } from '@vtj/ui';
  import { VtjIconPlus, Back, Delete, VtjIconSave } from '@vtj/icons';

  export interface Props {
    title?: string;
    subtitle?: string;
    plus?: boolean;
    back?: boolean;
    remove?: boolean;
    save?: boolean;
    header?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    header: true
  });
  const emit = defineEmits(['plus', 'back', 'remove', 'save']);

  const onClickPlus = () => {
    emit('plus');
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
          onClickBack: props.back ? onClickBack : undefined
        }
      : null;
  });

  defineOptions({
    name: 'VPanel'
  });
</script>
