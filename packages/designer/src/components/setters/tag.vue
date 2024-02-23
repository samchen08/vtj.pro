<template>
  <div class="v-tag-setter" size="small" v-bind="$attrs">
    <span
      v-for="item in props.options"
      :label="item.value"
      :title="item.label"
      :class="{
        'is-active': props.modelValue === item.value
      }"
      @click="onClick(item)">
      <XIcon v-if="item.svg" :src="item.svg" :size="16"></XIcon>
      <template v-else>{{ item.label }}</template>
    </span>
  </div>
</template>
<script lang="ts" setup>
  import { XIcon } from '@vtj/ui';
  export interface Props {
    options?: { label: string; value: any; svg?: string }[];
    modelValue?: any;
  }

  const props = withDefaults(defineProps<Props>(), {
    options: () => []
  });

  const emit = defineEmits(['update:modelValue', 'change']);

  const onClick = (item: any) => {
    if (item.value === props.modelValue) {
      emit('update:modelValue', undefined);
      emit('change', undefined);
    } else {
      emit('update:modelValue', item.value);
      emit('change', item.value);
    }
  };

  defineOptions({
    name: 'TagSetter'
  });
</script>
