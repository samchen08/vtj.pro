<template>
  <ConfigProvider>
    <Suspense>
      <RouterView :key="route.fullPath"></RouterView>
    </Suspense>
  </ConfigProvider>
</template>
<script setup lang="ts">
  // @ts-ignore
  import { Suspense } from 'vue';
  import { RouterView, useRoute } from 'vue-router';
  import { ConfigProvider } from 'vant';
  const route = useRoute();
</script>
