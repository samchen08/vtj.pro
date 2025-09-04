<template>
  <uni-card
    :is-full="true"
    :is-shadow="false"
    title="基础卡片"
    extra="额外信息">
    <view>
      卡片组件通用来显示完整独立的一段信息，同时让用户理解他的作用。例如一篇文章的预览图、作者信息、时间等，卡片通常是更复杂和更详细信息的入口点。</view
    ></uni-card
  >
  <uni-list>
    <uni-list-item title="列表文字"></uni-list-item>
    <uni-list-item title="列表禁用状态" disabled="true"></uni-list-item
  ></uni-list>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/uni-app';
  export default defineComponent({
    name: 'Abc',
    setup(props) {
      const provider = useProvider({ id: '19sj3v0q', version: '1756977002348' });
      const state = reactive({});
      return { state, props, provider };
    }
  })
</script>
<style lang="css" scoped></style>
