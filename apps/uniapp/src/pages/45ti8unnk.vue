<template></template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Aaa',
    setup(props) {
      const provider = useProvider({ id: '45ti8unnk', version: '1740490396480' });
      const state = reactive<Record<string, any>>({});
      return { state, props, provider };
    }
  });
</script>
<style lang="scss" scoped></style>
