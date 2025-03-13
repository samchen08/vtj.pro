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
  import { ElMessageBox } from 'element-plus';
  import { project } from '../../vtj.config';

  const route = useRoute();
  const renderer = ref();
  const instance = getCurrentInstance();
  const service = new StorageService();
  const adapter = createAdapter({
    access: {
      alert: ElMessageBox.alert
    }
  });

  const { provider, onReady } = createProvider({
    mode: ContextMode.Runtime,
    service,
    adapter,
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
