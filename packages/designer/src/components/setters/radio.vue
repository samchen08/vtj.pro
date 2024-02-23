<template>
  <ElRadioGroup class="v-radio-setter" size="small" v-bind="$attrs">
    <ElRadioButton
      v-for="item in props.options"
      :label="item.value"
      :title="item.label">
      <XIcon v-if="item.svg" :src="item.svg"></XIcon>
      <template v-else>{{ item.label }}</template>
    </ElRadioButton>
  </ElRadioGroup>
</template>
<script lang="ts" setup>
  import { ElRadioButton, ElRadioGroup } from 'element-plus';
  import { XIcon } from '@vtj/ui';
  export interface Props {
    options?: { label: string; value: any; svg?: string }[];
  }

  const props = withDefaults(defineProps<Props>(), {
    options: () => []
  });

  defineOptions({
    name: 'RadioSetter'
  });
</script>
