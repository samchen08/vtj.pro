import { replacer } from './replacer';
import { reverseTransformExpression } from './composition/reverseTransformer';
import { buildReverseGlobalApiMap } from './composition/reverseGlobalApi';
import type { ReverseSymbolTable } from './composition/reverseSymbolTable';

/**
 * compositionPatch 选项（向后兼容）
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
  /** 用户自定义 composable 赋值变量名（含解构字段） */
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
  /**
   * 第三方库标识符映射，例如 { ElButton: 'ElementPlus', useDark: 'VueUse' }
   * 替换为 this.$libs.ElementPlus.ElButton 等
   */
  libs: Record<string, string>;
  /**
   * 成员访问形式的全局 API 反向映射
   * 例如 { __i18n: { t: '$t', n: '$n' }, ElMessageBox: { confirm: '$confirm' } }
   * 若未提供，将自动从 coder 的 GLOBAL_API_MAP 推导
   */
  reverseMemberApiMap?: Record<string, Record<string, string>>;
}

/**
 * Composition 模式反向 this 注入
 *
 * 现在委托给 reverseTransformExpression，保留此函数以维持向后兼容。
 */
export function compositionPatch(
  content: string,
  options: CompositionPatchOptions
): string {
  if (!content) return content;

  // 构建兼容的 ReverseSymbolTable
  const symbols: ReverseSymbolTable = {
    refs: new Set(options.refs),
    reactives: new Set(options.reactives),
    computed: new Set(options.computed),
    methods: new Set(options.methods),
    props: new Set(options.props),
    composables: new Set(options.composables),
    injects: new Set(options.injects),
    dataSources: new Set(options.dataSources),
    hasState: options.hasState,
    reverseApiMap: options.globalApiVars,
    reverseMemberApiMap:
      options.reverseMemberApiMap || buildReverseGlobalApiMap().member
  };

  let result = reverseTransformExpression(content, symbols);

  // libs 处理（保持原有逻辑）
  for (const [key, value] of Object.entries(options.libs || {})) {
    result = replacer(result, key, `this.$libs.${value}.${key}`);
  }

  return result;
}
