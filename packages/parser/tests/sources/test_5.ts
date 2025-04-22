export const test_5 = `
<template>
   <template v-for="item of state.list">
     <span @click="onClick(item)"> {{ item }}</span>
   </template>
</template>

<script>
  import { defineComponent, reactive } from 'vue';

  import { useProvider } from '@vtj/renderer';

  export default defineComponent({
    name: 'LoginPage',
    setup(props) {
      const provider = useProvider({ id: 'lvw0jl2df', version: '' });
      const state = reactive({
         list:[],
         columns:[]
      });
      return { state, props, provider };
    },
    methods: {
      onClick(e){
        console.log('item')
      }
    }
  });
</script>

<style lang="css" scoped>

</style>

`;
