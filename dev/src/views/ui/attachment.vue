<template>
  <div class="demo-attachment">
    <h3>卡片模式</h3>
    <div class="demo-row">
      <XAttachment v-model="files1" />
    </div>

    <h3>列表模式</h3>
    <div class="demo-row">
      <XAttachment v-model="files2" list-type="list" />
    </div>

    <h3>限制数量</h3>
    <div class="demo-row">
      <XAttachment v-model="files3" :limit="3" />
    </div>

    <h3>禁用状态</h3>
    <div class="demo-row">
      <XAttachment v-model="files4" disabled />
    </div>

    <h3>可选择模式</h3>
    <div class="demo-row">
      <XAttachment v-model="files5" selectable multiple />
    </div>

    <h3>可点击模式</h3>
    <div class="demo-row">
      <XAttachment v-model="files6" clickable @click="onClick" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { XAttachment } from '@vtj/ui';
import type { AttachmentFile } from '@vtj/ui';
import { ElMessage } from 'element-plus';

const files1 = ref<AttachmentFile[]>([]);
const files2 = ref<AttachmentFile[]>([]);
const files3 = ref<AttachmentFile[]>([]);
const files4 = ref<AttachmentFile[]>([]);
const files5 = ref<AttachmentFile[]>([]);
const files6 = ref<AttachmentFile[]>([]);

const onClick = (file: AttachmentFile) => {
  ElMessage.info(`点击文件: ${file.name || file.url}`);
};
</script>

<style lang="scss" scoped>
.demo-attachment {
  padding: 20px;

  h3 {
    margin: 16px 0 8px;
    font-size: 16px;
    font-weight: 600;
  }

  .demo-row {
    margin-bottom: 12px;
  }
}
</style>
