<template>
  <XAction
    label="开发工具"
    mode="text"
    size="small"
    :icon="VtjIconDevTools"
    @click="onClick">
  </XAction>
  <XDialog
    v-if="visible"
    ref="dialogRef"
    title="开发工具"
    subtitle="DevTools"
    :class="`v-devtools--${position}`"
    :src="devtoolsPath"
    width="50%"
    height="60%"
    maximizable
    :resizable="!position"
    :z-index="3000"
    v-model="visible"
    :modal="false"
    @open="setupDevtools"
    @close="destoryDevtools">
    <template #actions>
      <XAction
        :icon="VtjIconLeftPanel"
        mode="icon"
        type="primary"
        title="靠左"
        :background="position === 'left' ? 'always' : 'hover'"
        @click="setPosition('left')"></XAction>
      <XAction
        :icon="VtjIconBottomPanel"
        mode="icon"
        type="primary"
        title="靠底"
        :background="position === 'bottom' ? 'always' : 'hover'"
        @click="setPosition('bottom')"></XAction>
      <XAction
        :icon="VtjIconRightPanel"
        mode="icon"
        type="primary"
        title="靠右"
        :background="position === 'right' ? 'always' : 'hover'"
        @click="setPosition('right')"></XAction>
      <ElDivider direction="vertical"></ElDivider>
    </template>
  </XDialog>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { ElDivider } from 'element-plus';
  import { XAction, XDialog } from '@vtj/ui';
  import {
    VtjIconDevTools,
    VtjIconLeftPanel,
    VtjIconRightPanel,
    VtjIconBottomPanel
  } from '@vtj/icons';
  import { useDevtools } from '../../hooks';

  defineOptions({
    name: 'DevtoolsWidget',
    inheritAttrs: false
  });

  const { dialogRef, setupDevtools, destoryDevtools, visible, engine } =
    useDevtools();

  const position = ref('');

  const onClick = () => {
    visible.value = true;
  };

  const setPosition = (type: string) => {
    if (position.value === type) {
      position.value = '';
    } else {
      position.value = type;
    }
  };

  const devtoolsPath = computed(
    () => engine.options.devtools || '__devtools__/index.html'
  );

  defineExpose({
    visible
  });
</script>

<style lang="scss">
  .v-devtools--left {
    left: 0 !important;
    top: 0 !important;
    width: 400px !important;
    height: 100% !important;
  }
  .v-devtools--right {
    left: unset !important;
    right: 0 !important;
    top: 0 !important;
    width: 350px !important;
    height: 100% !important;
  }

  .v-devtools--bottom {
    top: unset !important;
    left: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    height: 350px !important;
  }
</style>
