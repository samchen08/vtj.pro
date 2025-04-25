import {
  type NodeSchema,
  type NodeProps,
  type NodeEvents,
  type JSExpression,
  type NodeDirective,
  type BlockSlot,
  type JSFunction
} from '@vtj/core';
import { compileTemplate } from '@vue/compiler-sfc';
import {
  NodeTypes,
  type TemplateChildNode,
  type AttributeNode,
  type DirectiveNode,
  type ElementNode,
  type IfNode,
  type ForNode,
  type IfConditionalExpression,
  type CompoundExpressionNode
} from '@vue/compiler-core';
import { uid } from '@vtj/base';
import { isJSExpression, isNodeSchema } from '../shared';
import { getJSExpression, getJSFunction, formatTagName } from './utils';
import type { CSSRules } from './style';
import { htmlToNodes } from './html';

let __slots: BlockSlot[] = [];
let __context: Record<string, Set<string>> = {};
let __handlers: Record<string, JSFunction> = {};
let __styles: CSSRules = {};

export interface ParseTemplateOptions {
  handlers?: Record<string, JSFunction>;
  styles?: CSSRules;
}

export function parseTemplate(
  id: string,
  name: string,
  content: string = '',
  options?: ParseTemplateOptions
) {
  __slots = [];
  __context = {};
  __handlers = options?.handlers || {};
  __styles = options?.styles || {};

  const result = compileTemplate({
    id,
    filename: name,
    source: content,
    isProd: true,
    slotted: true
  });
  const children = result.ast?.children || [];
  const nodes = children.map((child) => transformNode(child)) as NodeSchema[];
  return {
    nodes: nodes.filter((n) => !!n),
    slots: __slots,
    context: __context
  };
}

function pickSlot(node: NodeSchema) {
  if (node.name === 'slot') {
    let name: any = 'default';
    const params: any[] = [];
    for (const [key, value] of Object.entries(node.props || {})) {
      if (key === 'name') {
        name = value;
      } else {
        params.push(key);
      }
    }
    __slots.push({
      name,
      params
    });
  }
}

function styleToJson(style: string) {
  const cleaned = style.replace(/\s+/g, ' ');
  return cleaned.split(';').reduce((acc: Record<string, string>, current) => {
    const [property, value] = current.split(':').map((item) => item.trim());
    if (property && value) {
      acc[property] = value;
    }
    return acc;
  }, {});
}

function getProps(nodes: Array<AttributeNode | DirectiveNode>) {
  const props: NodeProps = {};
  for (const item of nodes) {
    // 普通属性
    if (item.type === NodeTypes.ATTRIBUTE) {
      if (item.name === 'class') {
        const classValue = item.value?.content || '';
        const classRegex = /[\w]+_[\w]{5,}/;
        const selector = classValue.match(classRegex)?.[0] || '';
        const classes = classValue.split(' ').filter((n) => n !== selector);
        const style = __styles[`.${selector}`];
        if (style) {
          props.style = style;
        }
        if (classes.length) {
          props.class = classes.join(' ');
        }
      } else if (item.name === 'style') {
        const styleValue = item.value?.content || '';
        if (styleValue) {
          props.style = styleToJson(styleValue);
        }
      } else {
        props[item.name] = item.value?.content || '';
      }
    }

    // 动态绑定的属性
    if (item.type === NodeTypes.DIRECTIVE) {
      if (item.name === 'bind') {
        if (
          item.exp?.type === NodeTypes.SIMPLE_EXPRESSION &&
          item.arg?.type === NodeTypes.SIMPLE_EXPRESSION
        ) {
          props[item.arg.content] = getJSExpression(`(${item.exp.content})`);
        }

        if (
          item.exp?.type === NodeTypes.COMPOUND_EXPRESSION &&
          item.arg?.type === NodeTypes.SIMPLE_EXPRESSION
        ) {
          props[item.arg.content] = getJSExpression(`(${item.exp.loc.source})`);
        }
      }
    }
  }

  return props;
}

function getEvents(
  nodes: Array<AttributeNode | DirectiveNode>,
  handlers: Record<string, JSFunction> = {}
) {
  const events: NodeEvents = {};
  for (const item of nodes) {
    // 动态绑定的属性
    if (item.type === NodeTypes.DIRECTIVE) {
      if (
        item.name === 'on' &&
        item.arg?.type === NodeTypes.SIMPLE_EXPRESSION
      ) {
        const modifiers = item.modifiers.reduce(
          (result, cur) => {
            result[cur.content] = true;
            return result;
          },
          {} as Record<string, boolean>
        );

        let code = item.exp?.loc.source || '';
        const endRegex = /\)$/;
        if (endRegex.test(code)) {
          code = `($event) => ${code}`;
        }
        const regex = new RegExp(`${item.arg.content}_\[\\w\]\{5\,\}`);
        const name = code.match(regex)?.[0] || '';
        const handler = handlers[name];

        if (name && handler) {
          events[item.arg.content] = {
            name: item.arg.content,
            handler,
            modifiers
          };
        } else {
          const exp = (item.exp as any)?.ast?.type === 'AssignmentExpression';
          events[item.arg.content] = {
            name: item.arg.content,
            handler: getJSFunction(exp ? `()=> {${code}}` : `(${code})`),
            modifiers
          };
        }
      }
    }
  }
  return events;
}

function getDirectives(node: IfNode | ForNode | ElementNode) {
  const directives: NodeDirective[] = [];
  // v-if
  if (node.type === NodeTypes.IF) {
    const test = (node.codegenNode as IfConditionalExpression)?.test;
    if (test) {
      directives.push({
        name: 'vIf',
        value: getJSExpression(test.loc.source)
      });
    }
  }

  // v-for
  if (node.type === NodeTypes.FOR) {
    directives.push({
      name: 'vFor',
      value: getJSExpression(node.source.loc.source),
      iterator: {
        item: node.valueAlias?.loc.source || 'item',
        index: node.keyAlias?.loc.source || 'index'
      }
    });
  }

  if (node.type === NodeTypes.ELEMENT) {
    const directivProps = node.props.filter(
      (prop) => prop.type === NodeTypes.DIRECTIVE
    );
    // v-model
    const vModels = directivProps.filter((n) => n.name === 'model');
    if (vModels.length) {
      vModels.forEach((item) => {
        directives.push({
          name: 'vModel',
          arg: (item.arg as any)?.content,
          value: getJSExpression(item.exp?.loc.source || '')
        });
      });
    }

    // v-show
    const vShow = directivProps.find((n) => n.name === 'show');
    if (vShow) {
      directives.push({
        name: 'vShow',
        value: getJSExpression(vShow.exp?.loc.source || '')
      });
    }

    // v-bind
    const vBind = directivProps.find((n) => n.name === 'bind' && !n.arg);
    if (vBind) {
      directives.push({
        name: 'vBind',
        value: getJSExpression(vBind.exp?.loc.source || '')
      });
    }

    // v-html
    const vHtml = directivProps.find((n) => n.name === 'html');
    if (vHtml) {
      directives.push({
        name: 'vHtml',
        value: getJSExpression(vHtml.exp?.loc.source || '')
      });
    }
  }
  return directives;
}

function getNodeId(el: NodeSchema) {
  let id: string = '';
  const { name, props, events = {} } = el;
  const classes = props?.class || '';
  // 从class提取id
  if (typeof classes === 'string') {
    const clsRegex = new RegExp(`${name}_\(\[\\w\]\+\)`);
    const matches = classes.match(clsRegex);
    if (matches && matches[1]) {
      id = matches[1];
    }
  }

  // 从事件绑定句柄提取id
  for (const { name, handler } of Object.values(events)) {
    const regex = new RegExp(`${name}_\(\[\\w\]\+\)`);
    const matches = handler.value.match(regex);
    if (matches && matches[1]) {
      id = matches[1];
    }
  }

  return id || uid();
}

function pickContext(el: NodeSchema, parent?: NodeSchema) {
  const parentContext = new Set(parent?.id ? __context[parent.id] : []);

  const vFor = (el.directives || []).find((n) => n.name === 'vFor');
  let nodeContext = new Set<string>(Array.from(parentContext));
  // 循环上下文
  if (vFor) {
    const { item = 'item', index = 'index' } = vFor.iterator || {};
    nodeContext = new Set([item, index, ...Array.from(nodeContext)]);
  }

  // 插槽上下文
  const slot = el.slot;
  if (slot) {
    const params = typeof slot === 'string' ? [] : slot.params || [];
    const items = params.length ? params : [`scope_${parent?.id}`];
    nodeContext = new Set([...items, ...Array.from(nodeContext)]);
  }
  __context[el.id as string] = nodeContext;
}

function createNodeSchema(
  node: ElementNode,
  parent?: NodeSchema,
  scope?: IfNode | ForNode
) {
  const dsl: NodeSchema = {
    name: formatTagName(node.tag),
    props: getProps(node.props),
    events: getEvents(node.props, __handlers),
    directives: getDirectives(scope || node)
  };

  dsl.id = getNodeId(dsl);
  // v-for 上下文
  pickContext(dsl, parent);
  const el = transformChildren(dsl, node.children);
  // slot 上下文
  pickContext(dsl, parent);
  pickSlot(el);
  return el;
}

function transformNode(
  node: TemplateChildNode,
  parent?: NodeSchema
): NodeSchema | JSExpression | string | null {
  // 处理元素节点
  if (node.type === NodeTypes.ELEMENT) {
    return createNodeSchema(node, parent);
  }

  // 处理 v-if 节点
  if (node.type === NodeTypes.IF) {
    const el = node.branches[0].children[0];
    if (el) {
      if (el.type === NodeTypes.ELEMENT) {
        return createNodeSchema(el, parent, node);
      }
    }
  }

  // 处理 v-for 节点
  if (node.type === NodeTypes.FOR) {
    const el = node.children[0];
    if (el.type === NodeTypes.ELEMENT) {
      return createNodeSchema(el, parent, node);
    }
  }

  // 处理文本节点
  if (node.type === NodeTypes.TEXT_CALL) {
    if (node.content.type == NodeTypes.TEXT) {
      return node.content.content;
    } else if (node.content.type === NodeTypes.INTERPOLATION) {
      return getJSExpression(node.content.content.loc.source);
    }
    return '';
  }

  // 文本节点
  if (node.type === NodeTypes.TEXT) {
    return node.content;
  }

  // 处理插值
  if (node.type === NodeTypes.INTERPOLATION) {
    if (
      node.content.type === NodeTypes.SIMPLE_EXPRESSION ||
      node.content.type === NodeTypes.COMPOUND_EXPRESSION
    ) {
      return getJSExpression(node.content.loc.source);
    }
  }

  // 文本和表达式合成
  if (node.type === NodeTypes.COMPOUND_EXPRESSION) {
    return transformCompoundExpression(
      node.children as CompoundExpressionNode[]
    );
  }

  console.warn('未处理', node.type);
  return null;
}

function transformCompoundExpression(children: CompoundExpressionNode[] = []) {
  const nodes = children.filter((n) => typeof n !== 'string');
  const result: NodeSchema[] = [];
  for (const node of nodes) {
    result.push({
      name: 'span',
      children:
        (node as any).type === NodeTypes.TEXT
          ? node.loc.source
          : getJSExpression((node as any).content?.loc.source)
    });
  }
  return {
    name: 'span',
    children: result
  };
}

function transformChildren(
  el: NodeSchema,
  childNodes: TemplateChildNode[] = []
) {
  const nodes: Array<NodeSchema | JSExpression | string> = [];

  for (const childNode of childNodes) {
    if (
      childNode.type === NodeTypes.ELEMENT &&
      (childNode as any).codegenNode?.value?.arguments
    ) {
      const html = (childNode as any).codegenNode.value.arguments[0];
      if (html) {
        const ret = htmlToNodes(html);
        nodes.push(...ret);
      }
      // 处理 template 标签
    } else if (
      childNode.type === NodeTypes.ELEMENT &&
      childNode.tag === 'template'
    ) {
      const slot = childNode.props.find((n) => n.name === 'slot');
      for (const child of childNode.children) {
        const node =
          child.type === NodeTypes.TEXT || child.type === NodeTypes.TEXT_CALL
            ? ({
                name: 'span',
                children: transformNode(child, el)
              } as NodeSchema)
            : transformNode(child, el);

        if (node) {
          // 补充插槽指令
          if (isNodeSchema(node) && slot?.type === NodeTypes.DIRECTIVE) {
            node.id = getNodeId(node);
            node.slot = {
              name: (slot.arg as any)?.content || 'default',
              params: slot.exp?.identifiers || []
            };
            pickContext(node, el);
          }

          nodes.push(node);
        }
      }
    } else if ((childNode as any).type === NodeTypes.JS_CALL_EXPRESSION) {
      const content = (childNode as any).arguments?.[0];
      if (content) {
        const children = htmlToNodes(content) as any;
        nodes.push(...children);
      }
    } else if (childNode.type === NodeTypes.TEXT_CALL) {
      const node = transformNode(childNode, el);
      if (node) {
        nodes.push(node);
      }
    } else {
      const node = transformNode(childNode, el);
      if (node) {
        nodes.push(node);
      }
    }
  }

  // 当只有一个节点时，有可能是字符串或表达式
  if (nodes.length === 1) {
    const first = nodes[0];
    el.children =
      typeof first === 'string' || isJSExpression(first) ? first : [first];
  } else {
    el.children = nodes.map((n) => {
      return typeof n === 'string' ? { name: 'span', children: n } : n;
    }) as NodeSchema[];
  }

  return el;
}
