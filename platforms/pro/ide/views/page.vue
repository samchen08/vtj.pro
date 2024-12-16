<template>
  <XMask>
    <component v-if="renderer" :is="renderer"></component>
  </XMask>
</template>
<script lang="ts" setup>
  import { ref, getCurrentInstance } from 'vue';
  import { useRoute } from 'vue-router';
  import { XMask } from '@vtj/ui';
  import { ACCESS_STORAGE_KEY } from '../contants';
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
  const remote = adapters?.remote;
  const access = accessOptions
    ? new Access({
        ...accessOptions,
        alert: ElMessageBox.alert,
        storageKey: ACCESS_STORAGE_KEY
      })
    : undefined;
  const { provider, onReady } = createProvider({
    mode: ContextMode.Runtime,
    service,
    materialPath: __BASE_PATH__,
    adapter: { access, remote },
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
      route.params.id.toString(),
      (file: any) => {
        Object.assign(route.meta, file.meta);
        const el = app?._container;
        if (file?.type === 'page') {
          el.classList.add('is-page');
        }
        const isPure = file?.pure;
        if (isPure) {
          el.classList.add('is-pure');
        }
      }
    );
  });
</script>
