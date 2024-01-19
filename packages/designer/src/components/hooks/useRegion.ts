import { ref, unref, computed, type MaybeRef } from 'vue';
import { widgetManager } from '../../managers';
import { RegionType } from '../../framework';

export function useRegion(
  region: MaybeRef<RegionType>,
  group?: MaybeRef<string>
) {
  const widgets = computed(() => {
    return widgetManager
      .getWidgets(unref(region), unref(group))
      .filter((n) => !n.invisible);
  });

  const widgetsRef = ref();

  return {
    widgets,
    widgetsRef
  };
}
