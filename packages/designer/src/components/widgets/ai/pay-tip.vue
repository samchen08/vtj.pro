<template>
  <div v-if="visible" class="v-ai-widget__mask is-limit"></div>

  <div v-if="visible" class="limit-tip">
    <ElAlert title="免费体验次数已用完" type="warning" :closable="false">
      <div>如需要继续使用AI助手，请订阅开通使用资格。</div>
    </ElAlert>
    <div class="limit-tip__content">
      <ElButton :icon="ShoppingCart" type="primary" round @click="onOrder">
        立即开通 <span class="price">99元/月</span>
      </ElButton>
      <ElButton
        class="limit-tip__close"
        text
        type="info"
        round
        bg
        @click="onClosePayTip">
        取消
      </ElButton>
    </div>
  </div>
  <ElDialog
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    width="1000px"
    title="订单已创建"
    v-model="dialogVisible">
    <ElAlert type="success" :closable="false">
      您的订单已经成功创建，请按以下步骤完成开通订阅。
    </ElAlert>
    <ElSteps class="pay-steps" align-center>
      <ElStep title="扫码支付" status="wait">
        <template #description>
          <div>微信扫码完成支付</div>
          <div class="pay-steps__content">
            <img width="200" :src="getImage(props.settings?.payQr)" draggable />
          </div>
        </template>
      </ElStep>
      <ElStep title="联系客服" status="wait">
        <template #description>
          <div>微信扫码添加客服好友</div>
          <div class="pay-steps__content">
            <img
              width="200"
              :src="getImage(props.settings?.contactQr)"
              draggable />
          </div>
        </template>
      </ElStep>
      <ElStep
        title="发送订单"
        status="wait"
        description="复制以下订单信息发送给客服">
        <template #description>
          <div>复制以下订单信息发送给客服</div>
          <div class="pay-steps__content">
            <div class="order-link">
              {{ orderLink }}
            </div>
            <ElButton size="small" :icon="CopyDocument" @click="onCopy"
              >复制</ElButton
            >
          </div>
        </template>
      </ElStep>
    </ElSteps>
    <div class="pay-tip">
      <strong>提示：</strong>
      订阅成功后您将拥有VTJ.PRO全功能权限，并赠送DeepSeek官方5百万tokens使用量。
    </div>
    <template #footer>
      <ElButton
        size="large"
        type="success"
        :icon="Finished"
        @click="onComplete">
        已完成
      </ElButton>
      <ElButton text type="info" @click="onCancel">取消</ElButton>
    </template>
  </ElDialog>
</template>
<script lang="ts" setup>
  import { ref, watch, computed } from 'vue';
  import {
    ElAlert,
    ElButton,
    ElDialog,
    ElSteps,
    ElStep,
    ElMessage
  } from 'element-plus';
  import { ShoppingCart, CopyDocument, Finished } from '@vtj/icons';
  import { useClipboard } from '@vueuse/core';
  import { type Settings } from '../../hooks';
  import { alert, confirm } from '../../../utils';

  export interface Props {
    settings?: Settings;
    remote?: string;
    createOrder: any;
    cancelOrder: any;
    getOrder: any;
  }

  const props = defineProps<Props>();

  const visible = ref(false);
  const dialogVisible = ref(false);
  const orderData = ref<any>(null);

  const orderLink = computed(() => {
    return `${props.remote}/page/a3wwnb20?id=${orderData.value?.id}`;
  });

  watch(
    () => props.settings,
    (v) => {
      if (v?.mode === 3) {
        visible.value = v.paid ? false : !v.free;
      }
    },
    {
      immediate: true
    }
  );

  const getImage = (path?: string) => {
    return path ? `${props.remote}/api/oss/file/${path}` : undefined;
  };

  const { copy } = useClipboard({});

  const onCopy = () => {
    copy(orderLink.value);
    ElMessage.success({
      message: '已经复制到粘贴板'
    });
  };

  const onClosePayTip = () => {
    visible.value = false;
  };

  const onOrder = async () => {
    const res = await props.createOrder();
    if (res?.success) {
      dialogVisible.value = true;
      orderData.value = res.data;
    }
  };

  const onComplete = async () => {
    const res = await props.getOrder(orderData.value?.id);
    const data = res?.data;
    if (data.status === 'Completed') {
      await alert('订单已经支付成功，你权限已经开通！').catch(() => null);
      location.reload();
    } else {
      await alert('您的订单状态还没更新，支付后请与客服联系！', {
        type: 'success',
        confirmButtonText: '再等等'
      }).catch(() => null);
    }
  };

  const onCancel = async () => {
    const ret = await confirm('您确定取消该订单？', {
      confirmButtonText: '确认取消',
      cancelButtonText: '再想想'
    }).catch(() => false);
    if (ret) {
      const res = await props.cancelOrder(orderData.value?.id);
      if (res) {
        dialogVisible.value = false;
      }
    }
  };
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

  .price {
    font-size: 12px;
    margin-left: 5px;
    color: var(--el-color-primary-light-8);
  }
  .pay-steps {
    margin-top: 20px;
  }
  .pay-steps__content {
    margin-left: -10%;
    width: 240px;
    height: 240px;
    padding-top: 10px;
  }
  .order-link {
    padding: 10px;
    font-size: 16px;
    background-color: var(--el-fill-color-light);
    text-align: left;
    margin: 0 0 10px 0;
    color: var(--el-text-color-regular);
    border-radius: 4px;
  }
  .pay-tip {
    font-size: 12px;
    color: var(--el-text-color-placeholder);
  }
</style>
