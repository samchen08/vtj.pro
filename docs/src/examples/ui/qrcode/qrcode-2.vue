<template>
  <div class="page">
    <XQrCode :size="100" :content="contentLoader" tip="请刷新"></XQrCode>

    <XQrCode
      :size="100"
      :content="contentLoader"
      tip="请刷新"
      :options="qrcodeOptions"></XQrCode>
  </div>
</template>

<script setup lang="ts">
  import { XQrCode } from '@vtj/ui';
  const contentLoader: any = () => {
    return 'abc' + Date.now();
  };

  const qrcodeOptions: any = {
    version: 2,
    errorCorrectionLevel: 'H',
    maskPattern: 7,
    margin: 2,
    scale: 2,
    type: 'image/jpeg',
    color: { dark: '#000000ff', light: '#ffffffff' },
    quality: 0.99
  };
</script>

<style scoped>
  .page {
    display: flex;
    gap: 30px;
  }
</style>
