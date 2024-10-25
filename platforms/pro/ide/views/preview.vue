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
    Access
  } from '../../src';
  import { IconsPlugin } from '@vtj/icons';
  import { ElMessageBox } from 'element-plus';
  const service = new LocalService();
  const config = await service.getExtension().catch(() => null);
  const { options, adapters } = config
    ? await new Extension(config).load()
    : {};
  const { __BASE_PATH__ = '/' } = config || {};
  const accessOptions = adapters?.access;
  const access = accessOptions
    ? new Access({
        ...accessOptions,
        alert: ElMessageBox.alert
      })
    : undefined;
  const { provider, onReady } = createProvider({
    mode: ContextMode.Runtime,
    service,
    materialPath: __BASE_PATH__,
    adapter: { access },
    ...(options || {}),
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
    }

    renderer.value = await provider.getRenderComponent(
      route.params.id.toString()
    );
  });
</script>
