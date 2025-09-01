export const test_27 = `
<template>
  <div class="user-management-page"></div>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';

  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'UserPage',
    components: {},
    setup(props) {
      const provider = useProvider({
        id: '19eiup0i',
        version: '1756167211727'
      });
      const state = reactive({});
      return {
        state,
        props,
        provider
      };
    },
    methods: {
      // 获取用户列表
      async fetchUserList(
        orgId = '',
        page = 1,
        size = 10,
        keyword = '',
        status = '',
        role = ''
      ) {
       this.state.data = [];  
      }
    }
  });
</script>
<style lang="css" scoped></style>


`;
