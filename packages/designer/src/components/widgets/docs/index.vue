<template>
  <Panel
    class="v-docs-widget"
    size="small"
    fit
    :body="{ padding: false }"
    :header="false"
    ref="panel">
    <iframe :key="key" ref="frame" :src="props.url" @load="onLoad"></iframe>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { ElLoading } from 'element-plus';
  import { Panel } from '../../shared';
  export interface Props {
    url?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    url: '//vtj.pro/help/index.html'
  });

  const panel = ref();
  let loading: any = null;
  const key = ref(Symbol());

  const refresh = () => {
    key.value = Symbol();
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

  defineExpose({ refresh });
</script>
