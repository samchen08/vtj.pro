<template>
  <ElContainer class="layout">
    <ElAside width="260px">
      <ElPageHeader
        class="header"
        title="设计器"
        content="扩展开发"
        @back="back"></ElPageHeader>

      <RouterLink class="menu-item" v-for="item of list" :to="`/${item.path}`">
        {{ item.name }}
      </RouterLink>
    </ElAside>
    <ElMain>
      <RouterView></RouterView>
    </ElMain>
  </ElContainer>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { RouterView, RouterLink } from 'vue-router';
  import { ElContainer, ElMain, ElAside, ElPageHeader } from 'element-plus';
  import { routes } from '../router/modules';

  const list = computed(() => {
    return routes.value
      .filter((n) => n.path !== '')
      .map((n) => {
        return {
          name: n.path.replace('views/', ''),
          path: n.path
        };
      });
  });
  const back = () => {
    location.href = '/#/designer';
  };
</script>

<style lang="scss" scoped>
  .layout {
    height: 100%;
  }
  .header {
    padding: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }
  .el-aside {
    border-right: 1px solid var(--el-border-color);
    background: var(--el-fill-color-extra-light);
  }

  .menu-item {
    padding: 5px 10px 5px 10px;
    text-align: right;
    display: block;

    &:hover {
      background: var(--el-color-primary-light-8);
    }
  }
</style>
