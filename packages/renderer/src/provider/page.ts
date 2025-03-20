import { defineComponent, h, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useProvider } from './provider';
export const PageContainer = defineComponent({
  name: 'VtjPageContainer',
  async setup() {
    const provider = useProvider();
    const route = useRoute();
    const id = route.params.id as string;
    const file = id ? provider.getPage(id) : provider.getHomepage();
    const component = file ? await provider.getRenderComponent(file.id) : null;
    const sid = ref(Symbol());
    if (file) {
      Object.assign(route.meta, file.meta || {}, { cache: file.cache });
      const { useTitle } = provider?.adapter;
      if (useTitle) {
        useTitle(file.title || 'VTJ');
      }
    }
    return {
      provider,
      component,
      file,
      query: route.query,
      meta: route.meta,
      sid,
      route
    };
  },
  render() {
    const { component, query, sid } = this;
    if (component) {
      return h(component, { ...query, key: sid });
    } else {
      return h('div', '页面不存在');
    }
  },
  activated() {
    if (this.meta.cache === false) {
      this.sid = Symbol();
    }
  }
});
