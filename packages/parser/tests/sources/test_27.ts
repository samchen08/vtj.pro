export const test_27 = `
<template>
  <div>
    <ElButton type="primary"> 按钮</ElButton>
  </div>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { ElButton } from 'element-plus';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'TestBlock',
    components: { ElButton },
    expose: ['state', 'titleLength', 'sayTitle'],
    setup(props) {
      const provider = useProvider({ id: '1ai5vjro', version: '1758529081462' });
      const state = reactive({ title: 'Title' });
      return { state, props, provider };
    },
    computed: {
      titleLength() {
        return this.state.title.length;
      }
    },
    methods: {
      sayTitle() {
        alert(this.state.title);
      }
    }
  })
</script>
<style lang="css" scoped></style>


`;
