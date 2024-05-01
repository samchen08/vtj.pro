import { defineAsyncComponent, defineComponent, h } from 'vue';
// import Editor from './Editor.vue';
// export default Editor;

export default defineAsyncComponent({
  loader: () => import('./Editor.vue'),
  loadingComponent: defineComponent({
    render() {
      return h('div', '正在拼命加载...');
    }
  }),
  errorComponent: defineComponent({
    render() {
      return h('div', '组件加载失败！');
    }
  })
});
