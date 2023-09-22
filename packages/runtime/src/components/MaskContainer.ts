import { defineComponent, h, computed, watchEffect, ref } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useProvider } from '../hooks';
import { isMask } from '../shared';

export const MaskContainer = defineComponent({
  name: 'VtjMaskContainer',
  setup(props) {
    const route = useRoute();
    const provider = useProvider();
    const { project } = provider.options;
    const fileId = computed(() => route.params.id as string);
    const file = ref();

    watchEffect(() => {
      if (fileId.value) {
        file.value = provider.getFile(fileId.value);
      } else if (project.home === route.fullPath) {
        file.value = provider.getHomepage();
      } else {
        file.value = null;
      }
    });

    return {
      provider,
      file
    };
  },
  render() {
    const { provider, file } = this;
    const { Mask, Empty } = provider.options.components || {};
    if (!file) {
      return h(Empty);
    }

    if (isMask(file) && Mask) {
      return h(Mask);
    }
    return h(RouterView);
  }
});
