export const test_27 = `
<template>
  <div @click.stop>容器文本内容示例: {{pet.name}} {{pet}}</div>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  import {ElButton, ElLink} from 'element-plus'
  export default defineComponent({
    name: 'Test2',
    props: {
       pet: {
          type:[Obejct]
       }
    },
    setup(props) {
      const provider = useProvider({ id: '6hgb69yh', version: '1773652358525' });
      const state = reactive({ });
      return { state, props, provider };
    },
    mounted() {
    
    console.log(this.pet, this.props.pet, this.pet.name)
    }
  })
</script>
<style lang="css" scoped>
  /* 组件样式内容 */
</style>

`;
