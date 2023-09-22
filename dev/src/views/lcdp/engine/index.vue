<template>
  <div ref="container" class="container"></div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Engine, EVENT_ACTION_PREVIEW } from '@vtj/engine';
  const container = ref<HTMLElement | undefined>();

  const engine = new Engine(container, {
    config: {
      widgets: [
        {
          name: 'actions',
          props: {
            coder: true
          }
        }
      ]
    },
    project: {
      id: '3333',
      name: '我的测试项目'
    }
  });

  engine.emitter.on(EVENT_ACTION_PREVIEW, (file) => {
    alert(JSON.stringify(file));
  });

  console.log('[engine]', engine);
</script>

<style lang="scss" setup>
  .container {
    height: 100%;
    width: 100%;
    border: 1px solid #ccc;
  }
</style>
