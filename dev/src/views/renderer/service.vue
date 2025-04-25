<template>
  <div ref="container" class="container"></div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { MemoryService, Engine, type ProjectSchema } from '@vtj/pro';

  class CustomService extends MemoryService {
    async init(project: ProjectSchema) {
      return {
        ...project,
        name: '项目名称'
      };
    }
  }

  const container = ref();
  const engine = new Engine({
    container,
    service: new CustomService(),
    project: {
      id: 'my-project-id'
    }
  });

  engine.ready(() => {
    console.log('engine ready');
  });
</script>

<style lang="scss" scoped>
  .container {
    height: 100%;
  }
</style>
