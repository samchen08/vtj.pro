<template>
  <ElConfigProvider :locale="zhCn">
    <el-container class="vtj-layout">
      <el-header class="vtj-layout__header" height="36px">
        <Brand ref="brand"></Brand>
        <Toolbar ref="toolbar"></Toolbar>
        <Action ref="action"></Action>
      </el-header>
      <el-container class="vtj-layout__wrapper">
        <el-aside
          width="400px"
          ref="leftRef"
          class="vtj-layout__left"
          :class="{ 'e-resizing': leftResizing, 'is-collapsed': leftCollapsed }"
          :style="{ width: `${leftWidth || currentLeftWidth}px` }">
          <Apps ref="apps"></Apps>
        </el-aside>
        <el-main class="vtj-layout__main">
          <Workspace ref="workspace"></Workspace>
        </el-main>
        <el-aside
          v-if="showSetting"
          ref="rightRef"
          width="350px"
          class="vtj-layout__right"
          :class="{ 'w-resizing': rightResizing }"
          :style="{ width: `${rightWidth || 350}px` }">
          <Setting ref="setting"></Setting>
        </el-aside>
      </el-container>
      <el-footer class="vtj-layout__footer" height="20px">
        <Status ref="status"></Status>
      </el-footer>
    </el-container>
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue';
import {
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElFooter,
  ElConfigProvider
} from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { useResizable } from '@vtj/ui';
import {
  Action,
  Apps,
  Brand,
  Setting,
  Status,
  Toolbar,
  Workspace
} from './regions';
import {
  type Engine,
  ENGINE_KEY,
  emitter,
  EVENT_SKELETON_LEFT_COLLAPSED_CHANGE
} from '../core';

export interface Props {
  engine: Engine;
}

const props = defineProps<Props>();

const brand = ref();
const toolbar = ref();
const action = ref();
const status = ref();
const setting = ref();
const workspace = ref();
const apps = ref();
const leftRef = ref();
const rightRef = ref();
const leftCollapsed = ref(false);
const showSetting = ref(true);
let currentLeftWidth = 400;
props.engine.skeleton.regionInstances = {
  brand,
  toolbar,
  action,
  status,
  setting,
  workspace,
  apps
};

const { width: leftWidth, resizing: leftResizing } = useResizable(leftRef, {
  dirs: ['e'],
  maxWidth: 600
});

const { width: rightWidth, resizing: rightResizing } = useResizable(rightRef, {
  dirs: ['w'],
  maxWidth: 600
});

function setLeftCollapsed(collapsed: boolean) {
  if (collapsed) {
    currentLeftWidth = leftWidth.value;
  } else {
    leftWidth.value = currentLeftWidth;
  }
  leftCollapsed.value = collapsed;
}

emitter.on(EVENT_SKELETON_LEFT_COLLAPSED_CHANGE, (collasped) => {
  setLeftCollapsed(!collasped);
});

provide(ENGINE_KEY, props.engine);

defineExpose({
  setLeftCollapsed,
  showSetting
});
</script>

<style lang="scss">
@use '../style/vars' as *;

.vtj-layout {
  font-size: 14px;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__header {
    padding: 0 !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }

  &__main {
    border-left: 1px solid $vtj-border-color;
    border-right: 1px solid $vtj-border-color;
    padding: 0 !important;
  }

  &__wrapper {
    border-top: 1px solid $vtj-border-color;
    border-bottom: 1px solid $vtj-border-color;
  }

  &__footer {
    padding: 0 !important;
    font-size: 12px;
  }
  &__left {
    &.e-resizing {
      border-right: 2px solid $vtj-primary-color;
      .vtj-panel__body {
        overflow: hidden;
      }
    }
    &.is-collapsed {
      width: 49px !important;
      overflow: hidden;
    }
    &.is-cursor {
      .vtj-panel__body {
        overflow: hidden;
      }
    }
  }
  &__right {
    &.w-resizing {
      border-left: 2px solid $vtj-primary-color;
      .vtj-panel__body {
        overflow: hidden;
      }
    }
    &.is-cursor {
      .vtj-panel__body {
        overflow: hidden;
      }
    }
  }
}
</style>
