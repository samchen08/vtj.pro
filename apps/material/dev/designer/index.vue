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
  import { ElMessageBox } from 'element-plus';
  import { project, name, version, library, material } from '../../vtj.config';

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
        location.href = '/#/view';
      }
    }
  });

  depsManager.add({
    package: name,
    platform: project.platform,
    version,
    library,
    urls: ['dist/style.css', 'dist/index.umd.js'],
    assetsUrl: 'dist/material.umd.js',
    assetsLibrary: material,
    enabled: true
  });

  const container = ref();
  const service = new StorageService();
  const adapter = createAdapter({
    access: {
      alert: ElMessageBox.alert
    }
  });
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
