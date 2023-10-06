import type { VNode } from 'vue';
import type {
  NodeSchema,
  NodeChildrenSchema,
  PropsSchema,
  NodeDirectiveSchema,
  JSFunction,
  JSExpression,
  NodeSlotSchema,
  NodeEventsSchema
} from '../core';
import {
  isString,
  isJSExpression,
  isJSFunction,
  pick,
  toString,
  getModifiers,
  upperFirst,
  getDiretives
} from '../utils';

import { Context } from './context';

function vForRender(
  directive: NodeDirectiveSchema,
  render: (context: Context) => VNode | Array<VNode | null> | null,
  context: Context
) {
  const { value, iterator } = directive;
  const { item = 'item', index = 'index' } = iterator || {};

  let items = context.__parseExpression(value) || [];
  if (Number.isInteger(items)) {
    items = new Array(items).fill(true).map((n, i) => i + 1);
  }
  if (!Array.isArray(items)) {
    console.warn('[vForRender]:', `${value?.value} is not a Arrary`);
    return [] as any;
  }
  return items.map((_item: any, _index: number) => {
    return render(context.__clone({ [item]: _item, [index]: _index }));
  });
}

function vIfRender(directive: NodeDirectiveSchema, context: Context) {
  const value = context.__parseExpression(directive.value);
  return !!value;
}

function vShowRender(directive: NodeDirectiveSchema, context: Context) {
  const value = context.__parseExpression(directive.value);
  return !!value
    ? {}
    : {
        display: 'none'
      };
}

function vModelRender(
  Vue: any,
  directive: NodeDirectiveSchema,
  context: Context
) {
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
  const modifiers = getModifiers(directive.modifiers);
  const arg = isJSExpression(directive.arg)
    ? context.__parseExpression(directive.arg)
    : directive.arg || 'modelValue';
  return {
    modelValue: context.__parseExpression(directive.value),
    [`onUpdate:${arg}`]:
      modifiers.length && func ? Vue.withModifiers(func, modifiers) : func
  };
}

function parseSlot(slot: string | NodeSlotSchema = 'default') {
  return typeof slot === 'string'
    ? { name: slot, params: [] }
    : { params: [], ...slot };
}

function getNodeSlot(node: NodeSchema, context: Context) {
  const { props } = node;
  const name = props?.name || 'default';
  return {
    name: isJSExpression(name) ? context.__parseExpression(name) : name,
    params: []
  };
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

function childrenToSlots(
  Vue: any,
  children: NodeChildrenSchema,
  context: Context,
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
  if (Array.isArray(children)) {
    const slots = createSlotsConfig(children);
    const getScope = (scope: any) => {
      if (!scope || !parent) return {};
      if (parent?.id) {
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
          nodeRenderer(Vue, node, context.__clone(props))
        );
      };
      return result;
    }, {} as any);
  }
}

function parseNodeProps(
  id: string | null,
  props: PropsSchema,
  context: Context
) {
  const _props = Object.keys(props || {}).reduce(
    (result, key: string) => {
      let val = (props as any)[key];
      if (isJSExpression(val)) {
        val = context.__parseExpression(val);
      } else if (isJSFunction(val)) {
        val = context.__parseFunction(val);
      }
      result[key] = val;
      return result;
    },
    {} as Record<string, any>
  );
  _props.ref = context.__ref(id, _props.ref);

  return _props;
}

function parseNodeEvents(Vue: any, events: NodeEventsSchema, context: Context) {
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

function renderSlot(
  Vue: any,
  node: NodeSchema,
  props: Record<string, any>,
  context: Context
) {
  const { children } = node;
  // const realSlot = parseSlot(slot);
  const realSlot = getNodeSlot(node, context);
  const slotFunc = context.$slots?.[realSlot.name];
  if (slotFunc) {
    return slotFunc(props) as unknown as VNode;
  } else {
    if (!children) return null;

    if (typeof children === 'string') {
      return Vue.createTextVNode(children);
    }

    if (isJSExpression(children)) {
      return Vue.createTextVNode(
        toString(context.__parseExpression(children as JSExpression))
      );
    }

    if (Array.isArray(children)) {
      return children.map((n) => nodeRenderer(Vue, n, context)) as VNode[];
    }
    return null;
  }
}

function createBuiltInComponent(context: Context, is?: string | JSExpression) {
  if (!is) return 'div';
  return isJSExpression(is) ? context.__parseExpression(is) : is;
}

export function nodeRenderer(
  Vue: any,
  node: NodeSchema,
  context: Context
): VNode | VNode[] | null {
  if (!node || !node.name || node.invisible) return null;

  const { id = null, directives = [] } = node;

  const { vIf, vFor, vShow, vModels, vBind } = getDiretives(directives);

  // v-if
  if (vIf && !vIfRender(vIf, context)) {
    return null;
  }

  const render = (context: Context) => {
    const $components = context.$components;

    const component = (() => {
      // 内置组件 component
      if (node.name === 'component') {
        return createBuiltInComponent(context, (node.props as any).is);
      }
      // 内置插槽
      if (node.name === 'slot') return node.name;
      const name = context.__loader(Vue, node.name, node.from);
      return typeof name === 'string' ? $components[name] ?? name : name;
    })();

    const props = parseNodeProps(id, node.props ?? {}, context);
    const events = parseNodeEvents(Vue, node.events ?? {}, context);

    // 插槽
    if (node.name === 'slot') {
      return renderSlot(Vue, node, props, context);
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
    // v-model
    vModels.forEach((vModel) => {
      Object.assign(props, vModelRender(Vue, vModel, context));
    });

    // todo: v-others 绑定其他指令

    const slots = childrenToSlots(Vue, node.children ?? [], context, node);

    return Vue.createVNode(component, { ...props, ...events }, slots);
  };

  // v-for
  if (vFor) {
    return vForRender(vFor, render, context);
  }

  return render(context);
}
