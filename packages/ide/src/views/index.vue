<template>
  <div class="vtj-ide">
    <div ref="container" class="container"></div>
    <Dialog
      v-model="tipDialogVisible"
      title="温馨提示"
      width="500px"
      height="180px">
      <ElAlert
        title="当前设计器是非源码模式，不支持出码功能"
        type="warning"
        :closable="false"
        description="可以使用以下命令下载完整版本体验" />
      <ElAlert
        class="npm-command"
        :closable="false"
        type="info"
        title="npm create vtj@latest -- -t web" />
    </Dialog>
    <Dialog
      v-model="coderDialogVisible"
      title="出码结果"
      width="800px"
      height="400px">
      <ElSkeleton :rows="3" animated :loading="coderLoading">
        <ElAlert
          v-if="!coderError"
          :closable="false"
          type="success"
          :title="`输出文件数: ${coderResults.length}`" />
        <div class="file-list">
          <div v-for="n in coderResults">{{ n }}</div>
        </div>

        <div v-if="coderError">
          <ElAlert
            :closable="false"
            type="error"
            title="出码失败"
            :description="coderError.msg" />
          <div class="error-tip">
            错误日志已保存. 这可能是系统的bug。您可以把日志提交给作者协助解决。
          </div>
        </div>
      </ElSkeleton>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
  import { ref, Ref, inject } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import {
    Engine,
    EVENT_ACTION_PREVIEW,
    EVENT_ACTION_HOME,
    EVENT_ACTION_CODER,
    EVENT_ACTION_COPY,
    PageSchema,
    SummarySchema,
    FileService,
    StorageService,
    Dialog
  } from '@vtj/engine';
  import { isPage, useProvider } from '@vtj/runtime';
  import { ElAlert, ElSkeleton, ElMessage } from 'element-plus';
  import { ideBase } from '@/api';
  import { delay } from '@vtj/utils';
  import { useReloadStorage } from '../hooks';

  const isExample = process.env.ENV_TYPE === 'uat';
  const isIde = process.env.ENV_TYPE === 'live';
  const isDev = process.env.NODE_ENV === 'development';

  const tipDialogVisible = ref(false);
  const coderDialogVisible = ref(false);
  const coderResults = ref<string[]>([]);
  const coderError = ref<any>(null);
  const coderLoading = ref(false);
  const container = ref<HTMLElement | undefined>();
  const provider = useProvider();

  const {
    project,
    raw = false,
    service = 'storage',
    debug
  } = provider?.options || {};

  const {
    id = 'ide',
    name = 'IDE',
    base = '/',
    mode = 'hash',
    page = '/page',
    preview = '/preview',
    home = '/'
  } = project || {};

  const getPorjectHomePath = () => {
    const split = mode === 'hash' ? '#' : '';
    return `${base}${split}${home}`;
  };
  const engine = new Engine(container, {
    service: service === 'file' ? new FileService() : new StorageService(),
    config: {
      widgets: [
        {
          name: 'switcher',
          props: {
            link: getPorjectHomePath()
          }
        },
        {
          name: 'actions',
          props: {
            coder: isExample ? true : raw,
            copy: isIde && isDev
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
      $router: useRouter()
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
    if (service === 'storage' || !raw) {
      loading.value = false;
      tipDialogVisible.value = true;
      return;
    }
    coderDialogVisible.value = true;
    coderLoading.value = true;
    coderResults.value = [];
    coderError.value = null;
    const dsl = engine.project.toDsl();
    const componentMap = engine.assets.componentMap;
    const packages = engine.assets.packages;
    coderResults.value = await ideBase({
      type: 'projectCoder',
      data: {
        debug,
        project: dsl,
        assets: {
          componentMap,
          packages
        }
      }
    }).catch((e) => {
      coderError.value = e.data;
      console.log(e);
      return [];
    });
    coderLoading.value = false;
  });

  engine.emitter.on(EVENT_ACTION_COPY, async (loading: Ref<boolean>) => {
    loading.value = true;
    await ideBase({
      type: 'copyProject'
    });
    loading.value = false;
    await useReloadStorage(id);
    ElMessage.success({
      message: '复制项目样例完成, 正在重置设置器'
    });
    await delay(2000);
    location.reload();
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
  .error-tip {
    padding: 20px;
  }
</style>
