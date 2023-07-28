import {
  ComputedRef,
  ref,
  getCurrentInstance,
  markRaw,
  computed,
  watchEffect
} from 'vue';
import { Provider } from '../Provider';
import { createBlockRenderer, createLoader } from '../shared';
import { useRoute } from 'vue-router';

export async function useBlock(provider: Provider) {
  const { options, project, service } = provider;
  const { page } = project;
  const route = useRoute();
  const fileId = computed(() => route.params.id as string);
  const file = provider.getFile(fileId.value);
  const isRaw = options.raw && route.path.startsWith(page);
  const { libs, apis, components } = provider;
  const Vue = window.Vue;
  let renderer = ref();
  const loader = createLoader({
    getFile: service.getDsl.bind(service),
    options: { libs, components, apis, Vue }
  });
  watchEffect(async () => {
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
  });

  return {
    renderer,
    file
  };
}
