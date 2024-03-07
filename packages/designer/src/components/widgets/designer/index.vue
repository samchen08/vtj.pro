<template>
  <div ref="container" class="v-designer">
    <Viewport :mode="mode" :width="width" :height="height">
      <iframe ref="iframe" frameborder="0"></iframe>
      <div
        v-if="dropping"
        class="v-designer__dropping"
        :class="`is-inner`"
        :style="dropping.style"></div>

      <div v-if="hover" class="v-designer__hover" :style="hover.style">
        <span :class="`is-${hover.position}`">
          {{ hover.model.name }}:
          <i>{{ hover.model.id }}</i>
        </span>
      </div>

      <div v-if="selected" class="v-designer__selected" :style="selected.style">
        <Actions
          :position="selected.position"
          :model="selected.model"
          :path="selected.path"
          @action="onAction"></Actions>
      </div>
    </Viewport>
    <ElEmpty v-if="!current" description="请新建或打开文件"></ElEmpty>

    <div v-if="current && isEmpty" class="v-designer__placeholder">
      您可以拖拽组件放置到这里
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { useElementSize } from '@vueuse/core';
  import type { NodeModel } from '@vtj/core';
  import { ElEmpty } from 'element-plus';
  import Actions from './actions.vue';
  import { Viewport } from '../../shared';
  import { useDeps, useDesigner, useCurrent } from '../../hooks';

  const container = ref();
  const iframe = ref<HTMLIFrameElement>();
  const { width, height } = useElementSize(container);
  const { dependencies, engine, apis } = useDeps();
  const { current, isEmpty } = useCurrent();

  const mode = computed(() => {
    const widget = engine.skeleton?.getWidget('Toolbar');
    return widget?.widgetRef.mode ?? 'pc';
  });

  const { designer, hover, dropping, selected } = useDesigner(
    iframe,
    dependencies,
    apis
  );

  const onAction = (e: any) => {
    const type = e.type as string;
    const model = e.model as NodeModel;
    if (!current.value) return;
    switch (type) {
      case 'remove':
        current.value.removeNode(model);
        designer.value?.setSelected(null);

        break;
      case 'copy':
        const node = current.value.cloneNode(model);
        designer.value?.setSelected(node);
        break;
      case 'prev':
        current.value.movePrev(model);
        designer.value?.setSelected(model);
        break;
      case 'next':
        current.value.moveNext(model);
        designer.value?.setSelected(model);
        break;
      case 'hover':
        designer.value?.setHover(model);
        break;
      case 'selected':
        designer.value?.setSelected(model);
        break;
    }
  };

  defineExpose({
    designer,
    mode
  });

  defineOptions({
    name: 'VDesigner',
    inheritAttrs: false
  });
</script>
