<template>
  <XContainer class="x-mask-toolbar" align="center">
    <XAction
      :icon="MoreFilled"
      :menus="tabs"
      :dropdown="{ size: 'small' }"
      type="primary"
      mode="icon"
      circle
      background="hover"
      @command="onTabCommand">
      <template #item="{ item }">
        <span class="x-mask-toolbar__menu-item">
          {{ item.label }}
          <XIcon
            v-if="!['other', 'all'].includes(item.command)"
            @click.stop="onCloseItem(item)"
            :icon="Close"></XIcon>
        </span>
      </template>
    </XAction>

    <ElDivider direction="vertical"></ElDivider>
    <XActionBar
      v-if="props.actions"
      circle
      mode="icon"
      size="default"
      background="hover"
      type="primary"
      :items="actions"
      @click="onActionClick"
      @command="onActionCommand"></XActionBar>
    <ElDivider v-if="props.actions" direction="vertical"></ElDivider>

    <ThemeSwitch v-if="props.theme"></ThemeSwitch>
    <ElDivider v-if="props.theme" direction="vertical"></ElDivider>
    <slot></slot>
  </XContainer>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import {
    XContainer,
    XAction,
    type ActionMenuItem,
    XIcon,
    XActionBar,
    type ActionBarItems,
    type ActionProps
  } from '../../';
  import { MoreFilled, Close } from '@vtj/icons';
  import { ElDivider } from 'element-plus';
  import ThemeSwitch from './ThemeSwitch.vue';
  import type { MaskTab } from '../types';

  export interface Props {
    tabs: MaskTab[];
    actions?: ActionBarItems;
    theme?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), { tabs: () => [] });
  const emit = defineEmits([
    'closeOtherTabs',
    'closeAllTabs',
    'closeTab',
    'clickTab',
    'actionClick',
    'actionCommand'
  ]);

  const tabs = computed(() => {
    const menus = props.tabs.map((n, i) => {
      return {
        divided: i === 0,
        label: n.title,
        command: n
      };
    });
    return [
      {
        label: '关闭其他',
        command: 'other'
      },
      {
        label: '关闭全部',
        command: 'all'
      },
      ...menus
    ];
  });

  const onCloseItem = (item: ActionMenuItem) => {
    emit('closeTab', item.command);
  };

  const onTabCommand = (item: ActionMenuItem) => {
    switch (item.command) {
      case 'all':
        emit('closeAllTabs');
        break;
      case 'other':
        emit('closeOtherTabs');
        break;
      default:
        emit('clickTab', item.command);
        break;
    }
  };

  const onActionClick = (action: ActionProps) => {
    emit('actionClick', action);
  };

  const onActionCommand = (action: ActionProps, item: ActionMenuItem) => {
    emit('actionCommand', action, item);
  };
</script>
