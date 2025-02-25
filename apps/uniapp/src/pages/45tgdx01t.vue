<template></template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Aaa',
    setup(props) {
      const provider = useProvider({ id: '45tgdx01t', version: '1740378221433' });
      const state = reactive<Record<string, any>>({});
      return { state, props, provider };
    },
    onLoad() {
      uni.showModal({
        content: '提示内容'
      });
    }
  });
</script>
<style lang="scss" scoped></style>
