import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
export function usePageLoad() {
  const options = ref<Record<string, any>>({});
  onLoad((query = {}) => {
    options.value = query as Record<string, any>;
  });
  return {
    options
  };
}
