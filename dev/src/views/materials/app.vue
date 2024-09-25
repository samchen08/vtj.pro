<template>
  <div class="designer" ref="container"></div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Engine, widgetManager, StorageService } from '@vtj/pro';

  const container = ref();
  const service = new StorageService();
  const router = useRouter();

  // depsManager.remove('@vtj/ui');
  // depsManager.remove('ant-design-vue');

  new Engine({
    container,
    service,
    project: {
      id: 'materials',
      name: 'Materials'
    },
    materials: {
      ElementPlusMaterial: () => import('@vtj/materials/src/element'),
      VtjUIMaterial: () => import('@vtj/materials/src/ui'),
      AntdvMaterial: () => import('@vtj/materials/src/antdv'),
      VantMaterial: () => import('@vtj/materials/src/vant')
    }
  });

  widgetManager.set('Previewer', {
    props: {
      path: (block: any) => {
        const url = `/materials/preview?id=${block.id}`;
        router.push(url);
        return null;
      }
    }
  });
</script>
<style lang="scss" scoped>
  .designer {
    width: 100%;
    height: 100%;
  }
</style>
