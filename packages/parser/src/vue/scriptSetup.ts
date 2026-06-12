import type {
  ObjectExpression,
  ObjectProperty,
  CallExpression,
  Identifier,
  VariableDeclaration,
  ExpressionStatement,
  FunctionDeclaration
} from '@babel/types';
import { uid } from '@vtj/base';
import { GLOBAL_API_MAP } from '@vtj/coder';
import { parseScript as toAST, traverseAST, generateCode } from '../shared';
import type {
  BlockState,
  JSFunction,
  JSExpression,
  JSONValue,
  BlockWatch,
  BlockProp,
  BlockEmit,
  BlockInject,
  BlockComposable,
  DataSourceSchema,
  ProjectSchema
} from '@vtj/core';
import { getJSExpression, getJSFunction, extractDataSource } from './utils';
import type { ImportStatement } from './scripts';

// ======================== 常量 ========================

/**
 * Composition → Options 生命周期映射
 */
const LIFECYCLE_MAP: Record<string, string> = {
  onBeforeMount: 'beforeMount',
  onMounted: 'mounted',
  onBeforeUpdate: 'beforeUpdate',
  onUpdated: 'updated',
  onBeforeUnmount: 'beforeUnmount',
  onUnmounted: 'unmounted',
  onErrorCaptured: 'errorCaptured',
  onRenderTracked: 'renderTracked',
  onRenderTriggered: 'renderTriggered',
  onActivated: 'activated',
  onDeactivated: 'deactivated'
};

/**
 * 全局注册的 composable 来源包，不收集到 composables 字段
 * @vtj/renderer: useApis / useStore / usePinia / useRequest / useLibs / useAccess
 */
const GLOBAL_COMPOSABLE_SOURCES = new Set([
  'vue-router',
  'pinia',
  'vue-i18n',
  '@vtj/renderer'
]);

/**
 * 全局 composable 函数名（由 GLOBAL_API_MAP 动态推导）
 * 包含所有全局 API 对应的 composable（如 useAttrs、useSlots、useApis 等），
 * 确保 this.$xxx 系列的 composable 不会写入 DSL composables 字段。
 */
const GLOBAL_COMPOSABLE_NAMES = new Set(
  Object.values(GLOBAL_API_MAP)
    .map((cfg) => cfg.composable)
    .filter((name): name is string => !!name)
);

// ======================== 导出接口 ========================

export interface ParseScriptSetupResult {
  imports: ImportStatement[];
  refs: Record<string, JSONValue | JSExpression>;
  reactives: Record<string, JSONValue | JSExpression>;
  state: BlockState;
  computed: Record<string, JSFunction>;
  methods: Record<string, JSFunction>;
  watch: BlockWatch[];
  lifeCycles: Record<string, JSFunction>;
  props: Array<string | BlockProp>;
  emits: BlockEmit[];
  expose: string[];
  inject: BlockInject[];
  provide: Record<string, JSONValue | JSExpression | JSFunction>;
  composables: BlockComposable[];
  setup: JSFunction | undefined;
  handlers: Record<string, JSFunction>;
  dataSources: Record<string, DataSourceSchema>;
  directives: Record<string, JSExpression>;
}

// ======================== 主函数 ========================

export function parseScriptSetup(
  content: string,
  project: ProjectSchema
): ParseScriptSetupResult {
  const imports = parseImports(content);
  const importSourceMap = buildImportSourceMap(imports);

  // 构建模块路径到库名的映射
  const { dependencies = [] } = project || {};
  const moduleToLibMap = dependencies.reduce(
    (prev, current) => {
      prev[current.package] = current.library;
      return prev;
    },
    {} as Record<string, string>
  );

  const result: ParseScriptSetupResult = {
    imports,
    refs: {},
    reactives: {},
    state: {},
    computed: {},
    methods: {},
    watch: [],
    lifeCycles: {},
    props: [],
    emits: [],
    expose: [],
    inject: [],
    provide: {},
    composables: [],
    setup: undefined,
    handlers: {},
    dataSources: {},
    directives: {}
  };

  const setupStatements: string[] = [];
  const ast = toAST(content);

  traverseAST(ast, {
    // 顶层变量声明
    VariableDeclaration(path: any) {
      // 只处理顶层
      if (path.parent.type !== 'Program') return;
      const node = path.node as VariableDeclaration;
      for (const declarator of node.declarations) {
        if (!declarator.init) continue;
        const init = declarator.init;

        // const xxx = fn(...) 模式
        if (init.type === 'CallExpression') {
          const callee = getCalleeName(init);

          // ref()
          if (callee === 'ref') {
            const name = getDeclaratorName(declarator.id);
            if (name) {
              const argCode = init.arguments[0]
                ? generateCode(init.arguments[0])
                : 'undefined';
              result.refs[name] = getJSExpression(argCode);
            }
            return;
          }

          // reactive()
          if (callee === 'reactive') {
            const name = getDeclaratorName(declarator.id);
            if (name) {
              if (name === '__state') {
                // state 是特殊 reactive
                result.state = parseStateObject(init.arguments[0]);
              } else {
                const argCode = init.arguments[0]
                  ? generateCode(init.arguments[0])
                  : '{}';
                result.reactives[name] = getJSExpression(argCode);
              }
            }
            return;
          }

          // computed()
          if (callee === 'computed') {
            const name = getDeclaratorName(declarator.id);
            if (name) {
              const argCode = init.arguments[0]
                ? generateCode(init.arguments[0])
                : '() => {}';
              result.computed[name] = getJSFunction(argCode);
            }
            return;
          }

          // inject()
          if (callee === 'inject') {
            const name = getDeclaratorName(declarator.id);
            if (name) {
              const fromArg = init.arguments[0];
              const defaultArg = init.arguments[1];
              const from = fromArg ? getStringLiteralValue(fromArg) : name;
              result.inject.push({
                name,
                from: from || name,
                default: defaultArg
                  ? getJSExpression(generateCode(defaultArg))
                  : undefined
              });
            }
            return;
          }

          // defineProps()
          if (callee === 'defineProps' || callee === 'withDefaults') {
            result.props = parseDefineProps(init);
            return;
          }

          // defineEmits()
          if (callee === 'defineEmits') {
            result.emits = parseDefineEmits(init);
            return;
          }

          // useXxx() — composables or global
          if (callee && /^use[A-Z]/.test(callee)) {
            const from = importSourceMap.get(callee);
            if (isGlobalComposable(callee, from)) {
              // 全局插件，不收集，后续由 compositionPatch 处理
              return;
            }
            // 过滤 useProvider，由 Options API 模板写死版本处理
            if (callee === 'useProvider') return;
            // 用户自定义 composable
            const name = getDeclaratorName(declarator.id);
            const destructure = getDestructureNames(declarator.id);
            if (name || destructure.length) {
              // 按 name 去重，同名的 composable 只保留第一个
              if (name && result.composables.some((c) => c.name === name)) {
                return;
              }

              // 构建 composable 表达式
              // 如果有 from（import 来源），使用 this.$libs[LibName].callee 格式
              // 否则直接使用 callee 名称
              let composableValue: string;
              if (from) {
                // from 是模块路径，例如 '@vueuse/core'，需要转换为 libs 中的库名
                const libName = moduleToLibMap[from];
                if (libName) {
                  // 例如: this.$libs.VueUse.useDark
                  composableValue = `this.$libs.${libName}.${callee}`;
                } else {
                  // 如果没有找到库名，直接使用函数名
                  composableValue = callee;
                }
              } else {
                composableValue = callee;
              }

              const composable: BlockComposable = {
                name: name || destructure[0] || callee,
                composable: {
                  type: 'JSExpression',
                  value: composableValue
                }
              };
              if (init.arguments.length > 0) {
                composable.args = init.arguments.map((arg: any) =>
                  getJSExpression(generateCode(arg))
                );
              }
              if (destructure.length > 0) {
                composable.destructure = destructure;
              }
              result.composables.push(composable);
            }
            return;
          }

          // 排除不应进入 setup 的内部/工具变量
          // 1. getCurrentInstance 等 Vue 内部 API
          // 2. 变量名以 __ 开头（内部变量约定）
          const declName = getDeclaratorName(declarator.id);
          if (declName && declName.startsWith('__')) {
            return;
          }
          if (callee === 'getCurrentInstance') {
            return;
          }
          // 其他 CallExpression — 可能是 dataSources 或普通赋值
          // 暂标记为 setup 语句
        }

        // const fn = () => {} 或 const fn = function() {}
        if (
          init.type === 'ArrowFunctionExpression' ||
          init.type === 'FunctionExpression'
        ) {
          const name = getDeclaratorName(declarator.id);
          if (name) {
            const code = generateCode(init);
            // 检查是否为 dataSource
            if (isDataSourceMethod(code)) {
              const ds = extractDataSourceFromCode(name, code, project);
              if (ds) {
                result.dataSources[name] = ds;
                return;
              }
            }
            result.methods[name] = getJSFunction(code);
          }
          return;
        }
      }

      // 过滤以 __ 开头的内部变量声明
      if (
        node.declarations.some((d: any) => {
          const name = getDeclaratorName(d.id);
          return name && name.startsWith('__');
        })
      ) {
        return;
      }

      // 未被任何 pattern 匹配的顶层声明 → setup 语句
      setupStatements.push(generateCode(node));
    },

    // 顶层函数声明
    FunctionDeclaration(path: any) {
      if (path.parent.type !== 'Program') return;
      const node = path.node as FunctionDeclaration;
      if (!node.id) return;
      const name = node.id.name;
      const funcCode = convertFunctionDeclToExpression(node);

      // 检查是否为 dataSource
      if (isDataSourceMethod(funcCode)) {
        const ds = extractDataSourceFromCode(name, funcCode, project);
        if (ds) {
          result.dataSources[name] = ds;
          return;
        }
      }

      result.methods[name] = getJSFunction(funcCode);
    },

    // 顶层表达式语句
    ExpressionStatement(path: any) {
      if (path.parent.type !== 'Program') return;
      const node = path.node as ExpressionStatement;
      const expr = node.expression;

      if (expr.type !== 'CallExpression') {
        setupStatements.push(generateCode(node));
        return;
      }

      const callee = getCalleeName(expr);

      // watch()
      if (callee === 'watch') {
        const watchItem = parseWatch(expr);
        if (watchItem) {
          result.watch.push(watchItem);
        }
        return;
      }

      // 生命周期 onXxx()
      if (callee && callee in LIFECYCLE_MAP) {
        const optionsName = LIFECYCLE_MAP[callee];
        const handler = expr.arguments[0];
        if (handler) {
          result.lifeCycles[optionsName] = getJSFunction(generateCode(handler));
        }
        return;
      }

      // provide()
      if (callee === 'provide') {
        const keyArg = expr.arguments[0];
        const valueArg = expr.arguments[1];
        if (keyArg && valueArg) {
          const key = getStringLiteralValue(keyArg);
          if (key) {
            const valueCode = generateCode(valueArg);
            if (
              valueArg.type === 'ArrowFunctionExpression' ||
              valueArg.type === 'FunctionExpression'
            ) {
              result.provide[key] = getJSFunction(valueCode);
            } else {
              result.provide[key] = getJSExpression(valueCode);
            }
          }
        }
        return;
      }

      // defineExpose()
      if (callee === 'defineExpose') {
        result.expose = parseDefineExpose(expr);
        return;
      }

      // defineProps() 不赋值情况
      if (callee === 'defineProps' || callee === 'withDefaults') {
        result.props = parseDefineProps(expr);
        return;
      }

      // defineEmits() 不赋值情况
      if (callee === 'defineEmits') {
        result.emits = parseDefineEmits(expr);
        return;
      }

      // 其他顶层表达式 → setup 语句
      setupStatements.push(generateCode(node));
    }
  });

  // 组装 setup 字段
  if (setupStatements.length > 0) {
    result.setup = getJSFunction(`() => {\n${setupStatements.join('\n')}\n}`);
  }

  return result;
}

// ======================== 辅助函数 ========================

function parseImports(script: string): ImportStatement[] {
  const importRegex = /import\s+{(.+?)}\s+from\s+['"](.+?)['"]/g;
  const importDefaultRegex = /import\s+(.+?)\s+from\s+['"](.+?)['"]/g;
  const blockRegex = /^{(.+?)}$/;
  const imports: ImportStatement[] = [];
  let match;
  const flatScript = script.replace(/\n/g, ' ');

  while ((match = importRegex.exec(flatScript)) !== null) {
    const from =
      match[2] === '@element-plus/icons-vue' ? '@vtj/icons' : match[2];
    imports.push({
      from,
      imports: match[1].split(',').map((s) => s.trim())
    });
  }

  while ((match = importDefaultRegex.exec(flatScript)) !== null) {
    const defaults = match[1];
    const from = match[2];
    if (defaults && !blockRegex.test(defaults)) {
      imports.push({
        from,
        imports: defaults
      });
    }
  }

  return imports;
}

/**
 * 构建 import 名 → 来源包 的映射
 */
function buildImportSourceMap(imports: ImportStatement[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const imp of imports) {
    if (Array.isArray(imp.imports)) {
      for (const name of imp.imports) {
        map.set(name, imp.from);
      }
    } else {
      map.set(imp.imports, imp.from);
    }
  }
  return map;
}

function isGlobalComposable(callee: string, from: string | undefined): boolean {
  if (from && GLOBAL_COMPOSABLE_SOURCES.has(from)) return true;
  return GLOBAL_COMPOSABLE_NAMES.has(callee);
}

function getCalleeName(expr: CallExpression): string | null {
  if (expr.callee.type === 'Identifier') {
    return expr.callee.name;
  }
  return null;
}

function getDeclaratorName(id: any): string | null {
  if (id?.type === 'Identifier') {
    return id.name;
  }
  return null;
}

function getDestructureNames(id: any): string[] {
  if (id?.type === 'ObjectPattern') {
    return id.properties
      .map((p: any) => {
        if (p.type === 'ObjectProperty' && p.key?.type === 'Identifier') {
          return p.key.name;
        }
        if (p.type === 'RestElement' && p.argument?.type === 'Identifier') {
          return p.argument.name;
        }
        return null;
      })
      .filter(Boolean);
  }
  if (id?.type === 'ArrayPattern') {
    return id.elements
      .map((e: any) => (e?.type === 'Identifier' ? e.name : null))
      .filter(Boolean);
  }
  return [];
}

function getStringLiteralValue(node: any): string | null {
  if (node.type === 'StringLiteral') {
    return node.value;
  }
  return null;
}

function parseStateObject(node: any): BlockState {
  if (!node || node.type !== 'ObjectExpression') return {};
  const state: BlockState = {};
  for (const prop of node.properties) {
    if (prop.type === 'ObjectProperty') {
      const key = (prop.key as Identifier)?.name;
      if (key) {
        state[key] = getJSExpression(generateCode(prop.value));
      }
    } else if (prop.type === 'ObjectMethod') {
      const key = (prop.key as Identifier)?.name;
      if (key) {
        const bodyCode = generateCode(prop.body);
        const paramsCode = prop.params
          .map((n: any) => n.name || 'none')
          .join(',');
        state[key] = getJSExpression(`(${paramsCode}) => ${bodyCode}`);
      }
    }
  }
  return state;
}

function parseDefineProps(expr: CallExpression): Array<string | BlockProp> {
  // withDefaults(defineProps<T>(), { ... })
  if (
    expr.callee.type === 'Identifier' &&
    expr.callee.name === 'withDefaults'
  ) {
    // 简化处理：提取参数中的 defineProps
    const innerCall = expr.arguments[0] as CallExpression;
    if (innerCall?.type === 'CallExpression') {
      const props = parseDefinePropsInner(innerCall);
      // 提取 defaults
      const defaults = expr.arguments[1] as ObjectExpression;
      if (defaults?.type === 'ObjectExpression') {
        applyDefaults(props, defaults);
      }
      return props;
    }
  }
  return parseDefinePropsInner(expr);
}

function parseDefinePropsInner(
  expr: CallExpression
): Array<string | BlockProp> {
  const arg = expr.arguments[0];
  if (!arg) return [];

  // defineProps(['a', 'b'])
  if (arg.type === 'ArrayExpression') {
    return arg.elements
      .map((el: any) => (el?.type === 'StringLiteral' ? el.value : ''))
      .filter(Boolean);
  }

  // defineProps({ name: { type: String, required: true, default: '' } })
  if (arg.type === 'ObjectExpression') {
    return arg.properties
      .map((prop: any) => {
        if (prop.type !== 'ObjectProperty') return null;
        const name = (prop.key as any)?.name;
        if (!name) return null;

        // 简单类型 defineProps({ name: String })
        if (prop.value?.type === 'Identifier') {
          return { name, type: prop.value.name } as BlockProp;
        }

        // 完整对象 { type: String, required: true, default: ... }
        if (prop.value?.type === 'ObjectExpression') {
          const properties = prop.value.properties as ObjectProperty[];
          return {
            name,
            type: getPropDataType(properties),
            required: getBooleanValue(properties, 'required'),
            default: getPropDefault(properties)
          } as BlockProp;
        }

        return name;
      })
      .filter(Boolean) as Array<string | BlockProp>;
  }

  return [];
}

function applyDefaults(
  props: Array<string | BlockProp>,
  defaults: ObjectExpression
) {
  for (const prop of defaults.properties) {
    if (prop.type !== 'ObjectProperty') continue;
    const name = (prop.key as any)?.name;
    if (!name) continue;
    const idx = props.findIndex((p) =>
      typeof p === 'string' ? p === name : p.name === name
    );
    if (idx >= 0) {
      const existing = props[idx];
      if (typeof existing === 'string') {
        props[idx] = {
          name,
          default: getJSExpression(generateCode(prop.value))
        };
      } else {
        existing.default = getJSExpression(generateCode(prop.value));
      }
    }
  }
}

function parseDefineEmits(expr: CallExpression): BlockEmit[] {
  const arg = expr.arguments[0];
  if (!arg) return [];
  if (arg.type === 'ArrayExpression') {
    return arg.elements
      .map((el: any) => {
        if (el?.type === 'StringLiteral') {
          return { name: el.value, params: [] };
        }
        return null;
      })
      .filter(Boolean) as BlockEmit[];
  }
  return [];
}

function parseDefineExpose(expr: CallExpression): string[] {
  const arg = expr.arguments[0];
  if (!arg || arg.type !== 'ObjectExpression') return [];
  return arg.properties
    .map((prop: any) => {
      if (prop.type === 'ObjectProperty' || prop.type === 'ObjectMethod') {
        return (prop.key as any)?.name || '';
      }
      return '';
    })
    .filter(Boolean);
}

function parseWatch(expr: CallExpression): BlockWatch | null {
  const [sourceArg, handlerArg, optionsArg] = expr.arguments;
  if (!sourceArg || !handlerArg) return null;

  const sourceCode = generateCode(sourceArg);
  const handlerCode = generateCode(handlerArg);

  let deep = false;
  let immediate = false;
  if (optionsArg?.type === 'ObjectExpression') {
    const props = optionsArg.properties as ObjectProperty[];
    deep = getBooleanValue(props, 'deep');
    immediate = getBooleanValue(props, 'immediate');
  }

  return {
    id: uid(),
    source: getJSFunction(
      sourceArg.type === 'ArrowFunctionExpression' ||
        sourceArg.type === 'FunctionExpression'
        ? sourceCode
        : `() => { return ${sourceCode}; }`
    ),
    handler: getJSFunction(handlerCode),
    deep,
    immediate
  };
}

function convertFunctionDeclToExpression(node: FunctionDeclaration): string {
  const asyncStr = node.async ? 'async ' : '';
  const params = node.params
    .map((p: any) => {
      if (p.type === 'ObjectPattern') {
        const pattern = p.properties
          .map((n: any) => n.key?.name || n.name)
          .join(',');
        return `{${pattern}}`;
      }
      if (p.type === 'AssignmentPattern') {
        return p.left.name + '=' + (p.right?.extra?.raw || 'null');
      }
      return p.name;
    })
    .join(', ');
  const body = generateCode(node.body) || '{}';
  return `${asyncStr}(${params}) => ${body}`;
}

function isDataSourceMethod(code: string): boolean {
  return code.includes('provider.apis') || code.includes('provider.createMock');
}

function extractDataSourceFromCode(
  name: string,
  code: string,
  project: ProjectSchema
): DataSourceSchema | null {
  const idRegex = /apis\['([\w]*)'\]/;
  const thenRegex = /\.then\(([\w\W]*)\)/;

  const comment = '';
  const dataSource = extractDataSource(comment);

  if (code.includes('provider.apis')) {
    const matches = code.match(idRegex) || [];
    const id = matches[1];
    if (!id) return null;
    const api = (project.apis || []).find((n) => n.id === id || n.name === id);
    if (!api) return null;
    const transform = code.match(thenRegex)?.[1];
    return {
      ref: id,
      name,
      test: dataSource?.test || {
        type: 'JSFunction',
        value: '() => this.runApi({\n    /* 在这里可输入接口参数  */\n})'
      },
      type: 'api',
      label: api.label,
      transform: {
        type: 'JSFunction',
        value: transform || '(res) => {\n    return res;\n}'
      },
      mockTemplate: api.mockTemplate
    };
  }

  if (code.includes('provider.createMock')) {
    const transform = code.match(thenRegex)?.[1];
    return {
      ref: '',
      name,
      test: dataSource?.test || {
        type: 'JSFunction',
        value: '() => this.runApi({\n    /* 在这里可输入接口参数  */\n})'
      },
      type: 'mock',
      label: dataSource?.label || '',
      transform: dataSource?.transform || {
        type: 'JSFunction',
        value: transform || '(res) => {\n    return res;\n}'
      },
      mockTemplate: dataSource?.mockTemplate || {
        type: 'JSFunction',
        value: ''
      }
    };
  }

  return null;
}

function getBooleanValue(properties: ObjectProperty[], name: string): boolean {
  const node = properties?.find(
    (n) => (n as any).key?.name === name
  ) as ObjectProperty;
  return !!(node?.value as any)?.value;
}

function getPropDataType(properties: ObjectProperty[]) {
  const node = properties?.find(
    (n) => (n as any).key?.name === 'type'
  ) as ObjectProperty;
  if (!node) return undefined;
  if (node.value.type === 'ArrayExpression') {
    return node.value.elements.map((n: any) => n.name);
  }
  return (node.value as any).name;
}

function getPropDefault(properties: ObjectProperty[]) {
  const node = properties?.find(
    (n) => (n as any).key?.name === 'default'
  ) as ObjectProperty;
  if (!node) return undefined;
  return getJSExpression(generateCode(node.value));
}
