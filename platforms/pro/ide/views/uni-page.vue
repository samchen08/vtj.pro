<template>
  <div class="uni-iframe">
    <iframe :src="iframeSrc"></iframe>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();

  const iframeSrc = computed(() => {
    return `http://localhost:8010/uni/#${route.path}`;
  });
</script>

<style lang="scss" scoped>
  .uni-iframe {
    width: 100%;
    height: 100%;
    overflow: hidden;
    iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
</style>
