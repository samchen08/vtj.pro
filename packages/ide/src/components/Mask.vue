<template>
  <XMask
    :title="project.name"
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
  import { useRoute } from 'vue-router';
  import { XMask, MenuDataItem, ActionBarItems, ActionProps } from '@vtj/ui';
  import { ElMessage } from 'element-plus';
  import { useProvider } from '@vtj/runtime';
  const provider = useProvider();
  const route = useRoute();
  const { dsl, project } = provider || {};
  const menus = computed(() => dsl?.pages || []);
  const isPreview = computed(() => route.path.startsWith('/preview'));
  const menuAdapter = (item: MenuDataItem) => {
    return {
      url: isPreview.value ? `/preview/${item.id}` : `/page/${item.id}`,
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
