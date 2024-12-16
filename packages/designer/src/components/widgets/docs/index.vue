<template>
  <Panel
    class="v-docs-widget"
    size="small"
    fit
    :body="{ padding: false }"
    :header="false"
    ref="panel">
    <iframe :key="key" ref="frame" :src="url" @load="onLoad"></iframe>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue';
  import { ElLoading } from 'element-plus';
  import { Panel } from '../../shared';
  export interface Props {
    url?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    url: '//vtj.pro/help/index.html'
  });

  const url = ref<string>(props.url);

  const panel = ref();
  let loading: any = null;
  const key = ref(Symbol());

  watch(
    () => props.url,
    (v) => {
      url.value = v;
    }
  );

  const refresh = () => {
    key.value = Symbol();
  };

  const reload = () => {
    url.value = '//vtj.pro/help/index.html';
    refresh();
  };

  onMounted(() => {
    if (!loading) {
      loading = ElLoading.service({ target: panel.value?.$el });
    }
  });

  onUnmounted(() => {
    onLoad();
    loading = null;
  });

  const onLoad = () => {
    loading?.close();
  };

  defineOptions({
    name: 'DocsWidget'
  });

  defineExpose({ refresh, reload });
</script>
