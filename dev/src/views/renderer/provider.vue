<template>
  <component v-if="renderer" :is="renderer"></component>
</template>
<script lang="ts" setup>
  import { ref, getCurrentInstance } from 'vue';
  import { createProvider, MemoryService, ContextMode } from '@vtj/renderer';
  const renderer = ref();
  const instance = getCurrentInstance();
  const service = new MemoryService();
  const { provider, onReady } = createProvider({
    service,
    mode: ContextMode.Runtime,
    project: {
      id: '项目id'
    }
    // dependencies: {
    //   Vue: () => import('vue'),
    //   VueRouter: () => import('vue-router'),
    //   ElementPlus: () => import('element-plus')
    // }
  });

  onReady(async () => {
    const app = instance?.appContext.app;
    if (app) {
      app.use(provider);
      renderer.value = await provider.getRenderComponent('文件id');
    }
  });
</script>
