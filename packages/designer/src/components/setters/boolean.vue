<template>
  <ElSwitch v-bind="$attrs" :model-value="!!$attrs.modelValue"></ElSwitch>
</template>
<script lang="ts" setup>
  import { ElSwitch } from 'element-plus';
  defineOptions({
    name: 'BooleanSetter'
  });
</script>
