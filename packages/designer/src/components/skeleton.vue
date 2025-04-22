<template>
  <ElConfigProvider :locale="zhCn">
    <el-container class="v-skeleton">
      <el-header class="v-skeleton__header" :height="headerHeight">
        <RegionWrapper ref="brand" region="Brand"></RegionWrapper>
        <RegionWrapper
          ref="toolbar"
          region="Toolbar"
          :preview="isPreview"></RegionWrapper>
        <RegionWrapper ref="actions" region="Actions"></RegionWrapper>
      </el-header>
      <el-container class="v-skeleton__wrapper">
        <el-aside
          v-if="!isPreview"
          v-resizable="leftResizable"
          :width="props.leftWidth"
          class="v-skeleton__left"
          :class="{
            'is-collapsed': collapsed
          }">
          <RegionWrapper ref="apps" region="Apps"></RegionWrapper>
        </el-aside>
        <el-main class="v-skeleton__main">
          <RegionWrapper
            v-if="isPreview"
            ref="preview"
            region="Preview"
            :preview="isPreview"></RegionWrapper>
          <RegionWrapper
            v-show="!isPreview"
            ref="workspace"
            region="Workspace"></RegionWrapper>
        </el-main>
        <el-aside
          v-if="!isPreview"
          v-show="settable"
          v-resizable="rightResizable"
          :width="props.rightWidth"
          class="v-skeleton__right">
          <RegionWrapper ref="settings" region="Settings"></RegionWrapper>
        </el-aside>
      </el-container>
      <el-footer
        v-if="!isPreview"
        class="v-skeleton__footer"
        :height="footerHeight">
        <RegionWrapper ref="status" region="Status"></RegionWrapper>
      </el-footer>
    </el-container>
  </ElConfigProvider>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import {
    ElContainer,
    ElHeader,
    ElAside,
    ElMain,
    ElFooter,
    ElConfigProvider
  } from 'element-plus';
  import zhCn from 'element-plus/es/locale/lang/zh-cn';
  import { vResizable, type ResizableOptions } from '@vtj/ui';
  import { RegionWrapper } from '../wrappers';
  import { useCheckVersion, useOpenApi } from './hooks';
  import { notify } from '../utils';

  export interface Props {
    headerHeight?: string;
    leftWidth?: string;
    rightWidth?: string;
    footerHeight?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    headerHeight: '36px',
    leftWidth: '400px',
    rightWidth: '350px',
    footerHeight: '20px'
  });
  const { engine, loginBySign, isLogined } = useOpenApi();

  const isPreview = ref(false);
  const leftWidth = ref(parseInt(props.leftWidth));
  const rightWidth = ref(parseInt(props.rightWidth));

  const checkVersion = () => {
    if (engine.checkVersion) {
      useCheckVersion((version) => {
        notify(
          `VTJ 发布了版本 ${version}，您可以通过重新安装依赖更新到最新版本`,
          '版本更新'
        );
      });
    }
  };

  const leftResizable: ResizableOptions = {
    dirs: ['e'],
    maxWidth: 600,
    minWidth: 49,
    onResizing(_dir, mie) {
      leftWidth.value = mie.elementWidth.value;
    },
    onEnd(_dir, mie) {
      leftWidth.value = mie.elementWidth.value;
    }
  };

  const rightResizable: ResizableOptions = {
    dirs: ['w'],
    maxWidth: 600,
    minWidth: 2,
    onResizing(_dir, mie) {
      rightWidth.value = mie.elementWidth.value;
    },
    onEnd(_dir, mie) {
      rightWidth.value = mie.elementWidth.value;
    }
  };

  const brand = ref();
  const toolbar = ref();
  const actions = ref();
  const apps = ref();
  const workspace = ref();
  const settings = ref();
  const status = ref();
  const preview = ref();
  const collapsed = ref(false);
  const settable = ref(false);

  const init = async () => {
    const logined = await isLogined();
    if (!logined) {
      await loginBySign();
    }
    checkVersion();
  };

  onMounted(init);

  defineOptions({
    name: 'Skeletion'
  });

  defineExpose({
    brand,
    toolbar,
    actions,
    apps,
    workspace,
    settings,
    status,
    collapsed,
    settable,
    leftWidth,
    rightWidth,
    preview,
    isPreview
  });
</script>
