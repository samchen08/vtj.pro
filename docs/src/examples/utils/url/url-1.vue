<template>
  <div>
    <XAction label="getCurrentHost" type="primary" @click="onGetCurrentHost">
    </XAction>
    <XAction label="getHost" type="primary" @click="onGetHost"> </XAction>
    <XAction label="stringify" type="primary" @click="onStringify"> </XAction>
    <XAction label="parse" type="primary" @click="onParse"> </XAction>
    <XAction label="append" type="primary" @click="onAppend"> </XAction>
  </div>
</template>

<script setup lang="ts">
  import { XAction } from '@vtj/ui';

  import { url } from '@vtj/utils';

  const onGetCurrentHost = () => {
    const getCurrentHostTrue = url.getCurrentHost(true);
    const getCurrentHostFalse = url.getCurrentHost(false);
    console.log('true', getCurrentHostTrue);
    // true http://localhost:5173/utils/web/url.html
    console.log('false', getCurrentHostFalse);
    // false http://localhost:5173
  };

  const onGetHost = () => {
    const host = url.getHost('https://vtj.pro/utils/');
    console.log('getHost', host);
    // getHost https://vtj.pro
  };

  const onStringify = () => {
    const stringify = url.stringify({ a: 'aa', b: 'bb' });
    console.log('onStringify', stringify);
    // onStringify a=aa&b=bb
  };

  const onParse = () => {
    const parse = url.parse('https://vtj.pro/utils/?a=aa&b=bb');
    console.log('parse', parse);
    //parse {a:"aa",b:"bb"}
  };

  const onAppend = () => {
    const append = url.append('https://vtj.pro/utils/', '?a=a&b=append');
    console.log('append', append);
    //append https://vtj.pro/utils/?a=a&b=append
  };
</script>

<style scoped></style>
