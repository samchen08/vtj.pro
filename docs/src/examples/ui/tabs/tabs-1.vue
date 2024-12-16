<template>
  <div class="page">
    <XTabs
      :items="items"
      v-model="currentValue"
      border
      @action-click="onClick"
      @action-command="onCommand"></XTabs>

    <XTabs
      :items="items"
      v-model="currentValue"
      align="right"
      @action-click="onClick"
      @action-command="onCommand"></XTabs>

    <XTabs
      :items="items"
      type="card"
      closable
      stretch
      v-model="currentValue"
      @action-click="onClick"
      @actionCommand="onCommand"></XTabs>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { XTabs, type TabsItem } from '@vtj/ui';
  import { Setting, DeleteFilled } from '@vtj/icons';

  const currentValue = ref(1);

  const items: TabsItem[] = [
    {
      label: '选项面板一',
      name: 1,
      lazy: true,
      data: [1]
    },
    {
      label: '选项面板二',
      name: 2,
      lazy: true,
      data: [2]
    },
    {
      label: '选项面板三',
      name: 3,
      lazy: true,
      data: [3],
      actions: [
        {
          name: 'add',
          icon: Setting
        },
        {
          name: 'remove',
          icon: DeleteFilled
        }
      ]
    }
  ];

  const onClick = (e: any) => {
    console.log('click-icon', e);
  };

  const onCommand = (e: any) => {
    console.log('click-command', e);
  };
</script>

<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
</style>
