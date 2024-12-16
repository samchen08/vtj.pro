import {
  ref,
  h,
  Teleport,
  reactive,
  computed,
  nextTick,
  provide,
  toRaw,
  getCurrentInstance,
  type ComponentInternalInstance
} from 'vue';
import {
  routeLocationKey,
  type RouteLocationNormalizedLoaded
} from 'vue-router';
import { upperFirstCamelCase } from '@vtj/utils';
import { useEventListener } from '@vueuse/core';
import { createDialog } from '../../';
import type { MaskTab, MaskProps } from '../types';
import { useTabs } from './useTabs';

export type UseContentOptions = ReturnType<typeof useTabs>;

export function useContent(
  options: Partial<UseContentOptions>,
  props: MaskProps
) {
  const views = new Map();
  const exclude = ref<string[]>([]);
  const dialogs = reactive<any>({});
  const instance = getCurrentInstance();
  const dialogInstances: Record<string, any> = {};
  const { updateTab, isCurrentTab, activeHome, tabs } =
    options as UseContentOptions;

  const createView = (module: any, route: RouteLocationNormalizedLoaded) => {
    const fullPath = route.fullPath;
    if (views.has(fullPath)) {
      return views.get(fullPath);
    } else {
      const name = upperFirstCamelCase(fullPath);
      const view = {
        name,
        setup() {
          const to = computed(() => dialogs[fullPath] || document.body);
          const disabled = computed(() => !dialogs[fullPath]);
          const visible = computed(() => {
            return !exclude.value.includes(name);
          });
          provide(
            routeLocationKey,
            toRaw({ ...route }) as RouteLocationNormalizedLoaded
          );
          return () => {
            return visible.value
              ? h(
                  Teleport,
                  {
                    to: to.value,
                    disabled: disabled.value
                  },
                  [h(module)]
                )
              : null;
          };
        }
      };
      views.set(fullPath, view);
      return view;
    }
  };

  const closeDialog = (tab: MaskTab) => {
    tab.dialog = undefined;
    delete dialogs[tab.url];
    const instance = dialogInstances[tab.id];
    if (instance) {
      instance.destroy();
      delete dialogInstances[tab.id];
      updateTab(tab);
    }
  };

  const closeDialogs = (tabs: MaskTab[] = []) => {
    tabs.forEach((tab) => {
      closeDialog(tab);
    });
  };

  const openDialog = async (tab: MaskTab) => {
    tab.dialog = {
      ...tab.dialog,
      pure: props.pure,
      onMinimized: () => {
        closeDialog(tab);
      },
      onClose: async () => {
        closeDialog(tab);
        tabs.value = tabs.value.filter((n) => n.id !== tab.id);
      }
    };

    updateTab(tab);
    const dialog = createDialog(
      {
        title: tab.title,
        icon: tab.icon,
        modal: false,
        resizable: true,
        draggable: true,
        maximizable: true,
        minimizable: true,
        ...tab.dialog,
        onOpen(dialog: ComponentInternalInstance) {
          dialogs[tab.url] = (dialog.refs.panelRef as any)?.bodyRef?.$el;
        }
      },
      instance?.appContext
    );
    await nextTick();
    if (isCurrentTab(tab)) {
      activeHome();
    }
    dialogInstances[tab.id] = dialog;
    return dialog;
  };

  const refresh = async (tab: MaskTab) => {
    exclude.value = [tab.name];
    await nextTick();
    exclude.value = [];
  };

  const cleanCache = async (tabs: MaskTab[]) => {
    exclude.value = tabs.map((n) => n.name);
    await nextTick();
    exclude.value = [];
  };

  const onDragover = (e: any) => {
    e.preventDefault();
    return false;
  };

  const onDrop = (e: any) => {
    if (e.dataTransfer) {
      const id = e.dataTransfer.getData('tab');
      const tab = tabs.value.find((n) => n.id === id);
      if (tab) {
        const { clientX, clientY } = e;
        tab.dialog = {
          left: clientX,
          top: clientY
        };
        openDialog(tab);
      }
    }
  };

  const hasDialog = (url: string) => {
    return !!dialogs[url];
  };

  useEventListener(document, 'dragover', onDragover);
  useEventListener(document, 'drop', onDrop);

  return {
    createView,
    openDialog,
    refresh,
    exclude,
    cleanCache,
    hasDialog,
    closeDialog,
    closeDialogs
  };
}
