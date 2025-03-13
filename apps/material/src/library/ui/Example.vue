<template>
  <div class="v-example">Example: {{ title }}</div>
</template>

<script lang="ts" setup>
  export interface Props {
    title?: string;
  }
  defineProps<Props>();

  defineOptions({
    name: 'VExample'
  });
</script>

<style lang="scss">
  .v-example {
    padding: 20px;
    border: 1px solid var(--el-color-primary-light-3);
    background: var(--el-color-primary-light-7);
  }
</style>
