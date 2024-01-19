<template>
  <XMenu :data="data" @select="onSelect" default-active="A-1"></XMenu>
</template>
<script lang="ts" setup>
  import { icons, XMenu, type MenuDataItem } from '@vtj/web';
  const data: MenuDataItem[] = [
    {
      id: 'A',
      title: 'A',
      icon: icons['Document'],
      children: [
        {
          id: 'A-1',
          title: 'A-1',
          icon: icons['vtj-icon-np-share']
        },
        {
          id: 'A-2',
          title: 'A-2',
          icon: icons['vtj-icon-np-share'],
          disabled: true
        }
      ]
    }
  ];

  const onSelect = (item: MenuDataItem) => {
    console.log('onSelect', item);
  };
</script>
