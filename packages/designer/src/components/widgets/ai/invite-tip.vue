<template>
  <div v-if="showInviteTip" class="v-ai-widget__mask is-limit"></div>

  <div v-if="showInviteTip" class="limit-tip">
    <ElAlert title="仅限邀请" type="warning" :closable="false">
      <div>
        AI助手目前在测试阶段，仅限邀请用户使用，
        您可以通过扫码加入官方技术交流群申请资格。
      </div>
    </ElAlert>
    <div class="limit-tip__content">
      <img
        class="limit-tip__qr"
        :src="props.getImage(props.settings?.contactQr)"
        draggable="false" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { ElAlert } from 'element-plus';
  import { type Settings } from '../../hooks';

  export interface Props {
    settings?: Settings;
    getImage: (path?: string) => string | undefined;
  }

  const props = defineProps<Props>();

  const showInviteTip = computed(() => {
    return props.settings?.mode === 2 && !props.settings?.invited;
  });
</script>

<style lang="scss" scoped>
  .v-ai-widget__mask.is-limit {
    background-color: var(--el-mask-color);
    opacity: 0.8;
    z-index: 11;
  }
  .limit-tip {
    position: absolute;
    z-index: 11;
    background: var(--el-bg-color);
    width: 80%;
    min-width: 260px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    border-radius: 2px;
    border: 1px solid var(--el-border-color-light);
  }
  .limit-tip__title {
    padding: 10px 0;
  }
  .limit-tip__content {
    text-align: center;
    padding: 10px 0;
    width: 100%;
    margin-top: 10px;
    > img {
      display: inline-flex;
    }
  }
  .limit-tip__qr {
    width: 240px;
  }
</style>
