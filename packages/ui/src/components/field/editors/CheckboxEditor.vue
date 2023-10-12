<template>
  <ElCheckboxGroup v-bind="$attrs">
    <component
      v-for="(item, index) in props.options"
      :is="itemComponent"
      :key="`item_${index}_${item.value}`"
      :label="item.value">
      {{ item.label }}
    </component>
  </ElCheckboxGroup>
</template>
<script lang="ts" setup>
  import { computed, markRaw } from 'vue';
  import { ElCheckboxGroup, ElCheckbox, ElCheckboxButton } from 'element-plus';
  import { FieldOption } from '../types';
  export interface Props {
    options?: FieldOption[];
    button?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    options: () => [] as FieldOption[],
    button: false
  });

  const itemComponent = computed(() =>
    markRaw(props.button ? ElCheckboxButton : ElCheckbox)
  );
</script>
