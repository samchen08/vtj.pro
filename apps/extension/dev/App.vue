<template>
  <ElConfigProvider :locale="zhCn">
    <Suspense>
      <RouterView></RouterView>
    </Suspense>
  </ElConfigProvider>
</template>
<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import { ElConfigProvider } from 'element-plus';
  import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }
  html,
  body,
  #app {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
  #app {
    background: var(--el-bg-color, #fff);
    box-sizing: border-box;
  }

  #app.is-page {
    padding: 10px;
  }

  #app.is-page.is-pure {
    background-color: var(--el-fill-color-light, #f5f7fa);
    padding: 0;
  }
</style>
