<template>
  <div>
    <XTabs :items="items" v-model="currentValue"></XTabs>
    <XTabs :items="items" type="card"></XTabs>
    <XPanel header="业务核心数据">
      <XTabs :items="items"> </XTabs>
    </XPanel>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElButton } from 'element-plus';
  import { Setting } from '@element-plus/icons-vue';
  import { XTabs, XPanel, TabsItem } from '@vtj/ui';

  const currentValue = ref(2);

  const items: TabsItem[] = [
    {
      label: '选项面板一',
      name: 1
    },
    {
      label: '选项面板二',
      name: 2
    },
    {
      label: '选项面板三',
      name: 3
    }
  ];
</script>
