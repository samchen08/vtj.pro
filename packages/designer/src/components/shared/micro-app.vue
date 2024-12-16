<template>
  <XDialog title="页面模板" width="80%" height="80%">
    <iframe
      src="http://localhost:9528/auth/client.html?r=http%3A%2F%2Flocalhost%3A9527%2F%23%2F%3Fopen%3Dtemplate"></iframe>
  </XDialog>
</template>
<script lang="ts" setup>
  import { XDialog } from '@vtj/ui';

  defineOptions({
    name: 'VMicroApp'
  });

  //   window.open('http://localhost:9528/auth/');
</script>

<style lang="scss" scoped>
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
</style>
