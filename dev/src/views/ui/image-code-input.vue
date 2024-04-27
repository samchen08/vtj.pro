<template>
  <p>1111</p>
  <XImageCodeInput :image="getImageFn" size="small" :validate="handleValidate">
  </XImageCodeInput>

  <XImageCodeInput :image="getImageFn" :validate="handleValidate">
  </XImageCodeInput>

  <XImageCodeInput :image="getImageFn" size="large" :validate="handleValidate">
  </XImageCodeInput>
</template>

<script lang="ts" setup>
  import { XImageCodeInput } from '@vtj/web';

  const srcList = [
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
    'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
    'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
    'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
  ];
  let getImageFn = () => {
    let promise = new Promise((resolve) => {
      setTimeout(() => resolve(srcList[Math.floor(Math.random() * 10)]));
    });
    return promise;
  };

  // 校验  return (true/false)
  const handleValidate = (v: string) => {
    let promise = new Promise((resolve) => {
      setTimeout(() => {
        if ('1111' === v) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
    return promise;
  };
</script>
