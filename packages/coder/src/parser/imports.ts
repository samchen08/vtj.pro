import { type MaterialDescription } from '@vtj/core';
import { dedupArray } from '@vtj/base';

export function parseImports(
  componentMap: Map<string, MaterialDescription>,
  components: string[] = [],
  importBlocks: string[] = [],
  collectImports: Record<string, Set<string>> = {}
) {
  const imports: Record<string, string[]> = {
    vue: ['defineComponent', 'reactive']
  };

  for (const name of components) {
    const desc = componentMap.get(name.split(':')[0]);
    if (desc && desc.package) {
      const items = imports[desc.package] ?? (imports[desc.package] = []);
      items.push(desc.parent || (desc.alias || '').split('.')[0] || desc.name);
    }
  }

  for (const [name, value] of Object.entries(collectImports)) {
    const items = imports[name] ?? (imports[name] = []);
    items.push(...Array.from(value));
  }

  return Object.entries(imports)
    .filter(([_name, values]) => !!values.length)
    .map(([name, values]) => {
      return `import { ${(dedupArray(values) as string[]).join(
        ','
      )}} from '${name}';`;
    })
    .concat(importBlocks);
}
