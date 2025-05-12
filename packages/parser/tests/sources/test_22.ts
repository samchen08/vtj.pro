export const test_22 = `
<template>
  <div>
    <el-button type="primary" @click="handleClick">检查用户</el-button>
  </div>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  import { ElButton } from 'element-plus';
  import { axios, debounce } from '@vtj/utils';
  
  export default defineComponent({
    name: 'Page13',
    components: {
      ElButton
    },
    setup(props) {
      const provider = useProvider({ id: '1585368j', version: '1747036992813' });
      const state = reactive({});
      return { state, props, provider };
    },
    methods: {
      handleClick() {
      console.log( {debounce, aa });
        return debounce(() => {
          axios.get('/api/user/check')
            .then(response => {
              console.log('请求成功', response.data);
            })
            .catch(error => {
              console.error('请求失败', error);
            });
        }, 300)();
      }
    }
  });
</script>
<style lang="css" scoped></style>

`;
