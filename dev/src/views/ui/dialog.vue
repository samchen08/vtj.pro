<template>
  <div class="dialog-demo">
    <h3>基础对话框</h3>
    <div class="demo-row">
      <XAction
        label="打开对话框"
        type="primary"
        @click="dialogVisible1 = true"></XAction>
    </div>
    <XDialog
      v-model="dialogVisible1"
      title="基础对话框"
      @close="dialogVisible1 = false">
      <p>这是一个基础对话框的内容。</p>
    </XDialog>

    <h3>带确认取消按钮</h3>
    <div class="demo-row">
      <XAction
        label="打开确认对话框"
        type="primary"
        @click="dialogVisible2 = true"></XAction>
    </div>
    <XDialog
      v-model="dialogVisible2"
      title="确认对话框"
      submit
      cancel
      @submit="onSubmit"
      @cancel="dialogVisible2 = false"
      @close="dialogVisible2 = false">
      <p>是否确认执行此操作？</p>
    </XDialog>

    <h3>可最大化 + 可最小化</h3>
    <div class="demo-row">
      <XAction
        label="可调整对话框"
        type="primary"
        @click="dialogVisible3 = true"></XAction>
    </div>
    <XDialog
      v-model="dialogVisible3"
      title="可调整大小"
      maximizable
      minimizable
      resizable
      @close="dialogVisible3 = false">
      <p>此对话框支持最大化、最小化和拖动调整大小。</p>
    </XDialog>

    <h3>自定义尺寸</h3>
    <div class="demo-row">
      <XAction label="小尺寸" @click="smallVisible = true"></XAction>
      <XAction
        label="自定义宽高"
        type="primary"
        @click="customVisible = true"></XAction>
    </div>
    <XDialog
      v-model="smallVisible"
      title="小对话框"
      size="small"
      width="400px"
      height="300px"
      @close="smallVisible = false">
      <p>小尺寸对话框内容。</p>
    </XDialog>
    <XDialog
      v-model="customVisible"
      title="自定义尺寸"
      width="500px"
      height="400px"
      submit
      cancel
      @close="customVisible = false">
      <p>自定义宽高对话框。</p>
    </XDialog>

    <h3>带图标标题</h3>
    <div class="demo-row">
      <XAction
        label="带图标"
        type="primary"
        @click="iconVisible = true"></XAction>
    </div>
    <XDialog
      v-model="iconVisible"
      title="编辑信息"
      :icon="VtjIconBug"
      @close="iconVisible = false">
      <p>这是一个带图标的对话框。</p>
    </XDialog>

    <h3>内嵌 iframe</h3>
    <div class="demo-row">
      <XAction
        label="iframe 对话框"
        type="primary"
        @click="iframeVisible = true"></XAction>
    </div>
    <XDialog
      v-model="iframeVisible"
      title="嵌入页面"
      width="800px"
      height="600px"
      @close="iframeVisible = false">
      <iframe src="/" width="100%" height="100%" frameborder="0"></iframe>
    </XDialog>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XDialog, XAction } from '@vtj/ui';
  import { VtjIconBug } from '@vtj/icons';

  const dialogVisible1 = ref(false);
  const dialogVisible2 = ref(false);
  const dialogVisible3 = ref(false);
  const smallVisible = ref(false);
  const customVisible = ref(false);
  const iconVisible = ref(false);
  const iframeVisible = ref(false);

  const onSubmit = () => {
    console.log('submit');
    dialogVisible2.value = false;
  };
</script>
<style lang="scss" scoped>
  .dialog-demo {
    padding: 20px;
    h3 {
      margin: 20px 0 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #333;
    }
    .demo-row {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
  }
</style>
