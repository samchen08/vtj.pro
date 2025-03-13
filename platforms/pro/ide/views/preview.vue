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
    Access,
    createAdapter,
    createServiceRequest,
    setupPageSetting
  } from '../../src';
  import { ACCESS_STORAGE_KEY } from '../contants';
  import { IconsPlugin } from '@vtj/icons';
  import { ElMessageBox } from 'element-plus';
  import { notify, loading } from '../utils';
  const adapter = createAdapter({ loading, notify });
  const service = new LocalService(createServiceRequest(notify));
  const config = await service.getExtension().catch(() => null);
  const { options, adapters } = config
    ? await new Extension(config).load()
    : {};
  const { __BASE_PATH__ = '/' } = config || {};
  const accessOptions = adapters?.access;
  const remote = adapters?.remote;
  const access = accessOptions
    ? new Access({
        alert: ElMessageBox.alert,
        storageKey: ACCESS_STORAGE_KEY,
        ...accessOptions
      })
    : undefined;
  const { provider, onReady } = createProvider({
    mode: ContextMode.Runtime,
    service,
    materialPath: __BASE_PATH__,
    ...(options || {}),
    adapter: Object.assign(adapter, { access, remote }, options?.adapter || {}),
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
