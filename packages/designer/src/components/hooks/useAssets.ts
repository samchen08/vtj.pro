import { computed, reactive, ref, watch } from 'vue';
import { BUILT_IN_NAME } from '@vtj/core';
import { useEngine, type AssetGroup } from '../../framework';

const getDefaultModelValue = (categories: any[] = []) => {
  return categories.map((n) => n.name);
};

const mergeUniappToBuiltIn = (groups: AssetGroup[]) => {
  const index = groups.findIndex((n) => n.name === BUILT_IN_NAME);
  groups.splice(index, 1);
};

export function useAssets() {
  const engine = useEngine();
  const { components, groups, componentMap } = engine.assets;

  watch(
    groups,
    () => {
      const { platform = 'web' } = engine.project.value || {};
      if (platform === 'uniapp') {
        mergeUniappToBuiltIn(groups.value);
      }
    },
    { immediate: true }
  );

  const model = reactive({} as Record<string, any>);

  const groupMap = computed(() => {
    const map: Record<string, AssetGroup> = {};
    if (groups.value) {
      groups.value.forEach((group) => {
        map[group.name] = group;
      });
    }
    return map;
  });

  const tabs = computed(() => {
    if (!groups.value) return [];
    return groups.value.map((n) => ({
      label: `${n.label} (${n.count})`,
      name: n.name,
      disabled: !n.children?.length
    }));
  });

  const currentTab = ref(tabs.value[0]?.name);

  const searchKey = ref('');

  const currentGroup = computed(() => {
    return groupMap.value[currentTab.value];
  });

  watch(
    tabs,
    (value) => {
      const result = value.reduce(
        (res, current) => {
          res[current.name] = getDefaultModelValue(
            groupMap.value[current.name].children
          );
          return res;
        },
        {} as Record<string, any>
      );
      Object.assign(model, result);
    },
    { immediate: true }
  );

  watch(
    tabs,
    (v) => {
      if (v.length && !currentTab.value) {
        currentTab.value = v[0].name;
      }
    },
    { immediate: true }
  );

  const searchResult = computed(() => {
    const key = searchKey.value.toLowerCase();
    if (!key || !components) return [];
    return components.filter((c) => {
      return (
        c.name.toLowerCase().includes(key) ||
        c.label?.toLowerCase().includes(key)
      );
    });
  });

  return {
    components,
    groups,
    componentMap,
    groupMap,
    tabs,
    model,
    currentTab,
    currentGroup,
    searchKey,
    searchResult
  };
}
