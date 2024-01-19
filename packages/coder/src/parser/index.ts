import { type MaterialDescription } from '@vtj/core';
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
  returns: string;
  template: string;
  css: string;
}
export function parser(
  collecter: Collecter,
  componentMap: Map<string, MaterialDescription>
): Token {
  const { dsl } = collecter;
  const computedKeys = Object.keys(dsl.computed || {});
  const lifeCycles = parseFunctionMap(dsl.lifeCycles, computedKeys);
  const computed = parseFunctionMap(dsl.computed, computedKeys);
  const watch = parseWatch(dsl.watch, computedKeys);
  const dataSources = parseDataSources(dsl.dataSources);

  const { methods, nodes, components, importBlocks } = parseTemplate(
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
    return `import ${n.name} from '$vtj/raw/${n.id}.vue';`;
  });

  const imports = parseImports(
    componentMap,
    components,
    blocksImport,
    collecter.imports
  );

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
    imports: imports.join('\n'),
    components: components.join(','),
    returns: collecter.members.join(','),
    template: nodes.join('\n'),
    css: dsl.css || ''
  };
}
