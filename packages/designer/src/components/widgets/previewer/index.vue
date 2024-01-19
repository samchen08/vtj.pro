<template>
  <div ref="container" class="v-previewer" :key="key">
    <Viewport :mode="mode" :width="width" :height="height">
      <iframe v-if="src" ref="iframe" frameborder="0" :src="src"></iframe>
    </Viewport>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { type BlockModel } from '@vtj/core';
  import { useElementSize } from '@vueuse/core';
  import { Viewport } from '../../shared';
  import { useCurrent } from '../../hooks';
  export interface Props {
    path?: (block: BlockModel) => string;
  }

  const props = defineProps<Props>();

  const container = ref();
  const key = ref(Symbol());
  const { current, engine } = useCurrent();
  const { width, height } = useElementSize(container);

  const src = computed(() => {
    if (current.value) {
      return props.path ? props.path(current.value) : null;
    }
    return null;
  });

  const mode = computed(() => {
    const widget = engine.skeleton?.getWidget('Toolbar');
    return widget?.widgetRef.mode ?? 'pc';
  });

  const refresh = () => {
    key.value = Symbol();
  };

  defineOptions({
    name: 'PreviewerWidget'
  });

  defineExpose({
    refresh
  });
</script>
