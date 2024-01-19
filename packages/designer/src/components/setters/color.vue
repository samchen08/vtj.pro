<template>
  <ElColorPicker v-bind="$attrs"></ElColorPicker>
</template>
<script lang="ts" setup>
  import { ElColorPicker } from 'element-plus';

  defineOptions({
    name: 'ColorSetter'
  });
</script>
