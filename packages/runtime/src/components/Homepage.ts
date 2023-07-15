import { defineComponent, h, computed } from 'vue';
import { XStartup } from '@vtj/ui';
import { useProvider, usePage, useMask } from '../hooks';
import { useRoute } from 'vue-router';
import { useTitle } from '@vueuse/core';

export default defineComponent({
  name: 'VtjHomepage',
  setup() {
    const provider = useProvider();
    const page = computed(() => {
      const pages = provider?.pages?.value || [];
      return pages.find((n) => !!n.home);
    });
    const pageId = computed(() => page.value?.id);
    const { renderer, loading, dsl } = usePage(pageId);
    const { Mask, maskable, maskProps } = useMask(pageId);
    const route = useRoute();
    const title = computed(() => dsl.value?.title || 'Hello VTJ.');
    useTitle(title);
    return {
      route,
      provider,
      page,
      renderer,
      loading,
      Mask,
      maskable,
      maskProps
    };
  },
  render() {
    // 找不到首页
    if (!this.page) {
      return h(XStartup);
    }
    // 首页带母版
    if (this.Mask && this.maskable && this.renderer) {
      return h(this.Mask, this.maskProps, () =>
        h(this.renderer as any, this.route.query)
      );
    } else if (this.renderer) {
      // 首页无母版
      return h(this.renderer, this.route.query);
    } else {
      // 未加载完成数据时，不渲染
      return null;
    }
  }
});
