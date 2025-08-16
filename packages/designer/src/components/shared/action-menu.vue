<template>
  <XAction
    mode="icon"
    size="small"
    :icon="MoreFilled"
    background="hover"
    :dropdown="{
      size: 'small',
      placement: 'bottom-end',
      trigger: 'click'
    }"
    :menus="props.menus"
    @command="handleCommand">
    <template #item="{ item }">
      <span>
        <VtjIconCheck
          :class="{
            'v-tabs__checked': true,
            'is-checked': item.checked
          }"
          v-if="props.checkable"></VtjIconCheck>
        {{ item.label }}
      </span>
    </template>
  </XAction>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { XAction, type ActionMenuItem } from '@vtj/ui';
  import { VtjIconCheck, MoreFilled } from '@vtj/icons';

  defineOptions({
    name: 'VActionMenu'
  });

  export interface Props {
    menus?: ActionMenuItem[];
    checkable?: boolean;
    modelValue?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    menus: () => []
  });

  const emit = defineEmits(['update:modelValue', 'command']);

  const current = ref<ActionMenuItem>();

  const handleCommand = (item: ActionMenuItem) => {
    props.menus.forEach((n) => {
      n.checked = false;
    });
    item.checked = true;
    current.value = item;
    emit('update:modelValue', item.command);
    emit('command', item.command);
  };

  watch(
    () => props.modelValue,
    (v) => {
      const item = props.menus.find((n) => n.command === v) || props.menus[0];
      current.value = item;
      if (item) {
        handleCommand(item);
      }
    },
    { immediate: true }
  );
</script>
