<template>
  <div class="v-ai-widget__mask"></div>
  <div class="login-tip">
    <ElAlert type="warning" :closable="false" title="您未登录">
      <div class="login-tip__content">
        <div>
          使用AI助手需登录 VTJ.PRO 客户端，您还没登录或登录已失效，请重新登录！
          <ElButton
            size="small"
            type="primary"
            round
            plain
            @click="toRemoteAuth">
            立即登录
          </ElButton>
        </div>
      </div>
    </ElAlert>
  </div>
</template>
<script lang="ts" setup>
  import { ElAlert, ElButton } from 'element-plus';
  import { useOpenApi } from '../../hooks';
  const { toRemoteAuth } = useOpenApi();
</script>

<style lang="scss" scoped>
  .login-tip {
    position: relative;
    z-index: 11;
  }
  .login-tip__content {
    line-height: 2em;
  }
</style>
