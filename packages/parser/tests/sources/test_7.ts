export const test_7 = `
<template>
  <div>
   <ElButton @click="state.visible = true">ButtonText</ElButton>

  </div>
</template>
<script>
  import { defineComponent, reactive } from 'vue';
  import { ElButton } from 'element-plus';
  import { useProvider } from '@vtj/renderer';

  export default defineComponent({
    name: 'LoginPage',
    components: {
      ElTable,
      ElTableColumn
    },
    setup(props) {
      const provider = useProvider({ id: 'lvw0jl2df', version: '' });
      const state = reactive({
         visible: false
      });
      return { state, props, provider };
    }
  });
</script>
`;
