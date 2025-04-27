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
  type NodeFromUrlSchema,
  type NodeFromPlugin,
  BUILT_IN_TAGS
} from '@vtj/core';
import { isPlainObject, camelCase, dedupArray, kebabCase } from '@vtj/base';
import {
  isJSExpression,
  parseValue,
  parsePlainObjectValue,
  getModifiers,
  replaceComputedValue,
  replaceThis,
  isJSCode
} from '../utils';

export const NO_END_TAGS = [
  'img',
  'input',
  'br',
  'hr',
  'area',
  'base',
  'col',
  'embed',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
];

/**
 * 内置指令
 */
export const BUILT_IN_DIRECTIVES = [
  'vIf',
  'vShow',
  'vModel',
  'vFor',
  'vBind',
  'vHtml'
];

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
  const defineDirectives: string[] = [];
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
        child,
        id as string,
        child.props,
        child.events,
        context,
        computedKeys
      );

      const directives = parseDirectives(
        child.directives,
        computedKeys,
        defineDirectives
      ).join(' ');
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
      const tagName = ['@dcloudio/uni-h5', '@dcloudio/uni-ui'].includes(
        (from || componentMap.get(name)?.package) as string
      )
        ? kebabCase(name)
        : isFromUrlSchema(from) || isFromPlugin(from)
          ? 'component'
          : name;
      contents.push(
        NO_END_TAGS.includes(tagName)
          ? `<${tagName} ${directives} ${props} ${events} />`
          : `<${tagName} ${directives} ${props} ${events}>${childContent ? '\n' + childContent.trim() : ''}</${tagName}>`
      );
    }
    const node = wrapSlot(item.slot, contents.join('\n'), parent?.id);
    nodes.push(node);
  });

  return {
    nodes,
    methods,
    directives: directivesRegister(defineDirectives),
    components: dedupArray(components) as string[],
    importBlocks: dedupArray<{ id: string; name: string }>(importBlocks, 'id')
  };
}

function directivesRegister(directives: string[]) {
  return dedupArray(directives).map((name) => {
    const key = name.startsWith('v') ? name.substring(1) : name;
    return `${key}:${name}`;
  });
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

  if (isFromSchema(from) || desc) {
    return name;
  }

  return null;
}

function isFromSchema(from?: NodeFrom): from is NodeFromSchema {
  return !!from && typeof from === 'object' && from.type === 'Schema';
}

function isFromUrlSchema(from?: NodeFrom): from is NodeFromUrlSchema {
  return typeof from === 'object' && from.type === 'UrlSchema';
}

function isFromPlugin(from?: NodeFrom): from is NodeFromPlugin {
  return typeof from === 'object' && from.type === 'Plugin';
}

function bindProp(name: string, value: unknown, computedKeys: string[] = []) {
  if (name === 'style') {
    return isJSCode(value)
      ? `:style="${parseValue({
          ...value,
          value: replaceComputedValue(value.value, computedKeys)
        })}"`
      : '';
  }
  if (name === '__class' && isJSCode(value)) {
    return `:class="${parseValue({
      ...value,
      value: replaceComputedValue(value.value, computedKeys)
    })}"`;
  }

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

function bindNodeProps(
  node: NodeSchema,
  props: NodeProps = {},
  computedKeys: string[] = []
) {
  const hasStyle = !!Object.keys(props.style || {}).length;
  if (hasStyle) {
    const className = `${node.name}_${node.id}`;
    if (props.class) {
      if (typeof props.class === 'string') {
        props.class = [props.class, className].join(' ');
      } else {
        props.__class = props.class;
        props.class = className;
      }
    } else {
      props.class = className;
    }
    if (!isJSCode(props.style)) {
      delete props.style;
    }
  }
  const from = node.from;
  if (isFromUrlSchema(from) || isFromPlugin(from)) {
    props.is = {
      type: 'JSExpression',
      value: node.name
    };
  }
  return Object.entries(props).map(([name, value]) => {
    return bindProp(name, value, computedKeys);
  });
}

function bindEvent(
  name: string,
  value: NodeEvent,
  binder: string,
  nodeContext: string[],
  isExp: boolean
) {
  const modifiers = getModifiers(value.modifiers, true);
  if (isExp) {
    return `@${name}${modifiers.join('')}="${binder}"`;
  }
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
      : `${camelCase(name)}_${id}${eventParams}`;
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
    return bindEvent(name, value, binder, nodeContext, isExp);
  });
  return {
    binders,
    handlers
  };
}

function parsePropsAndEvents(
  node: NodeSchema,
  id: string,
  props: NodeProps = {},
  events: NodeEvents = {},
  context: Record<string, Set<string>> = {},
  computedKeys: string[]
) {
  const { binders, handlers } = bindNodeEvents(id, events, context);
  return {
    props: bindNodeProps(node, props, computedKeys).join(' '),
    handlers,
    binders,
    events: binders.join(' ')
  };
}

function parseDirectives(
  directives: NodeDirective[] = [],
  computedKeys: string[] = [],
  output: string[] = []
) {
  const result: string[] = [];
  const { vIf, vShow, vModels, vFor, vBind, vHtml, customDirectives } =
    getDiretives(directives);
  if (vIf) {
    result.push(`v-if="${parseValue(vIf.value, true, true, computedKeys)}"`);
  }
  if (vShow) {
    result.push(
      `v-show="${parseValue(vShow.value, true, true, computedKeys)}"`
    );
  }

  if (vBind) {
    result.push(
      `v-bind="${parseValue(vBind.value, true, true, computedKeys)}"`
    );
  }

  vModels.forEach((vModel) => {
    const modifiers = getModifiers(vModel.modifiers, true);
    const arg = vModel.arg
      ? isJSExpression(vModel.arg)
        ? `:[${parseValue(vModel.arg, true, true, computedKeys)}]`
        : `:${vModel.arg}`
      : '';
    result.push(
      `v-model${arg}${modifiers}="${parseValue(vModel.value, true, true, computedKeys)}"`
    );
  });

  if (vFor) {
    const { item, index } = { item: 'item', index: 'index', ...vFor.iterator };
    result.push(
      `v-for="(${item}, ${index}) in ${parseValue(vFor.value, true, true, computedKeys)}"`
    );
  }

  if (vHtml) {
    result.push(
      `v-html="${parseValue(vHtml.value, true, true, computedKeys)}"`
    );
  }

  if (customDirectives && customDirectives.length) {
    customDirectives.forEach((dir) => {
      if (!dir.name) return;
      let leftExp = '';
      let source = '';
      if (isJSExpression(dir.name)) {
        source = parseValue(dir.name, true, true, computedKeys);
        output.push(source);
      } else {
        source = dir.name;
      }
      const name = source?.startsWith('v')
        ? kebabCase(source)
        : kebabCase('v-' + source);

      leftExp += name;

      if (dir.arg) {
        if (isJSExpression(dir.arg)) {
          leftExp += `:[${parseValue(dir.name, true, true, computedKeys)}]`;
        } else {
          leftExp += `:${dir.arg}`;
        }
      }
      if (dir.modifiers) {
        const keys = Object.keys(dir.modifiers);
        if (keys.length) {
          leftExp += keys.map((n) => '.' + n);
        }
      }
      if (dir.value) {
        result.push(
          `${leftExp}="${parseValue(dir.value, true, true, computedKeys)}"`
        );
      } else {
        result.push(leftExp);
      }
    });
  }
  // todo: 实现others 指令
  return result;
}

function getDiretives(directives: NodeDirective[] = []) {
  const builtInDirectives = directives.filter((n) =>
    BUILT_IN_DIRECTIVES.includes(n.name as string)
  );

  const customDirectives = directives.filter(
    (n) => !BUILT_IN_DIRECTIVES.includes(n.name as string)
  );

  const vIf = builtInDirectives.find(
    (n) => camelCase(n.name as string) === 'vIf'
  );
  const vFor = builtInDirectives.find(
    (n) => camelCase(n.name as string) === 'vFor'
  );
  const vShow = builtInDirectives.find(
    (n) => camelCase(n.name as string) === 'vShow'
  );
  const vBind = builtInDirectives.find(
    (n) => camelCase(n.name as string) === 'vBind'
  );
  const vHtml = builtInDirectives.find(
    (n) => camelCase(n.name as string) === 'vHtml'
  );
  const vModels = builtInDirectives.filter(
    (n) => camelCase(n.name as string) === 'vModel'
  );
  return {
    vIf,
    vFor,
    vShow,
    vModels,
    vBind,
    vHtml,
    customDirectives
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
    const content = parseValue(children, false, true, computedKeys) as string;

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
