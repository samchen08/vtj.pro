<template>
  <ElSelect v-bind="$attrs" @change="onChange">
    <ElOption
      v-for="(option, index) in props.options"
      :key="`item_${index}_${option.value}`"
      v-bind="option">
      <template v-if="$slots.option" #default>
        <slot name="option" :option="option"></slot>
      </template>
    </ElOption>
  </ElSelect>
</template>
<script lang="ts" setup>
  import { ElSelect, ElOption } from 'element-plus';
  import type { FieldOption } from '../types';
  export interface Props {
    options?: FieldOption[];
  }

  const props = withDefaults(defineProps<Props>(), {
    options: () => [] as FieldOption[]
  });

  const emit = defineEmits(['change']);

  const onChange = (v: any) => {
    const items = props.options.filter((n) => {
      if (Array.isArray(v)) {
        return v.includes(n.value);
      }
      return v === n.value;
    });
    emit('change', v, items);
  };
</script>
