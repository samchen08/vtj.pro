<template>
  <component v-if="renderer" :is="renderer"></component>
</template>
<script lang="ts" setup>
  import { ref, getCurrentInstance, watch, type App } from 'vue';
  import { useRoute } from 'vue-router';
  import {
    createProvider,
    LocalService,
    ContextMode,
    Extension,
    ProjectModel,
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
  const {
    __BASE_PATH__ = '/',
    base = '/'
  } = config || {};
  const pageRouteName = options.pageRouteName || 'page';
  const pageBasePath =
    options.pageBasePath ?? (base === '/' ? '' : base);
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

  const matchRoutePath = (pattern: string, path: string) => {
    const patterns = pattern.split('/').filter(Boolean);
    const paths = path.split('/').filter(Boolean);
    return (
      patterns.length === paths.length &&
      patterns.every((item, index) => {
        return item.startsWith(':') || item === paths[index];
      })
    );
  };

  const getPageId = () => {
    const project = provider.project;
    const page = project
      ? new ProjectModel(project)
          .getPageRoutes(pageRouteName, pageBasePath)
          .find((item) => matchRoutePath(item.path, route.path))
      : undefined;
    return (
      page?.id ||
      (route.meta.__vtj__ as string) ||
      route.params.id?.toString()
    );
  };

  const setupPage = async (app: App) => {
    const pageId = getPageId();
    if (!pageId) {
      renderer.value = null;
      return;
    }
    renderer.value = await provider.getRenderComponent(
      pageId,
      (file: any) => {
        setupPageSetting(app, route, file);
      }
    );
  };

  onReady(async () => {
    const app = instance?.appContext.app;
    if (app) {
      app.use(IconsPlugin);
      app.use(provider);
      setupPage(app);
    }
  });

  watch(
    () => route.path,
    async () => {
      const app = instance?.appContext.app;
      if (!app) return;
      setupPage(app);
    }
  );
</script>
