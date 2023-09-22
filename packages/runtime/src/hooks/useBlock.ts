import { ref, markRaw, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Provider } from '../Provider';
import { createBlockRenderer, createLoader, PageSchema } from '../shared';

export async function useBlock(provider: Provider, homepage?: PageSchema) {
  const { options, project, service } = provider;
  const { preview, home } = project;
  const route = useRoute();
  const fileId = computed(
    () => (homepage ? homepage.id : route.params.id) as string
  );
  const file = computed(() => provider.getFile(fileId.value));
  const isPreview = route.path.startsWith(preview);
  const isHome = home === route.path;
  // 预览页面不用源码渲染
  const isRaw = options.raw && (!isPreview || isHome);
  const { libs, apis, components } = provider;
  const Vue = window.Vue;
  let renderer = ref();
  const loader = createLoader({
    getFile: service.getDsl.bind(service),
    options: { libs, components, apis, Vue }
  });

  if (fileId.value) {
    if (isRaw) {
      renderer.value = await service.getComponent(fileId.value);
    } else {
      const dsl = await service.getDsl(fileId.value);
      renderer.value = dsl
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
  }

  return {
    renderer,
    file
  };
}
