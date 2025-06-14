<template>
  <XInputUnit
    clearable
    :unit="unit"
    :with-unit="!!unit"
    v-model="modelValue"
    @change="onChange"
    v-wheel-number
    v-bind="$attrs">
  </XInputUnit>
</template>
<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { XInputUnit } from '@vtj/ui';
  import { vWheelNumber } from './shared';

  export interface Props {
    modelValue?: string;
  }

  const props = defineProps<Props>();
  const emit = defineEmits(['change']);
  const isPx = ref(true);
  const unit = computed(() => (isPx.value ? 'px' : undefined));

  const modelValue = ref(props.modelValue);

  const onChange = (val: any) => {
    isPx.value = !!Number(val);
  };

  watch(modelValue, (v: any) => {
    emit('change', v);
  });

  watch(
    () => props.modelValue,
    (v) => {
      if (v) {
        isPx.value = v.endsWith('px');
        modelValue.value = v;
      }
    },
    { immediate: true }
  );

  defineOptions({
    name: 'SizeSetter'
  });
</script>
