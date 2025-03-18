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
    createAdapter,
    createServiceRequest,
    setupPageSetting
  } from '../../src';
  import { IconsPlugin } from '@vtj/icons';
  import { useTitle } from '@vueuse/core';
  import { notify, loading, alert } from '../utils';

  const service = new LocalService(createServiceRequest(notify));
  const config = await service.getExtension().catch(() => null);
  const adapter = createAdapter({
    loading,
    notify,
    useTitle,
    alert,
    access: config?.access
  });
  const options = config ? await new Extension(config).load() : {};
  const { __BASE_PATH__ = '/' } = config || {};
  const { provider, onReady } = createProvider({
    mode: ContextMode.Runtime,
    service,
    materialPath: __BASE_PATH__,
    adapter: {
      ...adapter,
      ...options.adapter
    },
    dependencies: {
      Vue: () => import('vue'),
      VueRouter: () => import('vue-router')
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
      renderer.value = await provider.getRenderComponent(
        route.params.id.toString(),
        (file: any) => {
          setupPageSetting(app, route, file);
        }
      );
    }
  });
</script>
