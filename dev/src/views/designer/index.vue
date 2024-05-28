<template>
  <div class="designer" ref="container"></div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Engine, widgetManager, StorageService, Extension } from '@vtj/pro';

  const extension = new Extension({
    urls: ['/extension/@newpearl__extension.css', '/extension/index.umd.js'],
    library: 'VtjExtension'
  });

  const options = await extension.load();

  widgetManager.set('Switcher', {
    props: {
      onClick: (project: any) => {
        console.log('Switcher clicked', project);
      }
    }
  });

  const container = ref();
  const engine = new Engine({
    container,
    service: new StorageService(),
    project: {
      id: 'demo',
      name: 'dev-project',
      apis: [
        {
          id: '1',
          label: '测试api',
          name: 'testApi',
          url: '/api/test'
        }
      ],
      meta: [
        {
          id: 'feedBack',
          title: '意见反馈',
          code: 'feedBack',
          queryCode: 'd5c37cae-9748-454a-8ca7-f31af60bda42'
        }
      ]
    },
    ...options
  });
  console.log('engine', engine);
</script>
<style lang="scss" scoped>
  .designer {
    width: 100%;
    height: 100%;
    // border: 1px solid var(--el-border-color);
  }
</style>
