import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { type MenuDataItem } from '@vtj/ui';
import { type PageFile } from '@vtj/core';
import { useProvider } from '../provider';

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

export function useMask() {
  const provider = useProvider();
  const route = useRoute();
  const disabled = ref(false);
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
    menus
  };
}
