<template>
  <ElConfigProvider :locale="zhCn">
    <Suspense>
      <router-view></router-view>
    </Suspense>
  </ElConfigProvider>
</template>

<script lang="ts" setup>
  import { ElConfigProvider } from 'element-plus';
  import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>
