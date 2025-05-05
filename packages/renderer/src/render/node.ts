import * as globalVue from 'vue';
import type { VNode, AppContext, DirectiveArguments } from 'vue';
import {
  type NodeSchema,
  type NodeDirective,
  type JSExpression,
  type NodeProps,
  type NodeEvents,
  type NodeModifiers,
  type JSFunction,
  type NodeChildren,
  type NodeSlot
} from '@vtj/core';
import { camelCase, upperFirst, isString, pick } from '@vtj/utils';
import { type Context } from './context';
import { BUILT_IN_DIRECTIVES } from '../constants';
import {
  toString,
  isJSExpression,
  isJSFunction,
  isBuiltInTag,
  isNativeTag
} from '../utils';
import { defaultLoader, type BlockLoader } from './loader';

export function nodeRender(
  dsl: NodeSchema,
  context: Context,
  Vue: any = globalVue,
  loader: BlockLoader = defaultLoader,
  brothers: NodeSchema[] = [],
  isBranch: boolean = false
): VNode | VNode[] | null {
  if (!dsl || !dsl.name || dsl.invisible) return null;

  const appContext = Vue.getCurrentInstance()?.appContext;

  const { id = null, directives = [] } = dsl;

  const { vIf, vElseIf, vElse, vFor, vShow, vModels, vBind, vHtml, others } =
    getDiretives(directives);
  if (!isBranch && (vElseIf || vElse)) {
    return null;
  }

  // v-if
  if (vIf && !vIfRender(vIf, context)) {
    return branchRender(dsl, context, Vue, loader, brothers);
  }

  const render = (context: Context) => {
    const $components = context.$components;

    const component = (() => {
      // 内置组件 component
      if (dsl.name === 'component') {
        return createBuiltInComponent(context, dsl.props?.is as any);
      }
      // 内置插槽
      if (dsl.name === 'slot') return dsl.name;

      // 组件加载器,默认返回 dsl.name

      const name = loader(dsl.name, dsl.from, Vue);

      if (isString(name)) {
        if (isBuiltInTag(name) || isNativeTag(name)) {
          return name;
        }
        return $components[name] ?? appContext?.app?.component(name) ?? name;
      } else {
        return name;
      }
    })();

    const props = parseNodeProps(id, dsl.props ?? {}, context);
    const events = parseNodeEvents(Vue, dsl.events ?? {}, context);

    // 插槽
    if (dsl.name === 'slot') {
      return renderSlot(Vue, dsl, props, context, loader);
    }

    // v-bind
    if (vBind) {
      Object.assign(props, context.__parseExpression(vBind.value));
    }

    // v-show
    if (vShow) {
      props.style = Object.assign(
        props.style ?? {},
        vShowRender(vShow, context)
      );
    }

    // v-html
    if (vHtml) {
      Object.assign(props, vHtmlRender(vHtml, context));
    }
    // v-model
    vModels.forEach((vModel) => {
      Object.assign(props, vModelRender(Vue, vModel, context));
    });

    const slots = childrenToSlots(
      Vue,
      dsl.children ?? [],
      context,
      loader,
      dsl
    );

    let vnode = Vue.createVNode(component, { ...props, ...events }, slots);

    // v-others 绑定其他指令
    const withDirectives = appContext
      ? createWithDirectives(appContext, others, context)
      : [];
    if (withDirectives.length) {
      vnode = Vue.withDirectives(vnode, withDirectives);
    }

    return vnode;
  };

  // v-for
  if (vFor) {
    return vForRender(vFor, render, context);
  }

  return render(context);
}

function createWithDirectives(
  appContext: AppContext,
  directives: NodeDirective[],
  context: Context
): DirectiveArguments {
  const app = appContext.app;
  return directives
    .map((n) => {
      const directive =
        typeof n.name === 'string'
          ? app.directive(n.name)
          : context.__parseExpression(n.name);
      if (!directive) return null;
      const directiveArgument: any = [directive];
      if (n.value) {
        directiveArgument.push(context.__parseExpression(n.value));
      }
      if (n.arg) {
        directiveArgument.push(n.arg);
      }
      if (n.modifiers) {
        directiveArgument.push(n.modifiers);
      }
      return directiveArgument;
    })
    .filter((n) => !!n);
}

function getDiretives(directives: NodeDirective[] = []) {
  const vIf = directives.find((n) => camelCase(n.name as string) === 'vIf');
  const vElseIf = directives.find(
    (n) => camelCase(n.name as string) === 'vElseIf'
  );
  const vElse = directives.find((n) => camelCase(n.name as string) === 'vElse');
  const vFor = directives.find((n) => camelCase(n.name as string) === 'vFor');
  const vShow = directives.find((n) => camelCase(n.name as string) === 'vShow');
  const vBind = directives.find((n) => camelCase(n.name as string) === 'vBind');
  const vHtml = directives.find((n) => camelCase(n.name as string) === 'vHtml');
  const vModels = directives.filter(
    (n) => camelCase(n.name as string) === 'vModel'
  );
  const others = directives.filter(
    (n) => !BUILT_IN_DIRECTIVES.includes(camelCase(n.name as string))
  );
  return {
    vIf,
    vElseIf,
    vElse,
    vFor,
    vShow,
    vModels,
    vBind,
    others,
    vHtml
  };
}

function vIfRender(directive: NodeDirective, context: Context) {
  const value = context.__parseExpression(directive.value);
  return !!value;
}

function createBuiltInComponent(context: Context, is?: string | JSExpression) {
  if (!is) return 'div';
  return isJSExpression(is) ? context.__parseExpression(is) : is;
}

//修改后
function parseNodeProps(id: string | null, props: NodeProps, context: Context) {
  // 深度解析props
  const _props = deepParseNodeProps(props, context);
  _props.ref = context.__ref(id, _props.ref);
  return _props;
}

// 深度解析props
function deepParseNodeProps(props: any, context: Context): any {
  if (isJSExpression(props)) {
    return context.__parseExpression(props);
  } else if (isJSFunction(props)) {
    return context.__parseFunction(props);
  } else if (Array.isArray(props)) {
    return props.map((item: any) => {
      return deepParseNodeProps(item, context);
    });
  } else if (typeof props === 'object') {
    return Object.keys(props || {}).reduce(
      (result, key: string) => {
        let val = (props as any)[key];
        result[key] = deepParseNodeProps(val, context);
        return result;
      },
      {} as Record<string, any>
    );
  } else {
    return props;
  }
}

function parseNodeEvents(Vue: any, events: NodeEvents, context: Context) {
  const suffixModifiers = ['passive', 'capture', 'once'];
  const suffixMap: Record<string, string> = {
    capture: 'Capture',
    once: 'Once',
    passive: 'OnceCapture'
  };
  return Object.keys(events || {}).reduce(
    (result, key: string) => {
      const event = events[key];
      const modifiers = getModifiers(event.modifiers);
      const suffix = modifiers.find((n) => suffixModifiers.includes(n));
      const name =
        'on' + upperFirst(key) + (suffix ? suffixMap[suffix] || '' : '');

      const handler = context.__parseFunction(event.handler);
      if (handler) {
        result[name] = Vue.withModifiers(handler, modifiers);
      }
      return result;
    },
    {} as Record<string, any>
  );
}

function branchRender(
  dsl: NodeSchema,
  context: Context,
  Vue: any,
  loader: BlockLoader,
  brothers: NodeSchema[] = []
) {
  let index = brothers.findIndex((n) => n.id === dsl.id);
  for (let i = ++index; i < brothers.length; i++) {
    const { directives = [] } = brothers[i];
    const { vElseIf, vElse } = getDiretives(directives);
    console.log(directives);
    if (vElseIf) {
      if (!!context.__parseExpression(vElseIf.value)) {
        return nodeRender(brothers[i], context, Vue, loader, brothers, true);
      } else {
        continue;
      }
    }

    if (vElse) {
      return nodeRender(brothers[i], context, Vue, loader, brothers, true);
    }
  }
  return null;
}

export function getModifiers(
  modifiers: NodeModifiers = {},
  isToString: boolean = false
) {
  const keys = Object.keys(modifiers);
  return isToString ? keys.map((n) => '.' + n) : keys;
}

function renderSlot(
  Vue: any,
  node: NodeSchema,
  props: Record<string, any>,
  context: Context,
  loader: BlockLoader
) {
  const { children } = node;
  const realSlot = getNodeSlot(node, context);
  const slotFunc = context.$slots?.[realSlot.name];
  if (slotFunc) {
    return slotFunc(props) as unknown as VNode;
  } else {
    if (!children) return null;

    if (isString(children)) {
      return Vue.createTextVNode(children);
    }

    if (isJSExpression(children)) {
      return Vue.createTextVNode(
        toString(context.__parseExpression(children as JSExpression))
      );
    }

    if (Array.isArray(children)) {
      return children.map((n) =>
        nodeRender(n, context, Vue, loader, children)
      ) as VNode[];
    }
    return null;
  }
}

function getNodeSlot(dsl: NodeSchema, context: Context) {
  const { props } = dsl;
  const name = props?.name || 'default';
  return {
    name: isJSExpression(name) ? context.__parseExpression(name) : name,
    params: []
  };
}

function vShowRender(directive: NodeDirective, context: Context) {
  const value = context.__parseExpression(directive.value);
  return !!value
    ? {}
    : {
        display: 'none'
      };
}

function vHtmlRender(directive: NodeDirective, context: Context) {
  const value = context.__parseExpression(directive.value);
  return {
    innerHTML: value || ''
  };
}

function vModelRender(Vue: any, directive: NodeDirective, context: Context) {
  const handler: JSFunction = {
    type: 'JSFunction',
    value: directive.value?.value
      ? `(v) => {
        ${directive.value.value} = v;
      }`
      : `(v) => {}`
  };
  const func = context.__parseFunction(handler);
  // todo: 实现 lazy trim number 修饰符
  const modifiers = getModifiers(
    isJSExpression(directive.modifiers)
      ? context.__parseExpression(directive.modifiers)
      : directive.modifiers
  );
  const arg = isJSExpression(directive.arg)
    ? context.__parseExpression(directive.arg)
    : directive.arg || 'modelValue';
  return {
    [arg]: context.__parseExpression(directive.value),
    [`onUpdate:${arg}`]:
      modifiers.length && func ? Vue.withModifiers(func, modifiers) : func
  };
}

function childrenToSlots(
  Vue: any,
  children: NodeChildren,
  context: Context,
  loader: BlockLoader,
  parent?: NodeSchema
) {
  if (!children) return null;
  if (isString(children)) {
    return { default: () => children };
  }
  if (isJSExpression(children)) {
    return {
      default: () =>
        toString(context.__parseExpression(children as JSExpression))
    };
  }
  if (Array.isArray(children) && children.length > 0) {
    const slots = createSlotsConfig(children);
    const getScope = (scope: any) => {
      if (!scope || !parent) return {};
      if (parent?.id && Object.keys(scope).length) {
        return {
          [`scope_${parent.id}`]: scope
        };
      }
      return {};
    };
    return Object.entries(slots).reduce((result, [name, { nodes, params }]) => {
      result[name] = (scope: any) => {
        // 记录插槽上下文
        const props = params.length
          ? pick(scope ?? {}, params)
          : getScope(scope);

        return nodes.map((node) =>
          nodeRender(node, context.__clone(props), Vue, loader, nodes)
        );
      };
      return result;
    }, {} as any);
  }
  return null;
}

function createSlotsConfig(nodes: NodeSchema[]) {
  const config: Record<string, { params: string[]; nodes: NodeSchema[] }> = {
    default: {
      params: [],
      nodes: []
    }
  };
  for (const node of nodes) {
    const slot = parseSlot(node.slot);
    const slotName = slot.name;
    if (config[slotName]) {
      config[slotName].nodes.push(node);
      config[slotName].params = config[slotName].params.concat(slot.params);
    } else {
      config[slotName] = {
        nodes: [node],
        params: slot.params
      };
    }
  }
  return config;
}

function parseSlot(slot: string | NodeSlot = 'default') {
  return isString(slot) ? { name: slot, params: [] } : { params: [], ...slot };
}

function vForRender(
  directive: NodeDirective,
  render: (context: Context) => VNode | Array<VNode | null> | null,
  context: Context
) {
  const { value, iterator } = directive;
  const { item = 'item', index = 'index' } = iterator || {};

  let items = context.__parseExpression(value) || [];
  if (Number.isInteger(items)) {
    items = new Array(items).fill(true).map((_n, i) => i + 1);
  }
  if (!Array.isArray(items)) {
    console.warn('[vForRender]:', `${value?.value} is not a Arrary`);
    return [] as any;
  }
  return items.map((_item: any, _index: number) => {
    return render(context.__clone({ [item]: _item, [index]: _index }));
  });
}
