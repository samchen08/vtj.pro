<template>
  <button @click="handleChangeDataUrl">改变 qrcode value类型为函数</button>
  <div style="height: 100%">
    <XQrcode
      :value="dataUrl"
      :width="300"
      :timeout="timeoutValue"
      @refresh="handleRefresh">
    </XQrcode>
  </div>
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
