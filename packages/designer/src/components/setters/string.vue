<template>
  <ElInput clearable v-bind="$attrs"></ElInput>
</template>
<script lang="ts" setup>
  import { ElInput } from 'element-plus';
  defineOptions({
    name: 'StringSetter'
  });
</script>
