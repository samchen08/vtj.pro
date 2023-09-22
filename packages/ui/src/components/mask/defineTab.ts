import { computed, inject } from 'vue';
import { useRoute } from 'vue-router';
import { MaskTab, TabCreator, TAB_CREATORS_KEY, MASK_KEY } from './types';

export function defineTab(options: Partial<MaskTab> | TabCreator = {}) {
  const route = useRoute();
  const tabCreators = inject(TAB_CREATORS_KEY, null);
  const mask: any = inject(MASK_KEY, null);
  if (tabCreators) {
    const creator =
      typeof options === 'function' ? options : async () => options;
    tabCreators[route.fullPath] = creator;
  }

  const tab = computed<MaskTab | null>(() => {
    return mask
      ? mask.tabs.value.find((n: MaskTab) => n.url === route.fullPath)
      : null;
  });

  return {
    tab,
    mask
  };
}
