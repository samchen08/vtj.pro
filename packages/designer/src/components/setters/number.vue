<template>
  <ElInputNumber
    class="v-number-setter"
    controls-position="right"
    :model-value="modelValue"
    v-bind="$attrs"
    @change="handleChange"></ElInputNumber>
</template>
<script lang="ts" setup>
  import { ElInputNumber } from 'element-plus';
  import { isJSExpression } from '@vtj/renderer';
  import { computed } from 'vue';

  export interface Props {
    modelValue?: any;
  }

  const props = defineProps<Props>();
  const emit = defineEmits(['change']);

  const modelValue = computed<number | undefined>(() => {
    return isJSExpression(props.modelValue)
      ? undefined
      : Number(props.modelValue || 0);
  });

  const handleChange = (v: any) => {
    emit('change', v);
  };

  defineOptions({
    name: 'NumberSetter'
  });
</script>
