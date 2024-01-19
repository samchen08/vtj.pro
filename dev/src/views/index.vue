<template>
  <div class="home">
    <RouterLink to="/coverage">测试覆盖率报告</RouterLink>
  </div>
</template>

<script lang="ts" setup>
  // import { ref } from 'vue';
  import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    :deep(.el-tabs__header) {
      margin-bottom: 0;
    }
  }
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    flex-grow: 1;
  }
</style>
