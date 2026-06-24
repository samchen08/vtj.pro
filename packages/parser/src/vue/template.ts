import {
  type NodeSchema,
  type NodeProps,
  type NodeEvents,
  type JSExpression,
  type NodeDirective,
  type BlockSlot,
  type JSFunction,
  type PlatformType,
  type NodeFrom
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
  type CompoundExpressionNode,
  type IfBranchNode
} from '@vue/compiler-core';
import { uid } from '@vtj/base';
import { isJSExpression, isNodeSchema, parseScript } from '../shared';
import {
  getJSExpression,
  getJSFunction,
  formatTagName,
  styleToJson,
  mergeClass
} from './utils';
import type { CSSRules } from './style';
import { htmlToNodes } from './html';
import { type ImportStatement } from './scripts';

let __slots: BlockSlot[] = [];
let __context: Record<string, Set<string>> = {};
let __handlers: Record<string, JSFunction> = {};
let __directives: Record<string, JSExpression> = {};
let __styles: CSSRules = {};
let __platform: PlatformType = 'web';
let __imports: ImportStatement[] = [];

export interface ParseTemplateOptions {
  platform: PlatformType;
  imports?: ImportStatement[];
  handlers?: Record<string, JSFunction>;
  styles?: CSSRules;
  directives?: Record<string, JSExpression>;
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
  __platform = options?.platform || 'web';
  __imports = options?.imports || [];
  __directives = options?.directives || {};

  const result = compileTemplate({
    id,
    filename: name,
    source: content,
    isProd: true,
    slotted: true
  });

  const children = result.ast?.children || [];
  const nodes: NodeSchema[] = [];
  for (const child of children) {
    const result = transformNode(child) as any;
    if (Array.isArray(result)) {
      nodes.push(...result);
    } else {
      nodes.push(result);
    }
  }
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
          if (item.arg.content === 'class' && props.class) {
            const astType = (item.exp.ast as any).type;
            const mergeResult = mergeClass(
              props.class as string,
              item.exp.loc.source as string,
              astType
            );
            if (mergeResult) {
              props[item.arg.content] = getJSExpression(mergeResult);
            }
          } else {
            props[item.arg.content] = getJSExpression(
              `(${item.exp.loc.source})`
            );
          }
        }
      }
    }
  }

  return props;
}

function replaceTapToClick(events: NodeEvents = {}) {
  const _events: NodeEvents = {};
  for (const [name, value] of Object.entries(events)) {
    _events[name === 'tap' ? 'click' : name] = value;
  }
  return _events;
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
            if (cur.content) {
              result[cur.content] = true;
            }
            return result;
          },
          {} as Record<string, boolean>
        );

        let code = item.exp?.loc.source || '';
        // const endRegex = /\)$/;
        // if (endRegex.test(code)) {
        //   code = `($event) => { ${code} } `;
        // }
        if (!code) {
          code = '() => {}';
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
          const ast = (item.exp as any)?.ast;
          const astType = ast?.type;
          const isCallExp = astType === 'CallExpression';
          const isArrowFunc = astType === 'ArrowFunctionExpression';
          const isFuncExp = astType === 'FunctionExpression';
          // 方法引用（裸标识符或成员访问），不应包装
          const isIdentifier = astType === 'Identifier';
          const isMemberExp = astType === 'MemberExpression';
          // 无 AST 时的回退判断：纯标识符/成员链视为方法引用
          const isSimpleRef =
            !ast && /^[a-zA-Z_$][\w$]*(?:\.[a-zA-Z_$][\w$]*)*$/.test(code);

          let handler: JSExpression | JSFunction;
          if (isCallExp) {
            // 函数调用表达式：如 handleClick() → JSExpression
            handler = getJSExpression(code);
          } else if (isIdentifier || isMemberExp || isSimpleRef) {
            // 方法引用：如 increment 或 obj.method → 保持原样，后续由 compositionPatch 注入 this.
            handler = getJSFunction(code);
          } else if (isArrowFunc || isFuncExp) {
            // 已是函数表达式，检查是否为无参简单方法引用包装
            // () => testFunction 应解包为 testFunction
            const body = ast?.body;
            const params = ast?.params;
            if (
              body &&
              body.type === 'Identifier' &&
              (!params || params.length === 0)
            ) {
              handler = getJSFunction(body.name);
            } else {
              handler = getJSFunction(code);
            }
          } else {
            // 内联语句/表达式：如 ++count → 包装为箭头函数
            // 若引用 $event 则保留参数，否则用 () =>
            // 但需先检测 code 是否已经是函数表达式，避免双重包装
            // 例如 @click="() => { ... }" 的 loc.source 就是箭头函数本身
            let isAlreadyFunc = false;
            try {
              const parsed = parseScript(code);
              const body = parsed.program.body;
              if (body.length === 1 && body[0].type === 'ExpressionStatement') {
                const exprType = (body[0] as any).expression?.type;
                isAlreadyFunc =
                  exprType === 'ArrowFunctionExpression' ||
                  exprType === 'FunctionExpression';
              }
            } catch {
              // 无法作为独立表达式解析（如不完整语句），继续兜底包装
            }

            if (isAlreadyFunc) {
              handler = getJSFunction(code);
            } else {
              const hasDollarEvent = /\$event\b/.test(code);
              const prefix = hasDollarEvent ? '($event) => ' : '() => ';
              handler = getJSFunction(`${prefix}${code}`);
            }
          }

          events[item.arg.content] = {
            name: item.arg.content,
            handler,
            modifiers
          };
        }
      }
    }
  }
  return replaceTapToClick(events);
}

function getDirectives(
  node: IfNode | ForNode | IfBranchNode | ElementNode,
  branches?: any[]
) {
  const directives: NodeDirective[] = [];
  const builtIns = ['if', 'for', 'model', 'show', 'bind', 'html'];

  // v-if
  if (
    branches &&
    ((node as any).type === NodeTypes.IF_BRANCH ||
      (node as any).type === NodeTypes.IF)
  ) {
    branches.forEach((branch, index) => {
      if (node === branch) {
        const name =
          index === 0 ? 'vIf' : branch.condition ? 'vElseIf' : 'vElse';
        const value = branch.condition?.loc.source || '';
        directives.push({
          name: name,
          value: name === 'vElse' ? true : getJSExpression(value)
        } as any);

        const childNode = (node as any).children?.[0];
        // 跳过 FOR 子节点：v-for 是结构性包装节点，其指令由自身处理，
        // 不应在此处重复收集，否则会与 createNodeSchema 中 FOR 节点再次生成 vFor 造成重复
        if (childNode && childNode.type !== NodeTypes.FOR) {
          const otherDirectives = getDirectives(childNode);
          directives.push(...otherDirectives);
        }
      }
    });
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

    const others = directivProps.filter((n) => !builtIns.includes(n.name));

    for (const item of others) {
      const modifiers = (item.modifiers || []).reduce(
        (result, cur) => {
          result[cur.content] = true;
          return result;
        },
        {} as Record<string, boolean>
      );
      const arg: string = (item as any).arg?.content || undefined;
      const directiveName = __directives[item.name];
      if (directiveName) {
        directives.push({
          name: directiveName,
          value: getJSExpression(item.exp?.loc.source || ''),
          arg,
          modifiers
        });
      }
    }
  }
  return directives;
}

function getNodeId(node: ElementNode | TemplateChildNode) {
  let id: string = '';
  if (node.type === NodeTypes.ELEMENT) {
    const { props = [], tag } = node;
    for (const prop of props) {
      if (prop.name === 'class') {
        const content: string = (prop as any).value?.content || '';
        const clsRegex = new RegExp(`${tag}_\(\[\\w\]\+\)`);
        id = content.match(clsRegex)?.[1] || '';
      } else if (prop.type === NodeTypes.DIRECTIVE && prop.name === 'on') {
        const arg = prop.arg?.loc?.source || '';
        const content = prop.exp?.loc?.source || '';
        const regex = new RegExp(`${arg}_\(\[\\w\]\+\)`);
        id = content.match(regex)?.[1] || '';
      }
    }
  }
  return id || uid();
}

function getForm(name: string): NodeFrom | undefined {
  const fromRegex = /\.\/(.+?)\.vue/;
  for (const { from, imports } of __imports) {
    if (Array.isArray(imports) && imports.includes(name)) {
      return from;
    }
    if (imports === name) {
      const id = from.match(fromRegex)?.[1];
      if (id) {
        return {
          type: 'Schema',
          id
        };
      }
    }
  }
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
  scope?: IfNode | ForNode,
  branches?: any[]
) {
  const dsl: NodeSchema = {
    name: formatTagName(node.tag, __platform),
    from: getForm(node.tag),
    props: getProps(node.props),
    events: getEvents(node.props, __handlers),
    directives: getDirectives(scope || node, branches)
  };

  dsl.id = getNodeId(node);

  // v-for 上下文
  pickContext(dsl, parent);
  const el = transformChildren(dsl, node.children);
  // slot 上下文
  pickContext(dsl, parent);
  pickSlot(el);
  return el;
}

function transformBranches(branches: any[] = [], parent?: NodeSchema) {
  return branches.map((n) => {
    return transformNode(n, parent, branches) as NodeSchema;
  });
}

function transformNode(
  node: TemplateChildNode,
  parent?: NodeSchema,
  branches?: any[]
): NodeSchema | NodeSchema[] | JSExpression | string | undefined {
  // 处理元素节点
  if (node.type === NodeTypes.ELEMENT) {
    return createNodeSchema(node, parent);
  }

  // 处理 v-if 节点
  if (node.type === NodeTypes.IF) {
    return transformTemplateIf(node);
  }

  if (branches && node.type === NodeTypes.IF_BRANCH) {
    const el = node.children.find(
      (n) => n.type === NodeTypes.ELEMENT || n.type === NodeTypes.FOR
    );

    if (el) {
      if (el.type === NodeTypes.ELEMENT) {
        return createNodeSchema(el, parent, node as any, branches);
      } else if (el.type === NodeTypes.FOR) {
        const directives = getDirectives(node);
        const el = { name: 'div', directives };
        return transformChildren(el, node.children || []);
      }
    }

    return '';
  }

  // 处理 v-for 节点
  if (node.type === NodeTypes.FOR) {
    const child = node.children[0];
    if (node.children.length > 1 || child.type !== NodeTypes.ELEMENT) {
      const directives = getDirectives(node);
      const el = { name: 'span', directives };
      return transformChildren(el, node.children);
    } else {
      return createNodeSchema(child, parent, node);
    }
  }

  // 处理文本节点
  if (node.type === NodeTypes.TEXT_CALL) {
    if (node.content.type == NodeTypes.TEXT) {
      return node.content.content;
    } else if (node.content.type === NodeTypes.INTERPOLATION) {
      return getJSExpression(node.content.content.loc.source);
    } else if (node.content.type === NodeTypes.COMPOUND_EXPRESSION) {
      return transformCompoundExpression(
        node.content.children as CompoundExpressionNode[]
      );
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

  // 注释，忽略
  if (node.type === NodeTypes.COMMENT) {
    return;
  }

  console.warn('未处理', node.type);
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
        const ret = htmlToNodes(html, __platform);
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
          const __nodes = Array.isArray(node) ? node : [node];
          __nodes.forEach((node) => {
            // 补充插槽指令
            if (isNodeSchema(node) && slot?.type === NodeTypes.DIRECTIVE) {
              node.id = getNodeId(child);
              node.slot = {
                name: (slot.arg as any)?.content || 'default',
                params: slot.exp?.identifiers || [],
                scope:
                  slot.exp?.type === NodeTypes.SIMPLE_EXPRESSION
                    ? slot.exp.content
                    : ''
              };

              pickContext(node, el);
            }
            nodes.push(node);
          });
        }
      }
    } else if ((childNode as any).type === NodeTypes.JS_CALL_EXPRESSION) {
      const content = (childNode as any).arguments?.[0];
      if (content) {
        const children = htmlToNodes(content, __platform) as any;
        nodes.push(...children);
      }
    } else if (childNode.type === NodeTypes.TEXT_CALL) {
      const node = transformNode(childNode, el);
      if (node) {
        if (Array.isArray(node)) {
          nodes.push(...node);
        } else {
          nodes.push(node);
        }
      }
    } else {
      const node = transformNode(childNode, el);
      if (node) {
        if (Array.isArray(node)) {
          nodes.push(...node);
        } else {
          nodes.push(node);
        }
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
      return typeof n === 'string' || isJSExpression(n)
        ? { name: 'span', children: n }
        : n;
    }) as NodeSchema[];
  }

  return el;
}

function transformTemplateIf(node: IfNode) {
  const branches = node.branches || [];
  const first = branches[0];
  const children = first?.children || [];

  // template v-if/v-else/v-else-if: 每个分支独立创建包装节点
  if (first?.isTemplateIf) {
    return branches.map((branch) => {
      const directives = getDirectives(branch as any, branches);
      const el = { name: 'div', directives };
      return transformChildren(el, branch.children || []);
    });
  }

  // 单分支但多子节点或非元素子节点: 创建 div 包装
  if (
    children.length > 1 ||
    (children[0] && children[0].type !== NodeTypes.ELEMENT)
  ) {
    const directives = getDirectives(first as any, branches);
    const el = { name: 'div', directives };
    return transformChildren(el, first.children);
  }

  // 单分支单元素子节点: 直接将指令附加到元素上
  return transformBranches(branches);
}
