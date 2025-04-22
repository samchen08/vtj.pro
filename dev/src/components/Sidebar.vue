<template>
  <div class="sidebar">
    <h1 class="title" @click="goHome">VTJ.PRO</h1>
    <div class="switcher">
      <ElSelect size="small" v-model="current">
        <ElOption label="@vtj/base" value="base"></ElOption>
        <ElOption label="@vtj/utils" value="utils"></ElOption>
        <ElOption label="@vtj/icons" value="icons"></ElOption>
        <ElOption label="@vtj/ui" value="ui"></ElOption>
        <ElOption label="@vtj/charts" value="charts"></ElOption>
        <ElOption label="@vtj/core" value="core"></ElOption>
        <ElOption label="@vtj/renderer" value="renderer"></ElOption>
        <ElOption label="@vtj/designer" value="designer"></ElOption>
        <ElOption label="@vtj/materials" value="materials"></ElOption>
        <ElOption label="debug" value="debug"></ElOption>
        <ElOption label="ai" value="ai"></ElOption>
      </ElSelect>
    </div>
    <Menus :title="`@vtj/${current}`" :items="list"></Menus>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed, watch } from 'vue';
  import { ElSelect, ElOption } from 'element-plus';
  import { storage } from '@vtj/web';
  import { useRouter } from 'vue-router';
  import { getModules } from '../modules';
  import Menus from './Menus.vue';
  const router = useRouter();
  const cacheKey = 'current';

  const current = ref(storage.get(cacheKey, { type: 'local' }) || 'base');

  const list = computed(() => {
    const items = current.value ? getModules(current.value) : [];
    return items.map((item) => {
      return {
        path: item.replace('.vue', '').replace('/src/views', '')
      };
    });
  });

  watch(current, (v) => {
    storage.save(cacheKey, v, { type: 'local' });
  });

  const goHome = () => {
    router.push('/');
  };
</script>
<style lang="scss" scoped>
  .sidebar {
    background-color: #fafafa;
    border-right: 1px solid #eee;
    height: 100%;
    overflow: auto;
  }

  .title {
    font-size: 12px;
    margin: 0;
    padding: 5px 10px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
  }
  .switcher {
    text-align: center;
    padding: 10px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
</style>
