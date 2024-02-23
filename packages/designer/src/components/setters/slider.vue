<template>
  <div class="v-slider-setter">
    <ElSlider size="small" v-bind="$attrs" v-model="current"></ElSlider>
    <XIcon
      @click="clear"
      class="v-slider-setter__close"
      :size="16"
      :icon="Close"></XIcon>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { ElSlider } from 'element-plus';
  import { XIcon } from '@vtj/ui';
  import { Close } from '@vtj/icons';

  export interface Props {
    modelValue?: number | number[];
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined
  });
  const emit = defineEmits(['change', 'update:modelValue']);

  const current = ref();

  watch(
    () => props.modelValue,
    (v) => {
      current.value = v;
    },
    { immediate: true }
  );

  watch(current, (v) => {
    emit('change', v);
    emit('update:modelValue', v);
  });

  const clear = () => {
    current.value = undefined;
    emit('change', undefined);
    emit('update:modelValue', undefined);
  };

  defineOptions({
    name: 'SliderSetter'
  });
</script>
