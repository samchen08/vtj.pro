<template>
  <component v-if="renderer" :is="renderer"></component>
</template>
<script lang="ts" setup>
  import { ref, getCurrentInstance } from 'vue';
  import { useRoute } from 'vue-router';
  import {
    createProvider,
    ContextMode,
    StorageService,
    createAdapter,
    setupPageSetting
  } from '@vtj/pro';
  import { notify, loading, Startup } from '@vtj/web';
  import { useTitle } from '@vueuse/core';
  import { project, outputLibrary, library } from '../../vtj.config';
  import { default as extensionFactory } from '../../src/index';
  const engineOptions = extensionFactory({
    extension: {
      urls: outputLibrary,
      library
    }
  });

  const route = useRoute();
  const renderer = ref();
  const instance = getCurrentInstance();
  const service = new StorageService();

  const adapter = createAdapter({ loading, notify, Startup, useTitle });

  const { provider, onReady } = createProvider({
    mode: ContextMode.Runtime,
    service,
    adapter: {
      ...adapter,
      ...engineOptions.adapter
    },
    project,
    dependencies: {
      Vue: () => import('vue'),
      VueRouter: () => import('vue-router')
    }
  });

  onReady(async () => {
    const app = instance?.appContext.app;
    if (app) {
      app.use(provider);
      renderer.value = await provider.getRenderComponent(
        route.params.id.toString(),
        (file) => {
          setupPageSetting(app, route, file);
        }
      );
    }
  });
</script>
