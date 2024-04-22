<template>
  <div>
    <XSmsCodeInput></XSmsCodeInput>
  </div>
</template>
<script lang="ts" setup>
  import { XSmsCodeInput, request } from '@vtj/web';

  request({
    url: '/mock-api/upload',
    settings: {
      originResponse: true
    }
  }).then((res) => {
    console.log(res);
  });
</script>
