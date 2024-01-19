<template>
  <div></div>
</template>
<script lang="ts" setup>
  import { jsonp, loadScript } from '@vtj/web';

  jsonp('/mock/test_jsonp.js', { query: { a: 'abc' } }).then((res) => {
    console.log('jsonp', res);
  });

  loadScript('/libs/lcdp-utils.umd.js', {
    library: 'LCDP_Utils'
  }).then((res) => {
    console.log('LCDP_Utils', res);
  });
</script>
