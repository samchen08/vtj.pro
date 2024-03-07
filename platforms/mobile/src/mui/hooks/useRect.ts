import { onMounted, ref } from 'vue';

export function useRect(selector: string, component: any) {
  const rect = ref<UniApp.NodeInfo | null>(null);
  onMounted(() => {
    const query = uni.createSelectorQuery().in(component);
    query
      .select(selector)
      .boundingClientRect((info) => {
        rect.value = info as UniApp.NodeInfo;
      })
      .exec();
  });

  return rect;
}
