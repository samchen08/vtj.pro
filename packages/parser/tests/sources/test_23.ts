export const test_23 = `
<template>
  <TestBlock></TestBlock>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import TestBlock from './45ubyiaai.vue';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Page3',
    components: { TestBlock },
    setup(props) {
      const provider = useProvider({ id: '158egh8e', version: '1747052820589' });
      const state = reactive({});
      return { state, props, provider };
    }
  })
</script>
<style lang="scss" scoped></style>
`;
