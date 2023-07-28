<template>
  <div>
    <ElButton @click="refresh" type="default" size="small" title="刷新">
      <i class="vtj-icon-refresh"></i>
    </ElButton>
    <ElButton
      type="default"
      size="small"
      title="页面设置"
      @click="openCodeSetting">
      <i class="vtj-icon-setting"></i>
    </ElButton>
    <ElButton
      type="default"
      size="small"
      title="页面大纲树"
      @click="openOutline">
      <i class="vtj-icon-outline"></i>
    </ElButton>
    <ElDivider direction="vertical"></ElDivider>
    <ElButton type="primary" size="small" :icon="HomeFilled" @click="onView">
      浏览
    </ElButton>
    <ElButton type="success" size="small" @click="preview">预览</ElButton>
    <ElButton
      v-if="props.coder"
      type="warning"
      size="small"
      @click="onCoder"
      :loading="loading">
      出码
    </ElButton>
  </div>
</template>
<script lang="ts" setup>
  import { toValue, ref } from 'vue';
  import { ElButton, ElMessage, ElDivider } from 'element-plus';
  import { HomeFilled } from '@element-plus/icons-vue';
  import { useCore, useDesigner } from '../../hooks';
  import {
    EVENT_ACTION_PREVIEW,
    EVENT_ACTION_HOME,
    EVENT_ACTION_CODER
  } from '../../core';

  export interface Props {
    coder?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    coder: false
  });

  const { project, engine, emitter } = useCore();
  const loading = ref(false);
  const refresh = () => {
    if (project.current.value) {
      const { designer } = useDesigner();
      designer.selected.value = null;
      engine.simulator.renderer?.render(project.current.value);
    } else {
      ElMessage.warning({
        message: '请先打开文件'
      });
    }
  };

  const preview = () => {
    const id = project.current.value?.id;
    if (id) {
      const file = project.getFile(id);
      emitter.emit(EVENT_ACTION_PREVIEW, file);
    } else {
      ElMessage.warning({
        message: '请先打开文件'
      });
    }
  };

  const openCodeSetting = () => {
    if (project.current.value) {
      const { designer } = useDesigner();
      designer.setSelected(project.current.value);
      const setting = toValue(engine.skeleton.regionInstances.setting);
      if (setting) {
        setting.change(0);
      }
    } else {
      ElMessage.warning({
        message: '请先打开文件'
      });
    }
  };

  const openOutline = () => {
    if (project.current.value) {
      const apps = toValue(engine.skeleton.regionInstances.apps);
      apps.setCurrentWidget('outline');
    } else {
      ElMessage.warning({
        message: '请先打开文件'
      });
    }
  };

  const onCoder = () => {
    loading.value = true;
    emitter.emit(EVENT_ACTION_CODER, loading);
  };

  const onView = () => {
    const homePage = project.getHomePage();
    if (!homePage) {
      ElMessage.warning({
        message: '请先设置项目首页'
      });
      return;
    }
    emitter.emit(EVENT_ACTION_HOME, homePage);
  };
</script>

<style lang="scss">
  .vtj-action {
    padding: 0 10px;
    width: 40%;
    text-align: right;
    white-space: nowrap;
  }
</style>
