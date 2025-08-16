<template>
  <Editor dark height="100%" lang="typescript" v-model="code"></Editor>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import Editor from '../../editor';

  export interface Props {
    modelValue: string;
  }

  const props = defineProps<Props>();
  const emit = defineEmits(['update:modelValue']);

  const code = computed({
    get() {
      return props.modelValue || '';
    },
    set(v) {
      emit('update:modelValue', v);
    }
  });
</script>
