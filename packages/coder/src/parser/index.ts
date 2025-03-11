import { type MaterialDescription, type PlatformType } from '@vtj/core';
import { Collecter } from '../collecter';
import { parseState } from './state';
import { parseInject } from './inject';
import { parseProps } from './props';
import { parseEmits } from './emits';
import { parseFunctionMap } from './functions';
import { parseWatch } from './watch';
import { parseDataSources } from './dataSources';
import { parseTemplate } from './template';
import { parseImports } from './imports';
import { parseStyle } from './style';
import { parseBlockPlugins, parseUrlSchemas } from './defines';
import { skipUniComponents } from '../utils';

export interface Token {
  id: string;
  version: string;
  name: string;
  state: string;
  inject: string;
  props: string;
  emits: string;
  watch: string;
  lifeCycles: string;
  computed: string;
  methods: string;
  imports: string;
  components: string;
  directives: string;
  returns: string;
  template: string;
  css: string;
  style: string;
  urlSchemas: string;
  blockPlugins: string;
  asyncComponents: string;
  uniComponents: string[];
  renderer: string;
}

export function parser(
  collecter: Collecter,
  componentMap: Map<string, MaterialDescription>,
  platform: PlatformType = 'web'
): Token {
  const { dsl } = collecter;
  const computedKeys = Object.keys(dsl.computed || {});
  const lifeCycles = parseFunctionMap(dsl.lifeCycles, computedKeys);
  const computed = parseFunctionMap(dsl.computed, computedKeys);
  const watch = parseWatch(dsl.watch, computedKeys);
  const dataSources = parseDataSources(dsl.dataSources);

  const { methods, nodes, components, importBlocks, directives } =
    parseTemplate(
      dsl.nodes || [],
      componentMap,
      computedKeys,
      collecter.context
    );
  const mergeComputed = [...computed, ...watch.computed];

  const mergeMethods = parseFunctionMap(
    {
      ...methods,
      ...(dsl.methods || {})
    },
    computedKeys
  );

  const blocksImport = importBlocks.map((n: any) => {
    return `import ${n.name} from './${n.id}.vue';`;
  });

  let { imports, uniComponents } = parseImports(
    componentMap,
    components,
    blocksImport,
    collecter.imports,
    platform
  );

  const asyncComponents = Object.keys({
    ...collecter.urlSchemas,
    ...collecter.blockPlugins
  });

  const urlSchemas = parseUrlSchemas(collecter.urlSchemas);
  const blockPlugins = parseBlockPlugins(collecter.blockPlugins);

  // const rendererImports = parseRendererImports(
  //   collecter.urlSchemas,
  //   collecter.blockPlugins
  // );

  return {
    id: dsl.id as string,
    version: dsl.__VERSION__ as string,
    name: dsl.name,
    state: parseState(dsl.state).join(','),
    inject: parseInject(dsl.inject).join(','),
    props: parseProps(dsl.props).join(','),
    emits: parseEmits(dsl.emits).join(','),
    watch: watch.watches.join(','),
    lifeCycles: lifeCycles.join(','),
    computed: mergeComputed.join(','),
    methods: [...dataSources, ...mergeMethods].join(','),
    imports: '\n' + imports.join('\n'),
    components: skipUniComponents(components, uniComponents).join(','),
    directives: directives.join(','),
    returns: collecter.members.join(','),
    template: nodes.join('\n'),
    css: dsl.css || '',
    style: parseStyle(collecter.style),
    urlSchemas: urlSchemas.join('\n'),
    blockPlugins: blockPlugins.join('\n'),
    asyncComponents: asyncComponents.join(','),
    uniComponents,
    renderer: platform === 'uniapp' ? '@vtj/uni-app' : '@vtj/renderer'
  };
}
