<template>
  <div class="docs-page">
    <iframe v-if="url" :src="url" frameborder="0"></iframe>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  const url = ref('');
  const params = new URLSearchParams(window.location.href.split('?')[1]);
  url.value = params.get('url') || '';
</script>
<style lang="scss" scoped>
  .docs-page {
    height: 100%;
    width: 100%;
  }
  iframe {
    height: 100%;
    width: 100%;
    border: none;
  }
</style>
