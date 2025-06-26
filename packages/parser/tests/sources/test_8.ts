export const test_8 = `
<template></template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Ccc',
    setup(props) {
      const provider = useProvider({ id: '34gvaj56', version: '1745387977199' });
      const state = reactive({});
      return { state, props, provider };
    },
    methods: {
      async getUser(...args: any[]) {
        return await this.provider.apis['45tjf42g7']
          .apply(this, args)
          .then((res) => {
            return res;
          });
      }
    }
  })
</script>
<style lang="css" scoped></style>

`;
