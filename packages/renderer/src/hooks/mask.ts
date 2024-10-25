import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import type { MenuDataItem } from '@vtj/ui';
import type { PageFile } from '@vtj/core';
import { useProvider } from '../provider';
import { useAccess } from '../plugins';

function createMenus(pages: PageFile[] = []): MenuDataItem[] {
  return pages.map((page) => {
    const { id, title, icon, children, hidden } = page;
    const menu: MenuDataItem = {
      id,
      title,
      icon,
      hidden,
      url: `/page/${id}`,
      children: children && children.length ? createMenus(children) : undefined
    };
    return menu;
  });
}

function menusFilter(
  menus: MenuDataItem[],
  permissions?: Record<string, boolean>
): MenuDataItem[] {
  if (!permissions) return menus;
  let result: MenuDataItem[] = [];

  for (const menu of menus) {
    if (menu.children && menu.children.length) {
      const childArray = menusFilter(menu.children, permissions);
      if (childArray.length) {
        menu.children = childArray;
        result.push(menu);
      }
    } else {
      if (permissions[menu.id]) {
        result.push(menu);
      }
    }
  }

  return result;
}

export function useMask() {
  const provider = useProvider();
  const route = useRoute();
  const access = useAccess();
  const disabled = ref(false);
  const accessData = access?.getData();
  const project = provider.project;
  watchEffect(() => {
    const { name, params, meta } = route;
    if (name === 'VtjPage') {
      const page = provider.getPage(params.id as string);
      disabled.value = !page?.mask;
    } else if (name === 'VtjHomepage') {
      const page = provider.getHomepage();
      disabled.value = !page?.mask;
    } else {
      disabled.value = !meta.mask;
    }
  });

  const menus: MenuDataItem[] = createMenus(project?.pages);
  const config = project?.config;
  return {
    disabled,
    logo: config?.logo,
    themeSwitchable: config?.themeSwitchable,
    title: config?.title || project?.description || project?.name || 'VTJ App',
    menus: menusFilter(menus, accessData?.permissions)
  };
}
