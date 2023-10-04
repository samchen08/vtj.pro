<template>
  <ElForm v-bind="$attrs">
    <slot></slot>
  </ElForm>
</template>
<script lang="ts" setup>
  import { ElForm } from 'element-plus';
</script>
