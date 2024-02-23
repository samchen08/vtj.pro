<template>
  <div class="v-section-setter">
    <SizeSetter
      v-for="index in props.sections"
      :name="index - 1"
      v-model="values[index - 1]"
      @change="onChange"
      class="v-section-setter__item"></SizeSetter>
  </div>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import SizeSetter from './size.vue';

  export interface Props {
    modelValue?: string;
    sections?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    sections: 4
  });
  const emit = defineEmits(['change']);

  const values = ref(new Array(props.sections).fill(''));

  watch(
    () => props.modelValue,
    (v) => {
      values.value = v ? v.split(' ') : new Array(props.sections).fill('');
    },
    { immediate: true }
  );

  const onChange = () => {
    emit('change', values.value.join(' ').trim());
  };

  defineOptions({
    name: 'SectionSetter'
  });
</script>
