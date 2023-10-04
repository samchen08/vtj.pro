<template>
  <ElFormItem v-bind="$attrs">
    <slot></slot>
  </ElFormItem>
</template>
<script lang="ts" setup>
  import { ElFormItem } from 'element-plus';
</script>
