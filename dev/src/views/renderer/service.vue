<template>
  <div ref="container" class="container"></div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    MemoryService,
    Engine,
    OpenApi,
    type ProjectSchema,
    type Settings
  } from '@vtj/pro';

  class CustomService extends MemoryService {
    async init(project: ProjectSchema) {
      return {
        ...project,
        name: '项目名称'
      };
    }
  }

  class CustomOpenApi implements OpenApi {
    async isLogined() {
      return true;
    }

    async getSettins() {
      return {
        mode: 1,
        invited: true
      } as any;
    }

    async getTopics(fileId: string) {
      console.log('getTopics', fileId);
      return [] as any;
    }
  }

  const container = ref();
  const engine = new Engine({
    container,
    service: new CustomService(),
    openApi: new CustomOpenApi(),
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
