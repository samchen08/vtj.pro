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
  /** Uniapp 专用生命周期钩子（如 onLoad），需从 @dcloudio/uni-app 导入 */
  uniHookImports: string[];
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
    globalApiImports,
    uniHookImports
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

  /**
   * parent 组件的 const 声明，如：
   *   const AButtonGroup = AButton.Group;
   * key 为组件注册名（AButtonGroup），value 为已完整声明字符串
   */
  const componentDeclarations: string[] = [];

  /**
   * parent 组件：parent 对应的导入名（如 Button）-> 已在 import 中的注册名（如 AButton）
   * 用于生成 const AButtonGroup = AButton.Group 时找到正确的变量名
   */
  const parentImportedAs: Record<string, string> = {};

  // 物料组件 —— 第一遍：收集所有非 parent 组件的 import 信息
  for (const name of components) {
    const compName = name.split(':')[0];
    const desc = componentMap.get(compName);
    if (!desc || !desc.package || desc.parent) continue; // parent 组件第二遍处理

    const items = imports[desc.package] ?? (imports[desc.package] = []);
    // script setup 模式下，import 的名字即为模板中使用的组件名
    // 当组件有别名（alias）且与组件注册名不同时，需生成 "OriginalName as AliasName"
    const importedName = (desc.alias || '').split('.')[0] || desc.name;
    const registeredName = compName;
    const item =
      importedName !== registeredName
        ? `${importedName} as ${registeredName}`
        : importedName;
    items.push(item);
    // 记录 importedName -> registeredName 映射，供 parent 组件使用
    parentImportedAs[importedName] = registeredName;
    if (platform === 'uniapp' && uniH5.includes(desc.package)) {
      uniComponents.push(importedName);
    }
  }

  // 物料组件 —— 第二遍：处理有 parent 的子组件（如 AButtonGroup）
  for (const name of components) {
    const compName = name.split(':')[0];
    const desc = componentMap.get(compName);
    if (!desc || !desc.package || !desc.parent) continue;

    // parent 是已 import 的基础组件名（如 Button）
    // alias 是在 parent 上的属性路径（如 Group 或 Group.Item）
    const parentName = desc.parent;
    // 找到 parent 在 import 后的实际变量名（可能是 "Button as AButton" -> AButton）
    const parentVar = parentImportedAs[parentName] ?? parentName;
    const aliasPath = desc.alias || '';
    // 生成：const AButtonGroup = AButton.Group;
    componentDeclarations.push(
      `const ${compName} = ${parentVar}.${aliasPath};`
    );

    // 如果 parent 对应的基础组件尚未被 import，也需要确保它被导入
    // （例如只有 AButtonGroup 而没有 AButton 时）
    if (!parentImportedAs[parentName]) {
      const items = imports[desc.package] ?? (imports[desc.package] = []);
      items.push(parentName);
      parentImportedAs[parentName] = parentName;
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

  // Uniapp 专用生命周期钩子：从 @dcloudio/uni-app 导入
  if (platform === 'uniapp' && uniHookImports.length > 0) {
    const items =
      imports['@dcloudio/uni-app'] ?? (imports['@dcloudio/uni-app'] = []);
    items.push(...uniHookImports);
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

  return { imports: result, uniComponents, componentDeclarations };
}
