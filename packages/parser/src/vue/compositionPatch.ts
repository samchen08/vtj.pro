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

  // 1. ref/computed 转换
  // 需要处理两种情况（均在 DSL 中转为 this.xxx.value）：
  //   a) 裸 xxx → this.xxx.value     （模板中直接使用 ref 变量）
  //   b) xxx.value → this.xxx.value  （已有 .value 访问）
  // 注意：不能使用 replacer，因为它的 handleThisMemberExpression 会误将
  //     this.xxx 整体替换，导致已转换的 this.xxx.value 变成 this.xxx.value.value
  for (const name of refs) {
    result = replaceRefOrComputed(result, name);
  }
  for (const name of computed) {
    result = replaceRefOrComputed(result, name);
  }

  // 2. 全局 API 变量：router → this.$router, t → this.$t
  for (const [varName, thisKey] of Object.entries(globalApiVars)) {
    result = replacer(result, varName, `this.${thisKey}`);
  }

  // 3. props.xxx → this.xxx
  // props 在 composition 中是 props.title，DSL 中是 this.title
  for (const key of props) {
    // 替换 props.key → this.key
    result = replaceMemberAccess(result, 'props', key, `this.${key}`);
  }
  // 裸 prop 名 → this.prop（模板中直接使用 prop 名的情况）
  // 例如 :title="title" 中的 prop1，在 setup 中直接作为标识符存在
  // 使用 replacer 自动跳过声明、参数、this.prop 中的 prop
  for (const key of props) {
    result = replacer(result, key, `this.${key}`);
  }

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
 * 替换 ref/computed 变量引用：
 *   a) xxx.value → this.xxx.value  （已有 .value 访问）
 *   b) 裸 xxx   → this.xxx.value  （直接使用变量名）
 *
 * 使用两步正则配合负向后顾，避免重复替换已处理的 this.xxx.value 中的 xxx
 */
function replaceRefOrComputed(content: string, name: string): string {
  const escaped = escapeRegex(name);
  // Step 1: xxx.value → this.xxx.value
  let result = content.replace(
    new RegExp(`\\b${escaped}\\.value\\b`, 'g'),
    `this.${name}.value`
  );
  // Step 2: bare xxx（前面没有 this.）→ this.xxx.value
  result = result.replace(
    new RegExp(`(?<!this\\.)\\b${escaped}\\b`, 'g'),
    `this.${name}.value`
  );
  return result;
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
