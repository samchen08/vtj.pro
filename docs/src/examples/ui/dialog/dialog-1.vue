<template>
  <div>
    <ElButton type="primary" @click="open1">open 弹窗1</ElButton>
    <ElButton type="primary" @click="open2">open 弹窗2</ElButton>
    <ElButton type="primary" @click="open3">open 弹窗3</ElButton>
    <XDialog
      ref="dialog"
      key="dialog1"
      v-model="visible1"
      title="弹窗标题"
      subtitle="我是副标题内容"
      :modal="false"
      submit
      cancel
      :resizable="false"
      @open="onOpen">
      <div>
        <div v-for="n in 50">{{ n }}</div>
      </div>
    </XDialog>

    <XDialog
      key="dialog2"
      title="弹窗标题"
      subtitle="我是副标题内容"
      v-model="visible2"
      :icon="VtjIconBug"
      modal
      width="800px"
      height="400px"
      submit
      cancel
      :maximizable="true"
      :minimizable="true"
      @maximized="onMaximized"
      @minimized="onMinimized"
      @normal="onNormal"
      @modeChange="onModeChange"
      resizable
      @open="onOpen">
      <div style="text-align: right">可放大缩小</div>
    </XDialog>

    <XDialog
      title="弹窗标题"
      v-model="visible3"
      :icon="VtjIconBug"
      modal
      :submit="false"
      :cancel="false"
      resizable
      @resizeStart="onResizeStart"
      @resizing="onResizing"
      @resizeEnd="onResizeEnd"
      @open="onOpen">
      <div style="text-align: right">可拉伸</div>
    </XDialog>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { XDialog } from '@vtj/ui';
  import { VtjIconBug } from '@vtj/icons';
  import { ElButton } from 'element-plus';

  const visible1 = ref(false);
  const visible2 = ref(false);
  const visible3 = ref(false);
  const open1 = () => {
    visible1.value = true;
  };
  const open2 = () => {
    visible2.value = true;
  };
  const open3 = () => {
    visible3.value = true;
  };

  const onOpen = () => {
    console.log('open');
  };

  const onMaximized = () => {
    console.log('最大化');
  };
  const onMinimized = () => {
    console.log('最小化');
  };

  const onNormal = () => {
    console.log('正常化');
  };

  const onModeChange = (mode) => {
    console.log('onModeChange', mode);
  };

  const onResizeStart = (e) => {
    console.log('onResizeStart', e);
  };

  const onResizing = (e) => {
    console.log('onResizing', e);
  };

  const onResizeEnd = (e) => {
    console.log('onResizeEnd', e);
  };
</script>

<style scoped></style>
