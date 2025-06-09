export const test_26 = `
<template>
  <div class="container">
    <div class="rectangle"></div>
  </div>
</template>
<script>
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';

  export default defineComponent({
    name: 'Test2',
    setup(props) {
      const provider = useProvider({ id: '167juw96', version: '1749178340659' });
      const state = reactive({
        // 在此处添加状态、变量或数据
      });
      return { state, props, provider };
    }
  });
</script>
<style lang="scss" scoped>

@media (min-width: 768px) {
  .container {
        margin-top: 20%;
  } 
}

 .container::before {
   content:"";
 }

</style>
`;
