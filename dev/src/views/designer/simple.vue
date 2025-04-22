<template>
  <div ref="container"></div>
</template>
<script lang="ts" setup>
  import { ref, h } from 'vue';
  import { Engine, MemoryService, widgetManager } from '@vtj/pro';
  import { ElButton } from 'element-plus';

  // widgetManager.set('Templates', {
  //   component: {
  //     render() {
  //       return h('div', 'Text');
  //     }
  //   }
  // });

  // widgetManager.set('Templates', {
  //   invisible: true
  // });

  widgetManager.set('', {
    props: {
      icon: '/vite.svg'
    }
  });

  widgetManager.register({
    name: 'Test',
    region: 'Actions',
    component: {
      render() {
        return h(ElButton, { size: 'small' }, () => 'ButtonText');
      }
    }
  });

  const container = ref();
  const service = new MemoryService();
  const engine = new Engine({
    container,
    service,
    project: {
      id: 'test',
      name: '测试'
    }
  });

  engine.ready(() => {
    console.log('ready');
  });
</script>
