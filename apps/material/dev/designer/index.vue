<template>
  <div class="designer" ref="container"></div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    Engine,
    StorageService,
    createAdapter,
    widgetManager,
    depsManager,
    type BlockFile
  } from '@vtj/pro';
  import { notify, loading, Startup } from '@vtj/web';
  import { useTitle } from '@vueuse/core';
  import {
    project,
    name,
    version,
    library,
    material,
    outputLibrary,
    outputMaterial
  } from '../../vtj.config';

  widgetManager.set('Previewer', {
    props: {
      path(file: BlockFile) {
        return `/#/preview/${file.id}`;
      }
    }
  });

  widgetManager.set('Switcher', {
    props: {
      onClick() {
        location.href = '/#/';
      }
    }
  });

  depsManager.add({
    package: name,
    platform: project.platform,
    version,
    library,
    urls: outputLibrary,
    assetsUrl: outputMaterial,
    assetsLibrary: material,
    enabled: true
  });

  const container = ref();
  const service = new StorageService();
  const adapter = createAdapter({ loading, notify, Startup, useTitle });
  const engine = new Engine({
    container,
    service,
    adapter,
    project,
    materials: {
      [material]: () => import('../../src/material/index')
    }
  });

  engine.ready(() => {
    console.log('ready');
  });
</script>

<style lang="scss" scoped>
  .designer {
    height: 100%;
  }
</style>
