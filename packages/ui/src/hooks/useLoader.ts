import { type MaybeRef, shallowRef, unref, watch, ref } from 'vue';

export function useLoader<T = any, P = any>(
  loaderRef: MaybeRef<T | ((params?: P) => T | Promise<T>)>,
  defaultValue: T,
  params?: P
) {
  const data = shallowRef(defaultValue);
  const loading = ref(false);
  const run = async (params?: P) => {
    const loader = unref(loaderRef);
    if (!loader) return defaultValue;

    return typeof loader === 'function'
      ? await (loader as (params?: P) => T | Promise<T>)(params)
      : loader;
  };

  const doAction = async (params?: P) => {
    loading.value = true;
    return await run(params).then((res) => {
      data.value = res || defaultValue;
      loading.value = false;
      return data;
    });
  };

  watch(
    () => loaderRef,
    () => {
      doAction(params);
    },
    { immediate: true }
  );

  if (params) {
    watch(params, () => {
      doAction(params);
    });
  }

  return {
    data,
    loading,
    loader: doAction
  };
}
