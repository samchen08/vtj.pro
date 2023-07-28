import { defineComponent, h } from 'vue';
import { useProvider, useBlock } from '../hooks';
import { useTitle } from '@vueuse/core';

export const PreviewContainer = defineComponent({
  name: 'VtjPreviewContainer',
  async setup() {
    const provider = useProvider();
    const { renderer, file } = await useBlock(provider);
    if (file) {
      useTitle(file.title);
    }
    return {
      provider,
      renderer
    };
  },
  render() {
    return this.renderer ? h(this.renderer) : null;
  }
});
