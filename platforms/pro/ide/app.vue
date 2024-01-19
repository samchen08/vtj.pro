<template>
  <el-config-provider :locale="zhCn">
    <Suspense>
      <router-view></router-view>
    </Suspense>
  </el-config-provider>
</template>

<script lang="ts" setup>
  import { ElConfigProvider } from 'element-plus';
  import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>
