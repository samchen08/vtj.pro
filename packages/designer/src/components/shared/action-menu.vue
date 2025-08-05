<template>
  <XAction
    mode="icon"
    size="small"
    :label="current?.label"
    type="info"
    background="always"
    :dropdown="{
      size: 'small',
      placement: 'bottom-end'
    }"
    :menus="props.menus"
    @command="handleCommand"
    arrow>
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
  import { VtjIconCheck } from '@vtj/icons';

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

  const emit = defineEmits(['update:modelValue']);

  const current = ref<ActionMenuItem>();

  const handleCommand = (item: ActionMenuItem) => {
    props.menus.forEach((n) => {
      n.checked = false;
    });
    item.checked = true;
    current.value = item;
    emit('update:modelValue', item.command);
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
