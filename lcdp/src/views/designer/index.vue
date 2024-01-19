<template>
  <div class="designer" ref="container"></div>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { Engine, widgetManager, ProjectModel } from '@vtj/pro';
  import { MATERIAL_PATH, PROJECT_NAME, PROJECT_ID } from '@/contants';
  import { LcdpService } from '@/service/lcdp';

  const route = useRoute();
  const container = ref();
  const service = new LcdpService();

  widgetManager.set('Switcher', {
    props: {
      onClick: (project: ProjectModel) => {
        const pathname = location.pathname;
        let url = pathname.replace('/designer/', '/');
        const file = project.currentFile;
        if (file && file.type === 'page' && project.homepage !== file.id) {
          url = `${url}#/page/${file.id}`;
        }
        window.open(url, 'VTJProject');
      }
    }
  });

  widgetManager.set('Previewer', {
    props: {
      path: (block: any) => {
        const pathname = location.pathname;
        return `${pathname}#/preview/${block.id}`;
      }
    }
  });

  const engine = new Engine({
    materialPath: MATERIAL_PATH,
    container,
    service,
    project: {
      id: PROJECT_ID,
      name: PROJECT_NAME
    }
  });

  engine.ready(() => {
    engine.openFile(route.query.id as string);
  });

  watch(
    () => route.query.id,
    (id) => {
      engine.openFile(id as string);
    }
  );
</script>
<style lang="scss" scoped>
  .designer {
    width: 100%;
    height: 100%;
  }
</style>
