import { defineComponent, h, computed } from 'vue';
import { useProvider, useBlock } from '../hooks';
import { useTitle } from '@vueuse/core';

export const PageContainer = defineComponent({
  name: 'VtjPageContainer',
  async setup() {
    const provider = useProvider();
    const { renderer, file } = await useBlock(provider);
    const title = computed(() => file.value?.title);
    useTitle(title);

    return {
      provider,
      renderer,
      file
    };
  },
  render() {
    return this.renderer ? h(this.renderer) : null;
  }
});
