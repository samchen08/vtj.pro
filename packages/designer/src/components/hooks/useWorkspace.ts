import { watch, ref, computed, type ComputedRef } from 'vue';
import type { ActionMenuItem, TabsItem } from '@vtj/ui';
import { type TabWidget, type Widget } from '../../framework';
import { useProject } from './useProject';

export function useWorkspace(widgets: ComputedRef<Widget[]>) {
  const { project } = useProject();
  // 最近打开的文件历史记录
  const fileIdArray = ref<string[]>([]);
  // 当前激活的文件
  const activeFileId = ref<string>('');

  const menuChecked = ref<string>('Designer');

  // 显示的tab
  const tabs = computed<TabsItem[]>(() => {
    return fileIdArray.value
      .map((id) => {
        const file = project.value?.getFile(id);
        if (file) {
          return {
            label: file.title,
            name: file.id,
            closable: true
          } as TabsItem;
        }
        return null;
      })
      .filter((n) => !!n);
  });

  // 下拉菜单
  const menus = computed(() => {
    return (widgets.value as TabWidget[]).map((n) => {
      return {
        name: n.name,
        command: n.name,
        label: n.label.replace('视图', ''),
        checked: n.name === menuChecked.value
      };
    });
  });

  const onCloseTab = (name: string) => {
    fileIdArray.value = fileIdArray.value.filter((id) => id !== name);
    activeFileId.value = fileIdArray.value[0] || '';
    if (!fileIdArray.value.length) {
      project.value?.deactivate();
    }
  };

  const onMenuChecked = (item: ActionMenuItem) => {
    menuChecked.value = item.name;
  };

  const closeAllTabs = () => {
    fileIdArray.value = [];
    activeFileId.value = '';
    project.value?.deactivate();
  };

  const closeOtherTabs = () => {
    fileIdArray.value = fileIdArray.value.filter(
      (id) => id === activeFileId.value
    );
  };

  watch(
    () => project.value?.currentFile,
    (file, old) => {
      if (file) {
        if (!fileIdArray.value.includes(file.id)) {
          fileIdArray.value.unshift(file.id);
        }
        activeFileId.value = file.id;
      } else {
        if (old) {
          fileIdArray.value = fileIdArray.value.filter((id) => id !== old.id);
          activeFileId.value = fileIdArray.value[0] || '';
        }
      }
    }
  );

  watch(activeFileId, (id) => {
    if (id && project.value) {
      if (project.value.currentFile?.id !== id) {
        const file = project.value.getFile(id);
        if (file) {
          project.value.active(file);
        }
      }
    }
  });

  return {
    menus,
    tabs,
    activeFileId,
    menuChecked,
    onCloseTab,
    onMenuChecked,
    closeAllTabs,
    closeOtherTabs
  };
}
