export const test_27 = `
<template>
<div class="login-form">
  <span v-if="false">Text</span>
  <input v-else v-model="state.value"  />
 </div>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Abc1',
    components: {  },
    setup(props) {
      const provider = useProvider({ id: '17zuumip', version: '1753066495241' });
      const state = reactive({
      value:'abc'
      });
      return { state, props, provider,mock };
    }
  })
</script>
<style lang="css" scoped></style>

`;
