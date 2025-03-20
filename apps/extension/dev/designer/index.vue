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
    type BlockFile
  } from '@vtj/pro';
  import { notify, loading, Startup } from '@vtj/web';
  import { useTitle } from '@vueuse/core';
  import { ElMessageBox } from 'element-plus';
  import { project, outputLibrary, library } from '../../vtj.config';
  import { default as extensionFactory } from '../../src/index';

  const engineOptions = extensionFactory({
    extension: {
      urls: outputLibrary,
      library
    }
  });

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

  const container = ref();
  const service = new StorageService();
  const adapter = createAdapter({ loading, notify, Startup, useTitle });
  const engine = new Engine({
    container,
    service,
    adapter,
    project,
    ...engineOptions
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
