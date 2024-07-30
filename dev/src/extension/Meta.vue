<template>
  <Panel title="数据配置" plus>
    <div class="meta-body">body:{{ text }}</div>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Panel } from '@vtj/pro';
  const text = ref('Hello');
</script>
<style lang="scss" scoped>
  .meta-body {
    background-color: red;
    color: #fff;
  }
</style>
