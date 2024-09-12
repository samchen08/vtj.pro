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
    Extension,
    DevTools
  } from '../../src';
  import { IconsPlugin } from '@vtj/icons';
  const service = new LocalService();
  const ext = await service.getExtension().catch(() => null);
  const options = ext ? await new Extension(ext).load() : undefined;
  const { __BASE_PATH__ = '/' } = ext || {};
  const { provider, onReady } = createProvider({
    mode: ContextMode.Runtime,
    service,
    materialPath: __BASE_PATH__,
    ...(options || {}),
    dependencies: {
      Vue: () => import('vue'),
      VueRouter: () => import('vue-router'),
      ElementPlus: () => import('element-plus'),
      VtjIcons: () => import('@vtj/icons')
    }
  });
  const route = useRoute();
  const renderer = ref();
  const instance = getCurrentInstance();

  onReady(async () => {
    const app = instance?.appContext.app;
    if (app) {
      app.use(IconsPlugin);
      app.use(provider);
      new DevTools().setup(window, app, __BASE_PATH__);
    }

    renderer.value = await provider.getRenderComponent(
      route.params.id.toString()
    );
  });
</script>
