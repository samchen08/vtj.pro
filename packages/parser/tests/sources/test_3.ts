export const test_3 = `
<template>
<div></div>
</template>

<script>
  import { defineComponent, reactive } from 'vue';
  import { ElMessage } from 'element-plus';
  import { useProvider } from '@vtj/renderer';

  export default defineComponent({
    name: 'LoginPage',
    setup(props) {
      const provider = useProvider({ id: 'lvw0jl2df', version: '' });
      const state = reactive({
      });
      return { state, props, provider };
    },
    methods: {
      async submitForm() {
        ElMessage.success('Succcess')
      }
    }
  });
</script>

<style lang="css" scoped>

</style>

`;
