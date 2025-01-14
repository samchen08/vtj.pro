<template>
  <div class="not-found">
    <Empty description="找不到页面【404】"></Empty>
  </div>
</template>
<script lang="ts" setup>
  import { Empty } from 'vant';
</script>
<style lang="scss" scoped>
  .not-found {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
