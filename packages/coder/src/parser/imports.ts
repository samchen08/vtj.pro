import { type MaterialDescription, type PlatformType } from '@vtj/core';
import { dedupArray } from '@vtj/base';

export function parseImports(
  componentMap: Map<string, MaterialDescription>,
  components: string[] = [],
  importBlocks: string[] = [],
  collectImports: Record<string, Set<string>> = {},
  platform: PlatformType = 'web'
) {
  const uniH5: string[] = [
    '@dcloudio/uni-h5',
    'uni-h5',
    '@dcloudio/uni-ui',
    'uni-ui'
  ];
  const imports: Record<string, string[]> = {
    vue: ['defineComponent', 'reactive']
  };

  const uniComponents: string[] = [];

  for (const name of components) {
    const desc = componentMap.get(name.split(':')[0]);
    if (desc && desc.package) {
      const items = imports[desc.package] ?? (imports[desc.package] = []);
      const item = desc.parent || (desc.alias || '').split('.')[0] || desc.name;
      items.push(item);
      if (platform === 'uniapp' && uniH5.includes(desc.package)) {
        uniComponents.push(item);
      }
    }
  }

  for (const [name, value] of Object.entries(collectImports)) {
    const items = imports[name] ?? (imports[name] = []);
    items.push(...Array.from(value));
    if (platform === 'uniapp' && uniH5.includes(name)) {
      uniComponents.push(...Array.from(value));
    }
  }

  const result = Object.entries(imports)
    .filter(([name, values]) => {
      return platform === 'uniapp'
        ? !uniH5.includes(name) && !!values.length
        : !!values.length;
    })
    .map(([name, values]) => {
      return `import { ${(dedupArray(values) as string[]).join(
        ','
      )}} from '${name}';`;
    })
    .concat(importBlocks);

  return {
    imports: result,
    uniComponents
  };
}
