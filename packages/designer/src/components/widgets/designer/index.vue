<template>
  <div ref="container" class="v-designer">
    <Viewport :mode="mode" :width="width" :height="height" :customSize="customSize">
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
          @action="onAction"
          @dragstart="onDragStart"
          @dragend="onDragEnd"></Actions>
      </div>
      <ElEmpty v-if="!current" description="请新建或打开文件"></ElEmpty>

      <div
        class="v-designer__outline-lines"
        v-if="outlineEnabled && lines.length">
        <div v-for="line in lines" :style="line"></div>
      </div>

      <div v-if="current && isEmpty" class="v-designer__placeholder">
        您可以拖拽组件放置到这里
      </div>
      <iframe ref="iframe" frameborder="0"></iframe>
    </Viewport>
  </div>
</template>
<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { useElementSize } from '@vueuse/core';
  import { NodeModel } from '@vtj/core';
  import { ElEmpty } from 'element-plus';
  import Actions from './actions.vue';
  import { Viewport } from '../../shared';
  import { useDeps, useDesigner, useCurrent } from '../../hooks';

  const container = ref();
  const iframe = ref<HTMLIFrameElement>();
  const { width, height } = useElementSize(container);
  const { dependencies, engine, apis, meta } = useDeps();
  const { current, isEmpty } = useCurrent();

  const mode = computed(() => {
    const widget = engine.skeleton?.getWidget('Toolbar');
    return widget?.widgetRef.mode ?? 'pc';
  });

  const customSize = computed(() => {
    const widget = engine.skeleton?.getWidget('Toolbar');
    return widget?.widgetRef.customSize as {width:number,height:number};
  });

  

  const outlineEnabled = computed(() => {
    const widget = engine.skeleton?.getWidget('Toolbar');
    return !!widget?.widgetRef.outline;
  });

  const config = computed(() => engine.project.value?.config || {});
  const uniConfig = computed(() => engine.project.value?.uniConfig || {});

  const { designer, hover, dropping, selected, lines } = useDesigner(
    iframe,
    dependencies,
    apis,
    meta,
    config,
    uniConfig
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

  const onDragStart = (model: any) => {
    if (model && designer.value) {
      const desc = engine.assets.componentMap.get(model.name);
      if (desc) {
        designer.value.setDragging(desc);
      }
      designer.value.setDraggingNode(model);
    }
  };

  const onDragEnd = () => {
    if (designer.value) {
      designer.value.setDraggingNode(null);
      designer.value.setDragging(null);
    }
  };

  watch(outlineEnabled, (v) => {
    if (designer.value) {
      designer.value.outlineEnabled.value = v;
    }
  });

  defineExpose({
    designer,
    mode
  });

  defineOptions({
    name: 'VDesigner',
    inheritAttrs: false
  });
</script>
