import { type MaterialDescription, type PlatformType } from '@vtj/core';
import { dedupArray } from '@vtj/base';

export interface CompositionImportsInput {
  /** 物料组件映射 */
  componentMap: Map<string, MaterialDescription>;
  /** template 中使用到的组件名 */
  components: string[];
  /** 区块导入语句（已为完整字符串） */
  importBlocks: string[];
  /** collecter 收集到的 imports（this.$libs.X.Y）*/
  collectImports: Record<string, Set<string>>;
  /** 平台 */
  platform: PlatformType;
  /** Vue 需要导入的 Composition API */
  vueImports: string[];
  /** composables 引入：{ from: [composable, ...] } */
  composableImports: Record<string, string[]>;
  /** 全局 API 引入（按来源包分组）：{ 'vue': ['useAttrs'], 'vue-router': ['useRouter'] } */
  globalApiImports: Record<string, string[]>;
}

/**
 * 解析 Composition 模式的所有 import
 */
export function parseImports(input: CompositionImportsInput) {
  const {
    componentMap,
    components,
    importBlocks,
    collectImports,
    platform,
    vueImports,
    composableImports,
    globalApiImports
  } = input;

  const uniH5: string[] = [
    '@dcloudio/uni-h5',
    'uni-h5',
    '@dcloudio/uni-ui',
    'uni-ui'
  ];

  // vue 自动 import：包含 Composition API + 已用钩子
  const imports: Record<string, string[]> = {
    vue: [...vueImports]
  };

  const uniComponents: string[] = [];

  // 物料组件
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

  // collecter 收集的库导入（this.$libs.X.Y）
  for (const [name, value] of Object.entries(collectImports)) {
    const items = imports[name] ?? (imports[name] = []);
    items.push(...Array.from(value));
    if (platform === 'uniapp' && uniH5.includes(name)) {
      uniComponents.push(...Array.from(value));
    }
  }

  // 显式 composables 引入
  for (const [from, names] of Object.entries(composableImports)) {
    const items = imports[from] ?? (imports[from] = []);
    items.push(...names);
  }

  // 全局 API 引入（vue + vue-router 等）
  for (const [from, names] of Object.entries(globalApiImports)) {
    const items = imports[from] ?? (imports[from] = []);
    items.push(...names);
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

  return { imports: result, uniComponents };
}
