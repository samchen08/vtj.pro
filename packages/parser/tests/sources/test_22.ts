export const test_22 = `
<template>
  <AButton type="primary" @click="handleCheck">检查用户</AButton>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  import { Button } from 'ant-design-vue';
  import { axios } from '@vtj/utils';
  import { debounce } from '@vtj/utils';
  
  export default defineComponent({
    name: 'Page12',
    components: {
      AButton: Button
    },
    setup(props) {
      const provider = useProvider({ id: '157uaci8', version: '1747018851963' });
      const state = reactive({});
      return { state, props, provider };
    },
    methods: {
      handleCheck() {
        axios.get('/api/user/check')
          .then(response => {
            console.log('请求成功', response.data);
          })
          .catch(error => {
            console.error('请求失败', error);
          });
      },
      debounceHandleCheck(){
         
      }
    }
  });
</script>
<style lang="css" scoped></style>

`;
