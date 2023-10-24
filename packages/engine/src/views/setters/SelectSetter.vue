<template>
  <ElSelect clearable v-bind="$attrs">
    <ElOption
      v-for="item in props.options"
      :key="item.label"
      v-bind="item"></ElOption>
  </ElSelect>
</template>
<script lang="ts" setup>
  import { ElSelect, ElOption } from 'element-plus';

  export interface Props {
    options?: { label: string; value: any }[];
  }

  const props = withDefaults(defineProps<Props>(), {
    options: () => []
  });
</script>
