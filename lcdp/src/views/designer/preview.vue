<template>
  <component v-if="renderer" :is="renderer"></component>
</template>
<script lang="ts" setup>
  import { ref, getCurrentInstance } from 'vue';
  import { useRoute } from 'vue-router';
  import { createProvider, ContextMode } from '@vtj/pro';
  import { MATERIAL_PATH, PROJECT_NAME, PROJECT_ID } from '@/contants';
  import { LcdpService } from '@/service/lcdp';
  const service = new LcdpService();
  const { provider, onReady } = createProvider({
    materialPath: MATERIAL_PATH,
    mode: ContextMode.Runtime,
    service,
    project: {
      id: PROJECT_ID,
      name: PROJECT_NAME
    },
    dependencies: {
      Vue: () => import('vue'),
      VueRouter: () => import('vue-router'),
      ElementPlus: () => import('element-plus')
    }
  });
  const route = useRoute();
  const renderer = ref();
  const instance = getCurrentInstance();

  onReady(async () => {
    instance?.appContext.app.use(provider);
    renderer.value = await provider.getRenderComponent(
      route.params.id.toString()
    );
  });
</script>
