<template>
  <XMenu :data="data" @select="onSelect" default-active="A-1"></XMenu>
</template>
<script lang="ts" setup>
  import { XMenu, MenuDataItem } from '@vtj/ui';
  import { components } from '@vtj/icons';
  const data: MenuDataItem[] = [
    {
      id: 'A',
      title: 'A',
      icon: components['Document'],
      children: [
        {
          id: 'A-1',
          title: 'A-1',
          icon: components['vtj-icon-np-share']
        },
        {
          id: 'A-2',
          title: 'A-2',
          icon: components['vtj-icon-np-share'],
          disabled: true
        }
      ]
    }
  ];

  const onSelect = (item) => {
    console.log('onSelect', item);
  };
</script>
