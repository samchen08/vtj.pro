import { onMounted, ref } from 'vue';
import { getBoundingClientRect } from '../utils/node';

export function useRect(selector: string, component: any) {
  const rect = ref<UniApp.NodeInfo | null>(null);
  onMounted(async () => {
    rect.value = await getBoundingClientRect(selector, component);
  });

  return rect;
}
