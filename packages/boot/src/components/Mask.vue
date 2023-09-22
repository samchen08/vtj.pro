<template>
  <XMask
    :menus="menus"
    :menuAdapter="menuAdapter"
    :home="project.home"
    :actions="actions"
    theme
    @action-click="onActionClick">
  </XMask>
</template>
<script lang="ts" setup>
  import { computed, reactive } from 'vue';
  import { XMask, MenuDataItem, ActionBarItems, ActionProps } from '@vtj/ui';
  import { useProvider } from '@vtj/runtime';
  import { ElMessage, ElMessageBox } from 'element-plus';
  const { dsl, project } = useProvider();
  const menus = computed(() => dsl?.pages || []);
  const menuAdapter = (item: MenuDataItem) => {
    return {
      url: `/page/${item.id}`,
      ...item
    };
  };

  const actions: ActionBarItems = reactive([
    {
      name: 'message',
      icon: 'Bell',
      badge: 1
    },
    {
      name: 'help',
      icon: 'QuestionFilled'
    },
    {
      name: 'lock',
      icon: 'Lock'
    },
    {
      name: 'logout',
      icon: 'SwitchButton'
    }
  ]);

  const onActionClick = (action: ActionProps) => {
    ElMessage.info(`点击了：${action.name}`);
  };
</script>
