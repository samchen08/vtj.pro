<template>
  <div class="designer" ref="container"></div>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useTitle } from '@vueuse/core';
  import {
    Engine,
    widgetManager,
    LocalService,
    ProjectModel,
    Extension,
    createAdapter,
    createServiceRequest,
    createAccess
  } from '../../src';
  import { notify, loading, alert } from '../utils';

  const route = useRoute();
  const container = ref();
  const service = new LocalService(createServiceRequest(notify));
  const config = await service.getExtension().catch(() => null);
  const adapter = createAdapter({
    loading,
    notify,
    useTitle,
    alert,
    access: config?.access
  });
  const __ACCESS__ = createAccess({
    alert,
    ...config?.__ACCESS__
  });
  const options = config ? await new Extension(config).load() : {};
  const {
    __BASE_PATH__ = '/',
    history = 'hash',
    base = '/',
    pageRouteName = 'page',
    remote,
    auth,
    checkVersion = true
  } = config || {};

  const isHashRouter = () => history === 'hash';

  const fillPrefix = (path: string) => {
    if (path === '/') return '';
    if (path.startsWith('/')) {
      path = path.substring(1);
    }
    if (!path.endsWith('/')) {
      path = path + '/';
    }

    return path;
  };

  widgetManager.set('Switcher', {
    props: {
      onClick: (project: ProjectModel) => {
        const isUniapp = project.platform === 'uniapp';
        const pathname = location.pathname;
        let url =
          pathname === `${__BASE_PATH__}__vtj__/` ? __BASE_PATH__ : pathname;
        const file = project.currentFile;
        if (file && file.type === 'page' && project.homepage !== file.id) {
          const pagePath = `${fillPrefix(base)}${isUniapp ? 'pages' : pageRouteName}/${file.id}`;
          url = isHashRouter() ? `${url}#/${pagePath}` : `${url}${pagePath}`;
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
          return `${host}${pathname}uni/#/pages/${block.id}`;
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
    ...options
  });

  engine.ready(() => {
    engine.openFile(route.query.id as string);
  });

  watch(
    () => route.query.id,
    (id) => {
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
