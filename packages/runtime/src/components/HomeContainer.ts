import { defineComponent, h, computed } from 'vue';
import { useProvider, useBlock } from '../hooks';
import { useTitle } from '@vueuse/core';

export const HomeContainer = defineComponent({
  name: 'VtjHomeContainer',
  async setup() {
    const provider = useProvider();
    const { options } = provider;
    const { Startup, Empty } = options.components || {};
    const homepage = provider.getHomepage();
    if (!homepage) {
      return {
        renderer: Empty
      };
    } else {
      const { renderer, file } = await useBlock(provider, homepage);

      const title = computed(() => file.value?.title);
      useTitle(title);

      return {
        provider,
        renderer,
        file,
        Startup
      };
    }
  },
  render() {
    return this.renderer ? h(this.renderer) : null;
  }
});
