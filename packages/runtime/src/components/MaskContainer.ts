import { defineComponent, h, computed, Suspense, watchEffect, ref } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useProvider } from '../hooks';
import { isMask } from '../shared';

export const MaskContainer = defineComponent({
  name: 'VtjMaskContainer',
  setup(props) {
    const provider = useProvider();
    const route = useRoute();
    const fileId = computed(() => route.params.id as string);
    const file = ref();
    watchEffect(() => {
      file.value = provider.getFile(fileId.value);
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
      return h(Suspense, [h(Empty)]);
    }

    if (isMask(file) && Mask) {
      return h(Suspense, [h(Mask)]);
    }
    return h(Suspense, [h(RouterView)]);
  }
});
