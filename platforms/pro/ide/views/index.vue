<template>
  <div class="designer" ref="container"></div>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useTitle } from '@vueuse/core';
  import { delay } from '@vtj/utils';
  import {
    Engine,
    widgetManager,
    LocalService,
    ProjectModel,
    Extension,
    createAdapter,
    createServiceRequest,
    createAccess,
    type VTJConfig
  } from '../../src';
  import { notify, loading, alert } from '../utils';

  const route = useRoute();
  const container = ref();
  const service = new LocalService(createServiceRequest(notify));
  const config: VTJConfig =
    (await service.getExtension().catch(() => null)) || {};
  const options = config ? await new Extension(config).load() : {};
  const {
    __BASE_PATH__ = '/',
    history = 'hash',
    base = '/',
    remote,
    auth,
    checkVersion = true,
    enhance,
    platform = 'web'
  } = config || {};

  const adapter = createAdapter({
    loading,
    notify,
    useTitle,
    alert,
    access: config?.access,
    settings: {
      proxyPath: `${remote}/api/proxy`
    }
  });
  const __ACCESS__ = createAccess({
    alert,
    ...config?.__ACCESS__
  });

  const isHashRouter = () => history === 'hash';

  widgetManager.set('Actions', {
    props: {
      cloudPublish: true
    }
  });

  widgetManager.set('Switcher', {
    props: {
      onClick: (project: ProjectModel) => {
        const pathname = location.pathname;
        let url =
          pathname === `${__BASE_PATH__}__vtj__/` ? __BASE_PATH__ : pathname;
        const file = project.currentFile;

        if (file && file.type === 'page' && project.homepage !== file.id) {
          const route = project
            .getPageRoutes(
              engine.options.pageRouteName,
              engine.options.pageBasePath
            )
            .find((item) => item.id === file.id);
          if (route) {
            url = isHashRouter()
              ? `${url}#${route.path}`
              : `${url.replace(/\/$/, '')}${route.path}`;
          }
        } else {
          if (file && project.homepage === file.id) {
            url = `${url}#/`;
          } else {
            url = file ? `${url}__vtj__/#/preview/${file?.id}` : url;
          }
        }
        window.open(url, 'VTJProject');
      }
    }
  });

  widgetManager.set('Previewer', {
    props: {
      path: (block: any, project: ProjectModel) => {
        const pathname = location.pathname;
        if (project.platform === 'uniapp') {
          const host =
            process.env.NODE_ENV === 'production'
              ? ''
              : 'http://localhost:8010';
          const route = project
            .getPageRoutes(
              engine.options.pageRouteName,
              engine.options.pageBasePath
            )
            .find((item) => item.id === block.id);
          return `${host}${pathname}uni/#${route?.path || `/pages/${block.id}`}`;
        }
        return `${pathname}#/preview/${block.id}`;
      }
    }
  });

  const engine = new Engine({
    container,
    service,
    materialPath: __BASE_PATH__,
    pageBasePath: base === '/' ? '' : base,
    adapter,
    access: __ACCESS__,
    remote,
    auth,
    checkVersion,
    enhance,
    project: {
      platform
    },
    ...options
  });

  engine.ready(async () => {
    await delay(300);
    engine.openFile(route.query.id as string);
  });

  watch(
    () => route.query.id,
    async (id) => {
      await delay(300);
      engine.openFile(id as string);
    }
  );
</script>
<style lang="scss" scoped>
  .designer {
    width: 100%;
    height: 100%;
  }
</style>
