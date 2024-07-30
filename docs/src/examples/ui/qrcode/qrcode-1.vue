<template>
  <div class="page">
    <XQrCode :size="100" :content="contentLoader" tip="请刷新"></XQrCode>

    <XQrCode
      :size="120"
      :content="contentLoader"
      :expired="2000"
      tip="请刷新"></XQrCode>

    <XQrCode
      :size="150"
      :content="contentLoader"
      :expired="5000"
      tip="请刷新一下"></XQrCode>
  </div>
</template>

<script setup lang="ts">
  import { XQrCode } from '@vtj/ui';

  const contentLoader: any = () => {
    return 'abc' + Date.now();
  };
</script>

<style scoped>
  .page {
    display: flex;
    gap: 30px;
  }
</style>
