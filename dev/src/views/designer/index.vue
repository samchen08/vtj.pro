<template>
  <div class="designer" ref="container"></div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Engine, widgetManager, MemoryService } from '@vtj/pro';

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
    service: new MemoryService(),
    project: {
      id: 'demo',
      name: 'dev-project'
    }
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
