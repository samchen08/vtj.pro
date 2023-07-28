import type { DefineComponent, ComputedRef } from 'vue';

import type {
  BlockSchema,
  NodeSchema,
  StateSchema,
  JSFunction,
  WatchSchema,
  DefineProps,
  InjectSchema,
  PropDataType,
  DataSourceSchema,
  DataSourceHandler
} from '../core';

import { nodeRenderer } from './node';
import { isJSExpression, isJSFunction } from '../utils';
import { Context, ContextMode } from './context';
import type { Block } from '../models';
import { ComponentLoader } from './loader';

const builtInComponents: string[] = [
  'Transition',
  'TransitionGroup',
  'KeepAlive',
  'Teleport',
  'Suspense'
];

const dataTypes: Record<PropDataType, any> = {
  String: String,
  Number: Number,
  Boolean: Boolean,
  Array: Array,
  Object: Object
};

function createState(Vue: any, state: StateSchema, context: Context) {
  return Vue.reactive(
    Object.keys(state || {}).reduce((result, key: string) => {
      let val = (state as any)[key];
      if (isJSExpression(val)) {
        val = context.__parseExpression(val);
      } else if (isJSFunction(val)) {
        val = context.__parseFunction(val);
      }
      result[key] = val;
      return result;
    }, {} as Record<string, any>)
  );
}

function createLifeCycles(
  lifeCycle: Record<string, JSFunction>,
  context: Context
) {
  return Object.entries(lifeCycle ?? {}).reduce((result, [k, v]) => {
    result[k] = context.__parseFunction(v);
    return result;
  }, {} as Record<string, any>);
}

function setWatches(Vue: any, watches: WatchSchema[] = [], context: Context) {
  watches.forEach((n) => {
    Vue.watch(
      context.__parseExpression(n.source),
      context.__parseFunction(n.handler) as any,
      {
        deep: n.deep,
        immediate: n.immediate
      }
    );
  });
}

function createComputed(
  Vue: any,
  computedSchema: Record<string, JSFunction>,
  context: Context
) {
  return Object.entries(computedSchema ?? {}).reduce((result, [k, v]) => {
    result[k] = Vue.computed(context.__parseFunction(v) as any);
    return result;
  }, {} as Record<string, any>);
}

function createProps(defined: DefineProps = [], context: Context) {
  const getDataType = (type?: PropDataType | PropDataType[]) => {
    if (!type) return undefined;
    const types: PropDataType[] = Array.isArray(type) ? type : [type];
    return types.map((name) => dataTypes[name]);
  };

  return defined
    .map((n) => {
      return typeof n === 'string'
        ? {
            name: n
          }
        : {
            name: n.name,
            type: n.type,
            required: n.required,
            default: isJSExpression(n.default)
              ? context.__parseExpression(n.default)
              : n.default
          };
    })
    .reduce((result, current) => {
      result[current.name] = {
        type: getDataType(current.type),
        required: current.required,
        default: current.default
      };
      return result;
    }, {} as Record<string, any>);
}

function createMethods(methods: Record<string, JSFunction>, context: Context) {
  return Object.entries(methods ?? {}).reduce((result, [k, v]) => {
    result[k] = context.__parseFunction(v);
    return result;
  }, {} as Record<string, any>);
}

function createInject(
  Vue: any,
  injects: InjectSchema[] = [],
  context: Context
) {
  return injects.reduce((result, current) => {
    const { name, from } = current || {};
    current.default;
    const key = isJSExpression(from)
      ? context.__parseExpression(from) || name
      : from ?? name;
    const value = isJSExpression(current.default)
      ? context.__parseExpression(current.default)
      : current.default ?? null;
    result[name] = Vue.inject(key, value);
    return result;
  }, {} as Record<string, any>);
}

function createDataSources(
  Vue: any,
  dataSources: Record<string, DataSourceSchema>,
  context: Context
) {
  return Object.keys(dataSources).reduce((res, key) => {
    const source = dataSources[key];
    const api = context.$apis[source.detail];
    const transform = isJSFunction(source.transform)
      ? source.transform.value
        ? context.__parseFunction(source.transform)
        : undefined
      : source.transform;

    res[key] = async (...args: any[]) => {
      const res = await api.apply(context, args);
      return transform ? transform(res) : res;
    };
    return res;
  }, {} as Record<string, DataSourceHandler>);
}

export type BlockRenderer = ReturnType<typeof createBlockRenderer>;
export type BlockRendererInstance = InstanceType<BlockRenderer>;

export interface ICreateBlockRendererOptions {
  Vue: any;
  dsl: BlockSchema;
  block?: Block;
  components?: Record<string, any>;
  libs?: Record<string, any>;
  apis?: Record<string, any>;
  loader?: ComponentLoader;
  window?: Window;
}

function adoptedStyleSheets(global: Window, id: string, css: string) {
  const CSSStyleSheet = (global as any).CSSStyleSheet;
  // chrome > 71 才支持 replaceSync
  if (CSSStyleSheet.prototype.replaceSync) {
    const styleSheet = new CSSStyleSheet();
    styleSheet.id = id;
    styleSheet.replaceSync(css);
    const doc: any = global.document;
    const adoptedStyleSheets = doc.adoptedStyleSheets;
    const sheets = Array.from(adoptedStyleSheets).filter(
      (n: any) => n.id !== id
    );
    doc.adoptedStyleSheets = [...sheets, styleSheet];
  } else {
    const doc = global.document;
    let styleSheet = doc.getElementById(id);
    if (styleSheet) {
      styleSheet.innerHTML = css;
    } else {
      styleSheet = doc.createElement('style');
      styleSheet.id = id;
      styleSheet.innerHTML = css;
      doc.head.appendChild(styleSheet);
    }
  }
}

export function createBlockRenderer(
  options: ICreateBlockRendererOptions
): DefineComponent {
  const { Vue, block, components = {}, libs = {}, apis = {}, loader } = options;
  const mode = !!block ? ContextMode.DESIGN : ContextMode.RUNTIME;
  const dsl: ComputedRef<BlockSchema> = Vue.computed(() => options.dsl);
  const builtIn = builtInComponents.reduce((prev, current) => {
    prev[current] = Vue[current];
    return prev;
  }, {} as Record<string, any>);
  const context: Context = new Context({
    mode,
    dsl: dsl.value,
    loader,
    attrs: {
      $components: {
        ...builtIn,
        ...components
      },
      $libs: libs,
      $apis: apis
    }
  });
  if (dsl.value.id) {
    adoptedStyleSheets(
      options.window || window,
      dsl.value.id,
      dsl.value.css || ''
    );
  }
  return Vue.defineComponent({
    name: dsl.value.name,
    props: {
      ...createProps(dsl.value.props ?? [], context)
    },
    setup(props: any) {
      context.props = props;
      context.state = createState(Vue, dsl.value.state ?? {}, context);
      const computed = createComputed(Vue, dsl.value.computed ?? {}, context);
      const methods = createMethods(dsl.value.methods ?? {}, context);
      const injects = createInject(Vue, dsl.value.inject, context);
      const dataSources = createDataSources(
        Vue,
        dsl.value.dataSources || {},
        context
      );
      const attrs = {
        ...injects,
        ...computed,
        ...methods,
        ...dataSources
      };
      context.setup(attrs, Vue);
      setWatches(Vue, dsl.value.watch ?? [], context);

      if (block && block.id === context.__id) {
        block.runtimeContext = context;
      }

      Vue.onUnmounted(() => {
        if (block && block.id === context.__id) {
          block.runtimeContext = undefined;
        }
      });
      return {
        vtj: context
      };
    },
    emits: [...(dsl.value.emits ?? [])],
    expose: ['vtj'],
    render() {
      if (!dsl.value.children) return null;
      const nodes: NodeSchema[] = dsl.value.children || [];
      if (nodes.length === 1) {
        return nodeRenderer(Vue, nodes[0], context);
      } else {
        return nodes.map((child) => nodeRenderer(Vue, child, context));
      }
    },
    ...createLifeCycles(dsl.value.lifeCycles ?? {}, context)
  });
}
