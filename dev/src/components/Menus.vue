<template>
  <dl class="menus">
    <dt class="menu-title" v-if="false">{{ props.title }}</dt>
    <dd
      v-for="item in props.items"
      :key="item.path"
      class="menu-item"
      :class="{ 'is-active': isActive(item.path) }">
      <RouterLink :to="item.path">{{ item.path }}</RouterLink>
    </dd>
    <ElEmpty v-if="!items.length"></ElEmpty>
  </dl>
</template>
<script lang="ts" setup>
  import { RouterLink, useRoute } from 'vue-router';
  import { ElEmpty } from 'element-plus';

  export interface Props {
    title: string;
    items: {
      path: string;
    }[];
  }

  const props = withDefaults(defineProps<Props>(), {
    title: '',
    items: () => []
  });

  const route = useRoute();

  const isActive = (path: string) => route.path === path;
</script>
<style lang="scss" scoped>
  .menus {
    margin: 0 0 10px 0;

    dt,
    dd {
      margin: 0;
    }
  }

  .menu-title {
    height: 28px;
    line-height: 28px;
    background-color: #eee;
    padding-left: 10px;
    font-weight: bold;
  }

  .menu-item {
    padding-left: 10px;
    height: 24px;
    line-height: 24px;

    a {
      text-decoration: none;
      color: #444;

      &:hover {
        color: rgb(3, 152, 202);
      }
    }

    &.is-active {
      font-weight: bold;

      a {
        color: rgb(3, 152, 202);
      }
    }
  }
</style>
