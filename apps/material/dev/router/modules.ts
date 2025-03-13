/// <reference types="vite/client" />
import { computed } from 'vue';
const modules = import.meta.glob(['/dev/views/**/*.vue']);

export const routes = computed(() => {
  const files = Object.keys(modules);
  const items: any[] = [];
  for (let key of files) {
    const path = key.replace('.vue', '').replace('/dev/views/', '');
    items.push({
      path: path === 'index' ? '' : path,
      component: modules[key]
    });
  }
  return items;
});

export { modules };
