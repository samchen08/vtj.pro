<template>
  <div>正在跳转...</div>
</template>
<script lang="ts" setup>
  const pathname = window.location.pathname;
  const path = pathname.replace('redirect.html', 'lcdp/designer/');
  window.location.replace(path);
</script>
