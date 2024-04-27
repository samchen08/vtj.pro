<template>
  <div>
    <button @click="handleChangeDataUrl">改变 qrcode value类型为函数</button>
  </div>
  <XQrcode></XQrcode>
  <XQrcode
    :value="dataUrl"
    :width="200"
    :timeout="timeoutValue"
    @refresh="handleRefresh">
  </XQrcode>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XQrcode } from '@vtj/web';

  const dataUrl = ref();

  dataUrl.value = '二维码数据';

  const timeoutValue = ref<number>(3000);

  const handleRefresh = (time: number = 3000) => {
    timeoutValue.value = time;
  };

  let fn = (): string => {
    const str: string = Math.random() + '';
    return str;
  };

  const handleChangeDataUrl = () => {
    dataUrl.value = fn;
  };
</script>
