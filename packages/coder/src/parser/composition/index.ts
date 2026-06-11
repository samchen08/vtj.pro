import { type MaterialDescription, type PlatformType } from '@vtj/core';
import { Collecter } from '../../collecter';
import { parseProps } from '../props';
import { parseEmits } from '../emits';
import { parseStyle } from '../style';
import { parseBlockPlugins, parseUrlSchemas } from '../defines';

import { buildSymbolTable } from './symbolTable';
import {
  detectGlobalApis,
  generateGlobalApiDeclares,
  collectGlobalApiImports
} from './globalApi';
import { parseRefs } from './refs';
import { parseReactives, parseStateAsReactive } from './reactives';
import { parseComposables } from './composables';
import { parseInject } from './inject';
import { parseComputed } from './computed';
import { parseMethods, parseDataSources } from './methods';
import { parseWatch } from './watch';
import { parseProvide } from './provide';
import {
  parseCreatedStatements,
  parseSetupStatements
} from './setupStatements';
import { parseLifeCycles } from './lifeCycles';
import { parseImports } from './imports';
import { parseTemplateComposition } from './template';

export interface TokenComposition {
  id: string;
  version: string;
  name: string;
  /** 顶层 imports（全部完整 import 语句） */
  imports: string;
  /** defineProps 内容 */
  props: string;
  /** defineEmits 列表（已带引号的字符串） */
  emits: string;
  /** 是否需要生成 defineProps（DSL 中使用了 this.$props） */
  needsProps: boolean;
  /** 是否需要生成 defineEmits（DSL 中使用了 this.$emit） */
  needsEmit: boolean;
  /** defineExpose 参数 */
  expose: string;
  /** 全局 API 顶层声明（const router = useRouter() 等） */
  globalApiDeclares: string;
  /** inject 顶层声明 */
  injects: string;
  /** composables 顶层声明 */
  composables: string;
  /** state（作为 reactive） */
  state: string;
  /** refs 顶层声明 */
  refs: string;
  /** reactives 顶层声明 */
  reactives: string;
  /** computed 顶层声明 */
  computed: string;
  /** methods 顶层声明 */
  methods: string;
  /** dataSources 顶层声明 */
  dataSources: string;
  /** watch 顶层调用 */
  watch: string;
  /** provide 顶层调用 */
  provide: string;
  /** created/beforeCreate 顶层立即执行 */
  createdStatements: string;
  /** setup 字段顶层立即执行 */
  setupStatements: string;
  /** onXxx 生命周期顶层调用 */
  lifeCycles: string;

  /** 模板部分 */
  template: string;
  css: string;
  style: string;
  urlSchemas: string;
  blockPlugins: string;
  uniComponents: string[];
  renderer: string;
}

/**
 * Composition 模式 parser
 */
export function parserComposition(
  collecter: Collecter,
  componentMap: Map<string, MaterialDescription>,
  platform: PlatformType = 'web'
): TokenComposition {
  const { dsl } = collecter;

  // 1. 构建符号表
  const symbols = buildSymbolTable(dsl);

  // 2. 检测全局 API
  const globalApis = detectGlobalApis(dsl);
  const globalApiDeclares = generateGlobalApiDeclares(globalApis);
  const globalApiImports = collectGlobalApiImports(globalApis);

  // 3. 解析 template（template 内会收集 components / methods / importBlocks）
  const tplResult = parseTemplateComposition(
    dsl.nodes || [],
    componentMap,
    Object.keys(dsl.computed || {}),
    collecter.context
  );
  const blocksImport = tplResult.importBlocks.map(
    (n: any) => `import ${n.name} from './${n.id}.vue';`
  );

  // 4. 解析各字段
  const refsArr = parseRefs(dsl.refs || {}, symbols);
  const reactivesArr = parseReactives(dsl.reactives || {}, symbols);
  const stateStr = parseStateAsReactive(dsl.state || {}, symbols);
  const computedArr = parseComputed(dsl.computed || {}, symbols);

  // 合并 template 中收集的事件 handler 与 dsl.methods
  const mergedMethods = {
    ...(tplResult.methods || {}),
    ...(dsl.methods || {})
  };
  const methodsArr = parseMethods(mergedMethods, symbols);
  const dataSourcesArr = parseDataSources(dsl.dataSources || {});
  const watchArr = parseWatch(dsl.watch || [], symbols);
  const injectArr = parseInject(dsl.inject || [], symbols);
  const provideArr = parseProvide(dsl.provide || {}, symbols);
  const composablesResult = parseComposables(
    (dsl.composables || []) as any[],
    symbols
  );

  const lifeCyclesResult = parseLifeCycles(dsl.lifeCycles || {}, symbols);
  const createdStatements = parseCreatedStatements(
    dsl.lifeCycles || {},
    symbols
  );
  const setupStatements = parseSetupStatements(dsl.setup, symbols);

  // 5. 收集 vue 包需要的标识符
  const vueImports = new Set<string>();
  if (refsArr.length > 0) vueImports.add('ref');
  if (reactivesArr.length > 0 || stateStr) vueImports.add('reactive');
  if (computedArr.length > 0) vueImports.add('computed');
  if (watchArr.length > 0) vueImports.add('watch');
  if (injectArr.length > 0) vueImports.add('inject');
  if (provideArr.length > 0) vueImports.add('provide');
  for (const hook of lifeCyclesResult.usedHooks) vueImports.add(hook);

  // 6. 解析 imports
  const { imports, uniComponents } = parseImports({
    componentMap,
    components: tplResult.components,
    importBlocks: blocksImport,
    collectImports: collecter.imports,
    platform,
    vueImports: Array.from(vueImports),
    composableImports: composablesResult.imports,
    globalApiImports
  });

  // 7. 异步组件 + url schemas + block plugins
  const urlSchemas = parseUrlSchemas(collecter.urlSchemas);
  const blockPlugins = parseBlockPlugins(collecter.blockPlugins);

  return {
    id: dsl.id as string,
    version: dsl.__VERSION__ as string,
    name: dsl.name,
    imports: '\n' + imports.join('\n'),
    props: parseProps(dsl.props).join(','),
    emits: parseEmits(dsl.emits).join(','),
    needsProps: globalApis.has('$props'),
    needsEmit: globalApis.has('$emit'),
    expose:
      dsl.expose && dsl.expose.length ? JSON.stringify(dsl.expose || []) : '',
    globalApiDeclares: globalApiDeclares.join('\n'),
    injects: injectArr.join('\n'),
    composables: composablesResult.statements.join('\n'),
    state: stateStr,
    refs: refsArr.join('\n'),
    reactives: reactivesArr.join('\n'),
    computed: computedArr.join('\n'),
    methods: methodsArr.join('\n'),
    dataSources: dataSourcesArr.join('\n'),
    watch: watchArr.join('\n'),
    provide: provideArr.join('\n'),
    createdStatements,
    setupStatements,
    lifeCycles: lifeCyclesResult.statements.join('\n'),
    template: tplResult.nodes.join('\n'),
    css: dsl.css || '',
    style: parseStyle(collecter.style),
    urlSchemas: urlSchemas.join('\n'),
    blockPlugins: blockPlugins.join('\n'),
    uniComponents,
    renderer: platform === 'uniapp' ? '@vtj/uni-app' : '@vtj/renderer'
  };
}
