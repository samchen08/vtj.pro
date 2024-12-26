<template>
  <div>
    <XDataItem title="应用名称" :icon="icon">
      <template #image>
        <img
          src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
          style="width: 100%; height: 100px"
          alt="图片插槽" />
      </template>

      <template #title>自定义标题插槽</template>
      <template #description>自定义描述插槽</template>
      <template #actions>actions插槽</template>

      <template #default>默认插槽</template>
    </XDataItem>
  </div>
</template>
<script lang="ts" setup>
  import { Setting } from '@element-plus/icons-vue';
  import { XDataItem } from '@vtj/ui';

  const icon = {
    icon: Setting,
    color: '#fff',
    background: '#409eff',
    padding: 2,
    radius: 4,
    size: 30
  };
</script>
