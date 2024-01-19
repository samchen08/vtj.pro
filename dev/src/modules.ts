import { computed } from 'vue';
const modules = import.meta.glob(['/src/views/**/*.vue']);

export function getModules(name: string) {
  const prefix = `/src/views/${name}/`;
  const files = Object.keys(modules);
  return files.filter((n) => n.startsWith(prefix));
}

export const pageRoutes = computed(() => {
  const files = Object.keys(modules);
  const items: any[] = [];
  for (let key of files) {
    const path = key.replace('.vue', '').replace('/src/views', '');
    items.push({
      path,
      name: path,
      component: modules[key]
    });
  }
  return items;
});

export { modules };
