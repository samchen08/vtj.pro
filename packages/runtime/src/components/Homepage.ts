import { defineComponent, h, markRaw, Suspense } from 'vue';
import { useProvider } from '../hooks';
import { createBlockRenderer, createLoader, isMask } from '../shared';
import { useTitle } from '@vueuse/core';

export const Homepage = defineComponent({
  name: 'VtjHomepage',
  async setup() {
    const provider = useProvider();
    const { options, service, libs, apis, components } = provider;
    const homepage = provider.getHomepage();
    const { Startup, Mask } = options.components || {};
    useTitle(homepage?.title || 'Hello VTJ.');
    if (!homepage) return { renderer: markRaw(Startup), file: homepage, Mask };

    const isRaw = !!options.raw;
    let renderer = null;
    const Vue = window.Vue;
    const loader = createLoader({
      getFile: service.getDsl.bind(service),
      options: { libs, components, apis, Vue }
    });
    if (isRaw) {
      renderer = await service.getComponent(homepage.id as string);
    } else {
      const dsl = await service.getDsl(homepage.id as string);
      renderer = dsl
        ? markRaw(
            createBlockRenderer({
              dsl,
              Vue,
              libs,
              apis,
              components,
              loader
            })
          )
        : null;
    }
    return {
      renderer,
      file: homepage,
      Mask
    };
  },
  render() {
    const { file, renderer, Mask } = this;

    if (isMask(file) && Mask) {
      return h(Suspense, [h(Mask, () => h(renderer))]);
    }
    return h(Suspense, [h(renderer)]);
  }
});
