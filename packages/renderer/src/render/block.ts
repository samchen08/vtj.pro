import {
  type BlockSchema,
  type BlockProp,
  type BlockPropDataType,
  type BlockState,
  type JSFunction,
  type BlockInject,
  type DataSourceSchema,
  type BlockWatch,
  type NodeSchema,
  type BlockEmit
} from '@vtj/core';
import { isString } from '@vtj/utils';
import { ContextMode, DATA_TYPES } from '../constants';
import { Context } from './context';
import { adoptedStyleSheets, isJSExpression, isJSFunction } from '../utils';
import { nodeRender } from './node';
import { createMock } from '../provider';
import type { ComputedRef, DefineComponent } from 'vue';
import * as globalVue from 'vue';
import { type BlockLoader } from './loader';

export type DataSourceHandler = (...args: any[]) => Promise<any>;

export interface CreateRendererOptions {
  Vue?: any;
  mode?: ContextMode;
  dsl?: BlockSchema;
  components?: Record<string, any>;
  libs?: Record<string, any>;
  apis?: Record<string, any>;
  loader?: BlockLoader;
  window?: Window;
}

export function createRenderer(options: CreateRendererOptions) {
  const {
    Vue = globalVue,
    mode = ContextMode.Runtime,
    components = {},
    libs = {},
    apis = {},
    loader
  } = options;

  const dsl: ComputedRef<BlockSchema> = Vue.computed(() => options.dsl);

  const attrs = {
    $components: components,
    $libs: libs,
    $apis: apis
  };

  const context = new Context({
    mode,
    dsl: dsl.value,
    attrs
  });

  const renderer: DefineComponent<any, any, any, any> = Vue.defineComponent({
    name: dsl.value.name,
    props: {
      ...createProps(dsl.value.props ?? [], context)
    },
    setup(props: any) {
      context.$props = props;
      context.props = props;
      if (dsl.value.id) {
        adoptedStyleSheets(
          options.window || window,
          dsl.value.id,
          dsl.value.css || ''
        );
      }

      context.state = createState(Vue, dsl.value.state ?? {}, context);
      const computed = createComputed(Vue, dsl.value.computed ?? {}, context);
      const methods = createMethods(dsl.value.methods ?? {}, context);
      const injects = createInject(Vue, dsl.value.inject, context);
      const dataSources = createDataSources(
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

      return {
        vtj: context
      };
    },
    emits: createEmits(dsl.value.emits),
    expose: ['vtj'],
    render() {
      if (!dsl.value.nodes) return null;
      const nodes: NodeSchema[] = dsl.value.nodes || [];
      if (nodes.length === 1) {
        return nodeRender(nodes[0], context, Vue, loader, nodes);
      } else {
        return nodes.map((child) =>
          nodeRender(child, context, Vue, loader, nodes)
        );
      }
    },
    ...createLifeCycles(dsl.value.lifeCycles ?? {}, context)
  });

  return {
    renderer: Vue.markRaw(renderer),
    context
  };
}

function createEmits(emits: Array<string | BlockEmit> = []) {
  return emits.map((n) => {
    return isString(n) ? n : n.name;
  });
}

function createProps(props: Array<string | BlockProp> = [], context: Context) {
  const getDataType = (type?: BlockPropDataType | BlockPropDataType[]) => {
    if (!type) return undefined;
    const types: BlockPropDataType[] = Array.isArray(type) ? type : [type];
    return types.map((name) => DATA_TYPES[name]);
  };

  return props
    .map((n) => {
      return isString(n)
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
    .reduce(
      (result, current) => {
        result[current.name] = {
          type: getDataType(current.type),
          required: current.required,
          default: current.default
        };
        return result;
      },
      {} as Record<string, any>
    );
}

function createState(Vue: any, state: BlockState, context: Context) {
  return Vue.reactive(
    Object.keys(state || {}).reduce(
      (result, key: string) => {
        let val = (state as any)[key];
        if (isJSExpression(val)) {
          val = context.__parseExpression(val);
        } else if (isJSFunction(val)) {
          val = context.__parseFunction(val);
        }
        result[key] = val;
        return result;
      },
      {} as Record<string, any>
    )
  );
}

function createComputed(
  Vue: any,
  computedSchema: Record<string, JSFunction>,
  context: Context
) {
  return Object.entries(computedSchema ?? {}).reduce(
    (result, [k, v]) => {
      result[k] = Vue.computed(context.__parseFunction(v) as any);
      return result;
    },
    {} as Record<string, any>
  );
}

function createMethods(methods: Record<string, JSFunction>, context: Context) {
  return Object.entries(methods ?? {}).reduce(
    (result, [k, v]) => {
      result[k] = context.__parseFunction(v);
      return result;
    },
    {} as Record<string, any>
  );
}

function createInject(Vue: any, injects: BlockInject[] = [], context: Context) {
  return injects.reduce(
    (result, current) => {
      const { name, from } = current || {};
      current.default;
      const key = isJSExpression(from)
        ? context.__parseExpression(from) || name
        : (from ?? name);
      const value = isJSExpression(current.default)
        ? context.__parseExpression(current.default)
        : (current.default ?? null);
      result[name] = Vue.inject(key, value);
      return result;
    },
    {} as Record<string, any>
  );
}

export function createDataSources(
  dataSources: Record<string, DataSourceSchema>,
  context: Context
) {
  return Object.keys(dataSources).reduce(
    (res, key) => {
      const source = dataSources[key];

      if (source.type === 'mock') {
        res[key] = createMock(source);
      } else {
        if (source.ref) {
          const api = context.$apis[source.ref];
          const transform = isJSFunction(source.transform)
            ? source.transform.value
              ? context.__parseFunction(source.transform)
              : undefined
            : source.transform;

          res[key] = async (...args: any[]) => {
            const res = await api.apply(context, args);
            return transform ? transform(res) : res;
          };
        }
      }
      return res;
    },
    {} as Record<string, DataSourceHandler>
  );
}

function setWatches(Vue: any, watches: BlockWatch[] = [], context: Context) {
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

function createLifeCycles(
  lifeCycle: Record<string, JSFunction>,
  context: Context
) {
  return Object.entries(lifeCycle ?? {}).reduce(
    (result, [k, v]) => {
      result[k] = context.__parseFunction(v);
      return result;
    },
    {} as Record<string, any>
  );
}
