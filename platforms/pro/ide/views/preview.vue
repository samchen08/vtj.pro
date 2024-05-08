<template>
  <component v-if="renderer" :is="renderer"></component>
</template>
<script lang="ts" setup>
  import { ref, getCurrentInstance } from 'vue';
  import { useRoute } from 'vue-router';
  import {
    createProvider,
    LocalService,
    ContextMode,
    Extension
  } from '../../src';
  const service = new LocalService();
  const ext = await service.getExtension().catch(() => null);
  const options = ext ? await new Extension(ext).load() : undefined;
  const { install, adapter } = options || {};
  const { provider, onReady } = createProvider({
    mode: ContextMode.Runtime,
    service,
    adapter,
    dependencies: {
      Vue: () => import('vue'),
      VueRouter: () => import('vue-router'),
      ElementPlus: () => import('element-plus')
    }
  });
  const route = useRoute();
  const renderer = ref();
  const instance = getCurrentInstance();

  onReady(async () => {
    const app = instance?.appContext.app;
    if (app) {
      app.use(provider);
      app.use(install as any);
    }

    renderer.value = await provider.getRenderComponent(
      route.params.id.toString()
    );
  });
</script>
