<template>
  <div class="vtj-ide">
    <div ref="container" class="container"></div>
    <Dialog
      v-model="tipDialogVisible"
      title="温馨提示"
      width="500px"
      height="180px">
      <ElAlert
        title="当前设计器是Storage模式，不支持出码功能"
        type="warning"
        :closable="false"
        description="可以使用以下命令下载完整版本体验" />
      <ElAlert
        class="npm-command"
        :closable="false"
        type="info"
        title="npm create vtj -- -t web" />
    </Dialog>
    <Dialog
      v-model="coderDialogVisible"
      title="出码结果"
      width="800px"
      height="400px">
      <ElSkeleton :rows="3" animated :loading="coderLoading">
        <ElAlert
          :closable="false"
          type="success"
          :title="`输出文件数: ${coderResults.length}`" />
        <div class="file-list">
          <div v-for="n in coderResults">{{ n }}</div>
        </div>
      </ElSkeleton>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
  import { ref, Ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import {
    Engine,
    EVENT_ACTION_PREVIEW,
    EVENT_ACTION_HOME,
    EVENT_ACTION_CODER,
    PageSchema,
    SummarySchema,
    FileService,
    StorageService,
    Dialog
  } from '@vtj/engine';
  import { useProvider, isPage } from '@vtj/runtime';
  import { ElMessage, ElAlert, ElSkeleton } from 'element-plus';
  import { ideBase } from '@/api';
  const tipDialogVisible = ref(false);
  const coderDialogVisible = ref(false);
  const coderResults = ref<string[]>([]);
  const coderLoading = ref(false);
  const container = ref<HTMLElement | undefined>();
  const provider = useProvider();
  const { project, options } = provider || {};
  const {
    id = 'ide',
    name = 'IDE',
    base = '/',
    mode = 'hash',
    page = '/page',
    preview = '/preview',
    home = '/'
  } = project || {};
  const { raw, service } = options;

  const engine = new Engine(container, {
    service: service === 'file' ? new FileService() : new StorageService(),
    config: {
      widgets: [
        {
          name: 'switcher',
          props: {
            link: `/#${home}`
          }
        },
        {
          name: 'actions',
          props: {
            coder: raw
          }
        }
      ]
    },
    project: {
      id,
      name
    },
    globals: {
      $route: useRoute(),
      $router: useRouter(),
      $provider: provider
    }
  });

  engine.emitter.on(
    EVENT_ACTION_PREVIEW,
    (file: PageSchema | SummarySchema) => {
      const split = mode === 'hash' ? '#' : '';
      let url = '';
      if (isPage(file)) {
        url = raw
          ? `${base}${split}${preview}/${(file as SummarySchema).id}`
          : `${base}${split}${page}/${(file as SummarySchema).id}`;
      } else {
        url = `${base}${split}${preview}/${(file as SummarySchema).id}`;
      }

      window.open(url);
    }
  );

  engine.emitter.on(EVENT_ACTION_HOME, (file: PageSchema) => {
    const split = mode === 'hash' ? '#' : '';
    const url = `${base}${split}${home}`;
    window.open(url);
  });

  engine.emitter.on(EVENT_ACTION_CODER, async (loading: Ref<boolean>) => {
    if (service === 'storage') {
      loading.value = false;
      tipDialogVisible.value = true;
      return;
    }
    coderDialogVisible.value = true;
    coderLoading.value = true;
    coderResults.value = [];
    const dsl = engine.project.toDsl();
    const componentMap = engine.assets.componentMap;
    coderResults.value = await ideBase({
      type: 'projectCoder',
      data: {
        project: dsl,
        assets: {
          componentMap
        }
      }
    })
      .then((res) => {
        ElMessage.success({
          message: '出码完成'
        });
        return res;
      })
      .catch((e) => {
        ElMessage.error({
          message: '出码失败'
        });
        return [];
      })
      .finally(() => {
        loading.value = false;
      });
    coderLoading.value = false;
  });

  // console.log('[engine]', engine);
</script>

<style lang="scss" scoped>
  .vtj-ide,
  .container {
    height: 100%;
    width: 100%;
  }
  .npm-command {
    margin-top: 20px;
  }
  .file-list {
    padding: 10px 20px;
    line-height: 1.8em;
    font-size: 14px;
  }
</style>
