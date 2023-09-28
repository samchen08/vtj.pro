<template>
  <XPanel header="VTJ" :card="false">
    <component is="div">
      VTJ 一款基于 Vue3 + Typescript
      的低代码开发工具，内置了设计器引擎、渲染器和代码生成器
    </component>
    <component is="h3"> 开发环境要求 </component>
    <component is="div">
      VTJ 使用了最新的 Vue3 生态技术栈，要求 Node 版本必须是 v18+， 建议使用 nvm
      切换 Node 版本。
    </component>
    <component is="h3"> 快速体验 </component>
    <component is="div"> npm create vtj@latest -- -t web </component>
  </XPanel>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { XPanel } from '@vtj/ui';
  import { useProvider } from '@vtj/runtime';
  export default defineComponent({
    name: 'Dashboard',

    components: { XPanel },

    setup(props) {
      const provider = useProvider();
      const state = reactive({});
      return {
        state,
        props,
        provider
      };
    }
  });
</script>
<style lang="scss" scoped></style>
