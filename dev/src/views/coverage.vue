<template>
    <div class="home">
      <ElPageHeader title="测试覆盖率报告" :icon="<any>null">
        <template #content>
          <ElTabs v-model="current" stretch>
            <ElTabPane
              v-for="item in packages"
              :label="`@vtj/${item}`"
              :name="item"></ElTabPane>
          </ElTabs>
        </template>
      </ElPageHeader>
      <iframe :src="`/${current}/coverage/index.html`"></iframe>
    </div>
  </template>
  
  <script lang="ts" setup>
    import { ref } from 'vue';
    import { ElPageHeader, ElTabs, ElTabPane } from 'element-plus';
    const packages = [
      'base',
      'node',
      'cli',
      'icons',
      'utils',
      'ui',
      'core',
      'designer',
      'renderer'
    ];
    const current = ref('base');
  </script>
  
  <style lang="scss" scoped>
    .home {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      :deep(.el-tabs__header) {
        margin-bottom: 0;
      }
    }
    iframe {
      width: 100%;
      height: 100%;
      border: none;
      flex-grow: 1;
    }
  </style>
  