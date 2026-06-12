import {
  type BlockSchema,
  type BlockProp,
  type BlockPropDataType,
  type BlockState,
  type JSFunction,
  type JSExpression,
  type JSONValue,
  type BlockInject,
  type BlockComposable,
  type DataSourceSchema,
  type BlockWatch,
  type NodeSchema,
  type BlockEmit
} from '@vtj/core';
import { isString, isFunction, delay } from '@vtj/utils';
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
  UniApp?: any;
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
    UniApp = {},
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
    __scopeId: dsl.value.id ? `data-v-${dsl.value.id}` : undefined,
    props: {
      ...createProps(dsl.value.props ?? [], context)
    },
    async setup(props: any = {}) {
      context.$props = props;
      context.props = props;
      if (dsl.value.id) {
        adoptedStyleSheets(
          options.window || window,
          dsl.value.id,
          dsl.value.css || '',
          true
        );
      }

      context.state = createState(Vue, dsl.value.state ?? {}, context);
      const isComposition = dsl.value.apiMode === 'composition';
      // 状态创建：根据模式分流
      const refs = isComposition
        ? createRefs(Vue, dsl.value.refs ?? {}, context)
        : {};
      const reactives = isComposition
        ? createReactives(Vue, dsl.value.reactives ?? {}, context)
        : {};
      const computed = createComputed(Vue, dsl.value.computed ?? {}, context);
      const methods = createMethods(dsl.value.methods ?? {}, context);
      const injects = createInject(Vue, dsl.value.inject, context);
      const dataSources = createDataSources(
        dsl.value.dataSources || {},
        context
      );

      // Composition 模式特有逻辑
      let composableResults = {};
      if (isComposition) {
        composableResults = createComposables(
          Vue,
          dsl.value.composables ?? [],
          context
        );
        createProvide(Vue, dsl.value.provide ?? {}, context);
      }

      const attrs = {
        ...props,
        ...refs,
        ...reactives,
        ...injects,
        ...computed,
        ...methods,
        ...dataSources,
        ...composableResults
      };
      context.setup(attrs, Vue);
      setWatches(Vue, dsl.value.watch ?? [], context);

      // Composition 模式下生命周期在 setup 内注册
      if (isComposition) {
        await createCompositionLifeCycles(
          Vue,
          dsl.value.lifeCycles ?? {},
          context,
          UniApp
        );
        // 执行 setup 初始化代码
        if (dsl.value.setup) {
          const setupFn = context.__parseFunction(dsl.value.setup);
          if (isFunction(setupFn)) {
            await setupFn();
          }
        }
      }

      return {
        vtj: context,
        state: context.state,
        ...props,
        ...refs,
        ...reactives,
        ...computed,
        ...methods
      };
    },
    emits: createEmits(dsl.value.emits),
    expose: ['vtj', ...(dsl.value.expose || [])],
    render() {
      if (!dsl.value.nodes) return null;
      const nodes: NodeSchema[] = dsl.value.nodes || [];
      if (nodes.length === 1) {
        return nodeRender(nodes[0], context, Vue, loader, nodes);
      } else {
        const children = nodes
          .map((child) => nodeRender(child, context, Vue, loader, nodes))
          .flat();
        return Vue.createVNode('div', {}, children);
      }
    },
    // Options 模式下生命周期以 Options 风格注册
    ...(dsl.value.apiMode !== 'composition'
      ? createLifeCycles(dsl.value.lifeCycles ?? {}, context)
      : {})
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
  computedSchema: Record<string, JSFunction | JSExpression>,
  context: Context
) {
  return Object.entries(computedSchema ?? {}).reduce(
    (result, [k, v]) => {
      if (isJSFunction(v)) {
        result[k] = Vue.computed(context.__parseFunction(v) as any);
      } else {
        result[k] = Vue.computed(context.__parseExpression(v) as any);
      }
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
        immediate: n.immediate,
        flush: n.flush
      }
    );
  });
}

function createRefs(
  Vue: any,
  refs: Record<string, JSONValue | JSExpression>,
  context: Context
) {
  return Object.entries(refs).reduce(
    (result, [key, val]) => {
      const value = isJSExpression(val) ? context.__parseExpression(val) : val;
      result[key] = Vue.ref(value);
      return result;
    },
    {} as Record<string, any>
  );
}

function createReactives(
  Vue: any,
  reactives: Record<string, JSONValue | JSExpression>,
  context: Context
) {
  return Object.entries(reactives).reduce(
    (result, [key, val]) => {
      const value = isJSExpression(val) ? context.__parseExpression(val) : val;
      result[key] = Vue.reactive(value ?? {});
      return result;
    },
    {} as Record<string, any>
  );
}

function createComposables(
  _Vue: any,
  composables: BlockComposable[],
  context: Context
) {
  return composables.reduce(
    (result, item) => {
      try {
        // 从 composable 表达式中解析函数
        // composable 是 JSExpression，例如: this.$libs.VueUse.useDark
        let fn: Function | undefined;

        if (isJSExpression(item.composable)) {
          // 解析表达式获取函数引用
          fn = context.__parseExpression(item.composable);
        } else if (isString(item.composable)) {
          // 兼容旧协议：字符串形式的函数名（从 $libs 中查找）
          fn = context.$libs[item.composable];
        }

        if (isFunction(fn)) {
          // 解析参数
          const args = (item.args || []).map((arg: any) =>
            isJSExpression(arg) ? context.__parseExpression(arg) : arg
          );
          const callResult = fn(...args);
          if (item.destructure && item.destructure.length > 0) {
            // 解构赋值
            for (const field of item.destructure) {
              result[field] = callResult?.[field];
            }
          } else {
            result[item.name] = callResult;
          }
        }
      } catch (e) {
        // 设计模式下降级处理
        if (context.__mode === ContextMode.Design) {
          console.warn(`[VTJ] composable 执行失败，已降级处理`, e);
          result[item.name] = {};
        }
      }
      return result;
    },
    {} as Record<string, any>
  );
}

function createProvide(
  Vue: any,
  provide: Record<string, any>,
  context: Context
) {
  Object.entries(provide).forEach(([key, val]) => {
    let value = val;
    if (isJSExpression(val)) {
      value = context.__parseExpression(val);
    } else if (isJSFunction(val)) {
      value = context.__parseFunction(val);
    }
    Vue.provide(key, value);
  });
}

async function createCompositionLifeCycles(
  Vue: any,
  lifeCycles: Record<string, JSFunction>,
  context: Context,
  UniApp: any = {}
) {
  // Options API → Composition API 生命周期名称映射
  const optionsToCompositionMap: Record<string, string> = {
    beforeMount: 'onBeforeMount',
    mounted: 'onMounted',
    beforeUpdate: 'onBeforeUpdate',
    updated: 'onUpdated',
    beforeUnmount: 'onBeforeUnmount',
    unmounted: 'onUnmounted',
    errorCaptured: 'onErrorCaptured',
    renderTracked: 'onRenderTracked',
    renderTriggered: 'onRenderTriggered',
    activated: 'onActivated',
    deactivated: 'onDeactivated'
  };

  const hookMap: Record<string, Function> = {
    onBeforeMount: Vue.onBeforeMount,
    onMounted: Vue.onMounted,
    onBeforeUpdate: Vue.onBeforeUpdate,
    onUpdated: Vue.onUpdated,
    onBeforeUnmount: Vue.onBeforeUnmount,
    onUnmounted: Vue.onUnmounted,
    onErrorCaptured: Vue.onErrorCaptured,
    onRenderTracked: Vue.onRenderTracked,
    onRenderTriggered: Vue.onRenderTriggered,
    onActivated: Vue.onActivated,
    onDeactivated: Vue.onDeactivated
  };

  for (const [name, code] of Object.entries(lifeCycles)) {
    // created/beforeCreate 在 Composition 模式下等价于 setup，立即执行
    if (name === 'created' || name === 'beforeCreate') {
      const fn = context.__parseFunction(code);
      if (isFunction(fn)) {
        await fn();
      }
      continue;
    }
    // 兼容 Options API 命名，自动映射为 Composition API
    const hookName = optionsToCompositionMap[name] || name;
    const hook = hookMap[hookName] || UniApp[hookName];
    if (hook && isFunction(hook)) {
      const fn = context.__parseFunction(code);
      if (isFunction(fn)) {
        hook(async () => {
          await delay(0);
          await fn();
        });
      }
    } else {
      console.warn(`[VTJ] 无效的 Composition 生命周期钩子 "${name}"`);
    }
  }
}

function createLifeCycles(
  lifeCycle: Record<string, JSFunction>,
  context: Context
) {
  return Object.entries(lifeCycle ?? {}).reduce(
    (result, [k, v]) => {
      const func = context.__parseFunction(v);
      result[k] = async () => {
        if (isFunction(func)) {
          await delay(0);
          await func();
        }
      };
      return result;
    },
    {} as Record<string, any>
  );
}
