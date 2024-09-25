<template>
  <component v-if="renderer" :is="renderer"></component>
</template>
<script lang="ts" setup>
  import { ref, getCurrentInstance } from 'vue';
  import { useRoute } from 'vue-router';
  import { createProvider, StorageService, ContextMode } from '@vtj/web';
  const service = new StorageService();

  const { provider, onReady } = createProvider({
    mode: ContextMode.Runtime,
    service,
    project: {
      id: 'materials',
      name: 'Materials'
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

  console.log('provider', provider);
  onReady(async () => {
    instance?.appContext.app.use(provider);
    if (route.query?.id) {
      renderer.value = await provider.getRenderComponent(
        route.query.id as string
      );
      console.log('renderer.value ', renderer.value, route.query.id);
    }
  });
</script>
