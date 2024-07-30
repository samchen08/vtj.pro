<template>
  <div>
    <XQrCode :content="contentLoader" :expired="5000"></XQrCode>
  </div>
</template>
<script lang="ts" setup>
  import { XQrCode } from '@vtj/ui';

  const contentLoader: any = () => {
    return 'abc' + Date.now();
  };
</script>
