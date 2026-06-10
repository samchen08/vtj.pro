import { replacer } from './replacer';

/**
 * compositionPatch 选项
 * 描述当前 <script setup> 中各类标识符的分类
 */
export interface CompositionPatchOptions {
  /** ref 变量名列表 */
  refs: string[];
  /** reactive 变量名列表（不含 'state'） */
  reactives: string[];
  /** 是否存在 state reactive */
  hasState: boolean;
  /** computed 变量名列表 */
  computed: string[];
  /** method 函数名列表 */
  methods: string[];
  /** props 字段名列表 */
  props: string[];
  /** 用户自定义 composable 赋值变量名 */
  composables: string[];
  /** inject 变量名 */
  injects: string[];
  /** dataSource 函数名 */
  dataSources: string[];
  /**
   * 全局 API 变量名 → this.$xxx 的映射
   * 例如 { router: '$router', route: '$route', t: '$t', store: '$store' }
   */
  globalApiVars: Record<string, string>;
}

/**
 * Composition 模式反向 this 注入
 *
 * 这是 @vtj/coder transformer.ts 的精确反操作。
 * 将 <script setup> 中的顶层标识符形态转为 DSL 中的 this.xxx 形态。
 *
 * 转换顺序很关键，需要避免重复替换：
 * 1. ref/computed 的 .value 解包：xxx.value → this.xxx
 * 2. 全局 API 变量：router → this.$router
 * 3. props.xxx → this.xxx
 * 4. state → this.state（作为一个 reactive 名整体）
 * 5. reactives：obj → this.obj
 * 6. methods/composables/injects/dataSources：name → this.name
 */
export function compositionPatch(
  content: string,
  options: CompositionPatchOptions
): string {
  if (!content) return content;

  const {
    refs,
    reactives,
    hasState,
    computed,
    methods,
    props,
    composables,
    injects,
    dataSources,
    globalApiVars
  } = options;

  let result = content;

  // 1. ref/computed 的 .value 解包：xxx.value → this.xxx
  // 需要精确匹配 xxx.value 而不是 xxx 本身
  for (const name of refs) {
    result = replaceValueAccess(result, name);
  }
  for (const name of computed) {
    result = replaceValueAccess(result, name);
  }

  // 2. 全局 API 变量：router → this.$router, t → this.$t
  for (const [varName, thisKey] of Object.entries(globalApiVars)) {
    result = replacer(result, varName, `this.${thisKey}`);
  }

  // 3. props.xxx → this.xxx
  // props 在 composition 中是 props.title，DSL 中是 this.title
  for (const key of props) {
    // 先替换 props.key → this.key
    result = replaceMemberAccess(result, 'props', key, `this.${key}`);
  }
  // 清理剩余的裸 props 引用（如果有的话）
  // 不做裸 props 替换，因为 props 本身可能作为参数名出现

  // 4. state reactive 整体：state → this.state
  if (hasState) {
    result = replacer(result, 'state', 'this.state');
  }

  // 5. 其他 reactives：obj → this.obj
  for (const name of reactives) {
    result = replacer(result, name, `this.${name}`);
  }

  // 6. methods
  for (const name of methods) {
    result = replacer(result, name, `this.${name}`);
  }

  // 7. composables 变量名
  for (const name of composables) {
    result = replacer(result, name, `this.${name}`);
  }

  // 8. injects
  for (const name of injects) {
    result = replacer(result, name, `this.${name}`);
  }

  // 9. dataSources
  for (const name of dataSources) {
    result = replacer(result, name, `this.${name}`);
  }

  // 兜底：修复 this.this. 双重替换
  result = result.replace(/this\.this\./g, 'this.');

  return result;
}

/**
 * 替换 xxx.value → this.xxx
 * 使用正则先做快速检测，然后用精确替换
 */
function replaceValueAccess(content: string, name: string): string {
  // 匹配 name.value（非计算属性访问）
  const regex = new RegExp(`\\b${escapeRegex(name)}\\.value\\b`, 'g');
  if (!regex.test(content)) return content;

  // 使用 replacer 替换 name.value 整体
  // 由于 replacer 按标识符替换，我们需要用字符串替换
  return content.replace(
    new RegExp(`\\b${escapeRegex(name)}\\.value\\b`, 'g'),
    `this.${name}`
  );
}

/**
 * 替换 obj.key → target
 * 例如 props.title → this.title
 */
function replaceMemberAccess(
  content: string,
  obj: string,
  key: string,
  target: string
): string {
  const regex = new RegExp(
    `\\b${escapeRegex(obj)}\\.${escapeRegex(key)}\\b`,
    'g'
  );
  return content.replace(regex, target);
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
