<template>
  <div class="import-button-demo">
    <h3>基础导入按钮</h3>
    <div class="demo-row">
      <XImportButton @success="onSuccess" @fail="onFail">导入文件</XImportButton>
    </div>

    <h3>JSON 解析导入</h3>
    <div class="demo-row">
      <XImportButton
        label="导入 JSON"
        parser="json"
        :uploader="handleJsonUpload"
        @success="onSuccess"
        @fail="onFail">导入 JSON</XImportButton>
    </div>

    <h3>多文件导入</h3>
    <div class="demo-row">
      <XImportButton
        label="多文件导入"
        multiple
        :uploader="handleJsonUpload"
        @success="onSuccess"
        @fail="onFail">多文件导入</XImportButton>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { XImportButton } from '@vtj/ui';

  const onSuccess = (content: any) => {
    console.log('导入成功:', content);
  };

  const onFail = (error: any) => {
    console.error('导入失败:', error);
  };

  const handleJsonUpload = async (content: any) => {
    console.log('上传内容:', content);
    return true;
  };
</script>
<style lang="scss" scoped>
  .import-button-demo {
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
