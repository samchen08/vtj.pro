import {
  type BlockSchema,
  type NodeSchema,
  type Dependencie,
  type ParseVueOptions,
  type ProjectSchema,
  type JSExpression,
  type JSFunction,
  BlockModel
} from '@vtj/core';
import { tsFormatter } from '@vtj/coder';
import {
  parseSFC,
  isJSCode,
  compileValidator,
  stripTypeScript
} from '../shared';
import { parseTemplate } from './template';
import { parseScripts, type ImportStatement } from './scripts';
import { parseScriptSetup } from './scriptSetup';
import { parseStyle, type CSSRules } from './style';
import { htmlToNodes } from './html';
import { patchCode, replacer } from './utils';
import { compositionPatch } from './compositionPatch';
import { buildReverseSymbolTable } from './composition/reverseSymbolTable';
import { ComponentValidator, AutoFixer } from '../tools';

export type IParseVueOptions = ParseVueOptions & { project: ProjectSchema };

export { patchCode, replacer, htmlToNodes };

export async function parseVue(options: IParseVueOptions) {
  const { id, name, source: __source, project } = options;
  const errors = compileValidator(__source, name);
  if (errors) {
    return Promise.reject(errors);
  }
  const { dependencies = [], platform = 'web' } = project || {};
  const validator = new ComponentValidator();
  const fixer = new AutoFixer();
  const validation = validator.validate(__source);
  let __errors: string[] = [];
  if (!validation.valid) {
    __errors = validation.errors;
    return Promise.reject(__errors);
  }
  const source = fixer.fixBasedOnValidation(__source, validation);

  const sfc = parseSFC(source);

  // 将 TS 转为 JS，后续所有 script 处理统一以纯 JS 为基础
  sfc.script = stripTypeScript(sfc.script);

  const {
    styles,
    css,
    errors: styleErrors
  } = parseStyle(sfc.styles.join('\n'));

  __errors.push(...styleErrors);
  if (__errors.length) {
    return Promise.reject(__errors);
  }

  // === 单点分流 ===
  if (sfc.isScriptSetup) {
    return parseVueComposition(sfc, {
      id,
      name,
      project,
      platform,
      dependencies,
      styles,
      css
    });
  }

  // === Options 模式（原逻辑不变） ===
  return parseVueOptions(sfc, {
    id,
    name,
    project,
    platform,
    dependencies,
    styles,
    css
  });
}

// ======================== Options 模式 ========================

interface ParseVueInternalOptions {
  id: string;
  name: string;
  project: ProjectSchema;
  platform: string;
  dependencies: Dependencie[];
  styles: CSSRules;
  css: string;
}

async function parseVueOptions(
  sfc: ReturnType<typeof parseSFC>,
  opts: ParseVueInternalOptions
) {
  const { id, name, project, platform, dependencies, styles, css } = opts;

  const {
    state,
    watch,
    lifeCycles,
    computed,
    methods,
    props,
    emits,
    expose,
    inject,
    handlers,
    imports,
    dataSources,
    directives
  } = parseScripts(sfc.script, project);

  const { nodes, slots, context } = parseTemplate(id, name, sfc.template, {
    platform: platform as any,
    handlers,
    styles,
    imports,
    directives
  });

  const dsl: BlockSchema = {
    id,
    name,
    inject,
    props,
    state,
    watch,
    lifeCycles,
    computed,
    methods,
    dataSources,
    slots,
    emits,
    expose,
    nodes,
    css
  };

  const computedKeys = Object.keys(computed || {});
  const propsKeys = (props || []).map((n) =>
    typeof n === 'string' ? n : n.name
  );
  const members: string[] = [
    '$el',
    '$emit',
    '$nextTick',
    '$parent',
    '$root',
    '$refs',
    '$attrs',
    '$slots',
    '$watch',
    '$props',
    '$options',
    '$forceUpdate',
    'state',
    '$props',
    'props',
    ...Object.keys(methods || {})
  ];
  const { libs } = parseDeps(imports, dependencies);
  const patchCodeOpt = {
    platform: platform as any,
    context,
    computed: computedKeys,
    libs,
    members,
    props: propsKeys
  };
  await walkDsl(
    dsl,
    async (node: NodeSchema) => {
      await walkNode(node, async (content: any) => {
        if (isJSCode(content)) {
          const code = await tsFormatter(content.value);
          content.value = patchCode(code, node.id as string, patchCodeOpt);
        }
      });
    },
    async (exp: JSExpression | JSFunction) => {
      const code = await tsFormatter(exp.value);
      exp.value = patchCode(code, '', patchCodeOpt);
    }
  );

  const model = new BlockModel(dsl);
  return model.toDsl();
}

// ======================== Composition 模式 ========================

async function parseVueComposition(
  sfc: ReturnType<typeof parseSFC>,
  opts: ParseVueInternalOptions
) {
  const { id, name, project, platform, styles, css, dependencies } = opts;

  const scriptResult = parseScriptSetup(sfc.script, project);

  const { nodes, slots } = parseTemplate(id, name, sfc.template, {
    platform: platform as any,
    handlers: scriptResult.handlers,
    styles,
    imports: scriptResult.imports,
    directives: scriptResult.directives
  });

  const dsl: BlockSchema = {
    id,
    name,
    apiMode: 'composition',
    inject: scriptResult.inject,
    props: scriptResult.props,
    state: scriptResult.state,
    refs: scriptResult.refs,
    reactives: scriptResult.reactives,
    composables: scriptResult.composables,
    setup: scriptResult.setup,
    provide: scriptResult.provide,
    watch: scriptResult.watch,
    lifeCycles: scriptResult.lifeCycles,
    computed: scriptResult.computed,
    methods: scriptResult.methods,
    dataSources: scriptResult.dataSources,
    slots,
    emits: scriptResult.emits,
    expose: scriptResult.expose,
    nodes,
    css
  };

  // 构建 compositionPatch 选项
  const { libs } = parseDeps(scriptResult.imports, dependencies);

  // 构建反向符号表（与 coder 的 SymbolTable 镜像对齐）
  const reverseSymbols = buildReverseSymbolTable(scriptResult);

  const patchOpts = {
    refs: Array.from(reverseSymbols.refs),
    reactives: Array.from(reverseSymbols.reactives),
    hasState: reverseSymbols.hasState,
    computed: Array.from(reverseSymbols.computed),
    methods: Array.from(reverseSymbols.methods),
    props: Array.from(reverseSymbols.props),
    composables: Array.from(reverseSymbols.composables),
    injects: Array.from(reverseSymbols.injects),
    dataSources: Array.from(reverseSymbols.dataSources),
    globalApiVars: reverseSymbols.reverseApiMap,
    reverseMemberApiMap: reverseSymbols.reverseMemberApiMap,
    libs
  };

  // 对所有 JSCode value 执行反向 this 注入
  await walkDsl(
    dsl,
    async (node: NodeSchema) => {
      await walkNode(node, async (content: any) => {
        if (isJSCode(content)) {
          const code = await tsFormatter(content.value);
          content.value = compositionPatch(code, patchOpts);
        }
      });
    },
    async (exp: JSExpression | JSFunction) => {
      const code = await tsFormatter(exp.value);
      exp.value = compositionPatch(code, patchOpts);
    }
  );

  const model = new BlockModel(dsl);
  return model.toDsl();
}

async function walkDsl(
  dsl: BlockSchema,
  callback: (n: NodeSchema, p?: NodeSchema) => Promise<void>,
  expCallback: (value: any) => Promise<void>
) {
  const walking = async (node: NodeSchema, parent?: NodeSchema) => {
    await callback(node, parent);
    if (Array.isArray(node?.children)) {
      for (const n of node?.children || []) {
        await walking(n, node);
      }
    }
  };

  const walkingExp = async (item: unknown) => {
    if (!item) return;
    if (typeof item !== 'object') return;
    if (Array.isArray(item)) {
      for (let n of item) {
        await walkingExp(n);
      }
      return;
    }

    const values = Object.values(item as Record<string, any>);
    for (const value of values) {
      if (isJSCode(value)) {
        await expCallback(value);
      } else {
        await walkingExp(value);
      }
    }
  };

  const {
    state,
    watch,
    computed,
    props,
    dataSources,
    methods,
    lifeCycles,
    inject,
    setup,
    provide,
    refs,
    reactives
  } = dsl;

  await walkingExp({
    state,
    watch,
    computed,
    props,
    dataSources,
    methods,
    lifeCycles,
    inject,
    setup,
    provide,
    refs,
    reactives
  });

  if (Array.isArray(dsl.nodes)) {
    for (const n of dsl.nodes) {
      await walking(n);
    }
  }
}

async function walkNode(node: NodeSchema, callback: (n: any) => Promise<void>) {
  const walking = async (item: unknown) => {
    if (!item) return;
    if (typeof item !== 'object') return;
    if (Array.isArray(item)) {
      for (let n of item) {
        await callback(n);
        await walking(n);
      }
      return;
    }

    if (isJSCode(item)) {
      await callback(item);
      return;
    }
    const values = Object.values(item as Record<string, any>);
    for (const value of values) {
      await callback(value);
      await walking(value);
    }
  };
  await walking(node);
}

function parseDeps(
  imports: ImportStatement[] = [],
  dependencies: Dependencie[] = []
) {
  const libs: Record<string, string> = {};
  const depsMap = dependencies.reduce(
    (prev, current) => {
      prev[current.package] = current.library;
      return prev;
    },
    {} as Record<string, string>
  );
  for (const { from, imports: names } of imports) {
    if (Array.isArray(names)) {
      names.forEach((name) => {
        const library = depsMap[from];
        if (library) {
          libs[name] = library;
        }
      });
    } else {
      const library = depsMap[from];
      if (library) {
        libs[names] = library;
      }
    }
  }
  return {
    libs
  };
}
