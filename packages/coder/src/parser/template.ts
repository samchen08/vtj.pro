import {
  type NodeSchema,
  type MaterialDescription,
  type JSFunction,
  type NodeSlot,
  type NodeFrom,
  type NodeFromSchema,
  type NodeProps,
  type NodeEvent,
  type NodeEvents,
  type NodeDirective,
  type NodeChildren,
  BUILT_IN_TAGS
} from '@vtj/core';
import { isPlainObject, camelCase, dedupArray } from '@vtj/base';
import {
  isJSExpression,
  parseValue,
  parsePlainObjectValue,
  getModifiers,
  replaceComputedValue,
  replaceThis,
  isJSCode
} from '../utils';

export function parseTemplate(
  children: NodeSchema[],
  componentMap: Map<string, MaterialDescription>,
  computedKeys: string[] = [],
  context: Record<string, Set<string>> = {},
  parent?: NodeSchema
) {
  const nodes: string[] = [];
  let methods: Record<string, JSFunction> = {};
  let components: string[] = [];
  let importBlocks: { id: string; name: string }[] = [];
  const slots = groupBySlot(children);
  slots.forEach((item) => {
    const contents: string[] = [];
    for (const child of item.children) {
      let { id, name, invisible, from } = child;
      if (invisible) {
        continue;
      }
      // 收集引用组件名
      const component = getComponentName(name, componentMap, from);
      if (component) {
        components.push(component);
      }
      // 收集引用区块
      if (isFromSchema(from)) {
        importBlocks.push({ id: from.id, name });
      }

      // 收集属性和事件
      const { props, events, handlers } = parsePropsAndEvents(
        id as string,
        child.props,
        child.events,
        context,
        computedKeys
      );

      const directives = parseDirectives(child.directives).join(' ');
      const nodeChildren = child.children
        ? parseNodeChildren(
            child.children,
            computedKeys,
            componentMap,
            context,
            child
          )
        : '';
      Object.assign(methods, handlers);
      let childContent = '';
      if (typeof nodeChildren === 'string') {
        childContent = nodeChildren;
      } else {
        childContent = (nodeChildren?.nodes || []).join('\n');
        Object.assign(methods, nodeChildren?.methods || {});
        components = components.concat(nodeChildren?.components || []);
        importBlocks = importBlocks.concat(nodeChildren?.importBlocks || []);
      }

      contents.push(
        name === 'img'
          ? `<${name} ${directives} ${props} ${events} />`
          : `<${name} ${directives} ${props} ${events}>${childContent.trim()}</${name}>`
      );
    }
    const node = wrapSlot(item.slot, contents.join('\n'), parent?.id);
    nodes.push(node);
  });
  return {
    nodes,
    methods,
    components: dedupArray(components) as string[],
    importBlocks: dedupArray<{ id: string; name: string }>(importBlocks, 'id')
  };
}

function groupBySlot(children: NodeSchema[] = []) {
  const slots: Map<
    string | undefined,
    {
      slot: string | NodeSlot | undefined;
      children: NodeSchema[];
    }
  > = new Map();
  for (const child of children) {
    const key = typeof child.slot === 'string' ? child.slot : child.slot?.name;
    const value = slots.get(key);
    if (value) {
      value.children.push(child);
    } else {
      slots.set(key, { slot: child.slot, children: [child] });
    }
  }
  return slots;
}

function getComponentName(
  name: string,
  componentMap: Map<string, MaterialDescription>,
  from?: NodeFrom
) {
  if (BUILT_IN_TAGS.includes(name)) return null;

  const desc = componentMap.get(name);
  if (desc && desc.alias) {
    const aliasName = desc.parent ? `${desc.parent}.${desc.alias}` : desc.alias;
    return `${name}: ${aliasName}`;
  }

  if (from || desc) {
    return name;
  }

  return null;
}

function isFromSchema(from?: NodeFrom): from is NodeFromSchema {
  return !!from && typeof from === 'object' && from.type === 'Schema';
}

function bindProp(name: string, value: unknown, computedKeys: string[] = []) {
  if (typeof value === 'string') {
    return `${name}="${value}"`;
  } else if (isJSCode(value)) {
    return `:${name}="${parseValue({
      ...value,
      value: replaceComputedValue(value.value, computedKeys)
    })}"`;
  } else if (isPlainObject(value)) {
    return `:${name}='{${parsePlainObjectValue(
      value as Record<string, any>
    ).join(', ')}}'`;
  } else {
    return `:${name}='${JSON.stringify(value)}'`;
  }
}

function bindNodeProps(props: NodeProps = {}, computedKeys: string[] = []) {
  return Object.entries(props).map(([name, value]) => {
    return bindProp(name, value, computedKeys);
  });
}

function bindEvent(
  name: string,
  value: NodeEvent,
  binder: string,
  nodeContext: string[]
) {
  const modifiers = getModifiers(value.modifiers, true);
  if (nodeContext && nodeContext.length > 0) {
    return `@${name}${modifiers.join('')}="(...args:any[]) => ${binder}"`;
  }
  return `@${name}${modifiers.join('')}="${binder}"`;
}

function bindNodeEvents(
  id: string,
  events: NodeEvents = {},
  context: Record<string, Set<string>> = {}
) {
  const handlers: Record<string, JSFunction> = {};
  const nodeContext = Array.from(context[id] || new Set([]));
  const eventParams = nodeContext.length
    ? `({${nodeContext.join(', ')}}, args)`
    : '';
  const binders = Object.entries(events).map(([name, value]) => {
    const isExp = value.handler.value.startsWith('this.');
    const binder = isExp
      ? replaceThis(value.handler.value)
      : `${camelCase(name)}_handler_${id}${eventParams}`;
    if (!isExp) {
      handlers[binder] = nodeContext.length
        ? {
            type: 'JSFunction',
            value: `{
          return (${value.handler.value}).apply(this, args);
        }`
          }
        : value.handler;
    }
    return bindEvent(name, value, binder, nodeContext);
  });
  return {
    binders,
    handlers
  };
}

function parsePropsAndEvents(
  id: string,
  props: NodeProps = {},
  events: NodeEvents = {},
  context: Record<string, Set<string>> = {},
  computedKeys: string[]
) {
  const { binders, handlers } = bindNodeEvents(id, events, context);
  return {
    props: bindNodeProps(props, computedKeys).join(' '),
    handlers,
    binders,
    events: binders.join(' ')
  };
}

function parseDirectives(directives: NodeDirective[] = []) {
  const result: string[] = [];
  const { vIf, vShow, vModels, vFor } = getDiretives(directives);
  if (vIf) {
    result.push(`v-if="${parseValue(vIf.value)}"`);
  }
  if (vShow) {
    result.push(`v-show="${parseValue(vShow.value)}"`);
  }

  vModels.forEach((vModel) => {
    const modifiers = getModifiers(vModel.modifiers, true);
    const arg = vModel.arg
      ? isJSExpression(vModel.arg)
        ? `:[${parseValue(vModel.arg)}]`
        : `:${vModel.arg}`
      : '';
    result.push(`v-model${arg}${modifiers}="${parseValue(vModel.value)}"`);
  });

  if (vFor) {
    const { item, index } = { item: 'item', index: 'index', ...vFor.iterator };
    result.push(`v-for="(${item}, ${index}) in ${parseValue(vFor.value)}"`);
  }
  // todo: 实现others 指令
  return result;
}

function getDiretives(directives: NodeDirective[] = []) {
  const vIf = directives.find((n) => camelCase(n.name) === 'vIf');
  const vFor = directives.find((n) => camelCase(n.name) === 'vFor');
  const vShow = directives.find((n) => camelCase(n.name) === 'vShow');
  const vBind = directives.find((n) => camelCase(n.name) === 'vBind');
  const vModels = directives.filter((n) => camelCase(n.name) === 'vModel');
  return {
    vIf,
    vFor,
    vShow,
    vModels,
    vBind
  };
}

function parseNodeChildren(
  children: NodeChildren,
  computedKeys: string[],
  componentMap: Map<string, MaterialDescription>,
  context: Record<string, Set<string>>,
  parent?: NodeSchema
) {
  if (typeof children === 'string') {
    return children;
  }

  if (isJSExpression(children)) {
    let content = parseValue(children, false) as string;
    content = replaceComputedValue(content, computedKeys);
    content = replaceThis(content);
    return `{{ ${content} }}`;
  }

  if (Array.isArray(children)) {
    return parseTemplate(children, componentMap, computedKeys, context, parent);
  }

  return '';
}

function wrapSlot(
  slot: string | NodeSlot | undefined,
  content: string,
  nodeId?: string
) {
  if (!slot) return content;
  const realSlot =
    typeof slot === 'string'
      ? { name: slot, params: [] }
      : { params: [], ...slot };
  const slotString = `#${realSlot.name}="${
    realSlot.params?.length > 0
      ? `{${realSlot.params?.join(',')}}`
      : `scope_${nodeId}`
  }"`;
  return `<template ${slotString}>
    ${content}
    </template>`;
}
