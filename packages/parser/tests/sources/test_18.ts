export const test_18 = `
<template>
  <div>
     <span v-if="state.value === 1"> If Content
     </span>
     <strong v-else-if="state.value === 2">Else If Content</strong>
     <i v-else>Else Content</i>
  </div>
</template>
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Zhuye',
    setup(props) {
      const provider = useProvider({ id: '14u6ltjh', version: '1746404349954' });
      const state = reactive({
        value: 1
      });
      return { state, props, provider };
    }
 })
`;
