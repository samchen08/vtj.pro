import {
  type BlockSchema,
  type Dependencie,
  type JSExpression,
  type JSFunction,
  type NodeSchema,
  type NodeFromUrlSchema,
  type NodeFromPlugin
} from '@vtj/core';

import { dedupArray } from '@vtj/base';
import { isJSCode } from './utils';

export class Collecter {
  /**
   *  { 'element-plus': ['ElButton', 'ElInput' ...] }
   */
  public imports: Record<string, Set<string>> = {};
  public context: Record<string, Set<string>> = {};
  public style: Record<string, Record<string, any>> = {};
  public members: string[] = [];
  public urlSchemas: Record<string, NodeFromUrlSchema> = {};
  public blockPlugins: Record<string, NodeFromPlugin> = {};
  private libraryRegex: RegExp[] = [];

  constructor(
    public dsl: BlockSchema,
    public dependencies: Dependencie[]
  ) {
    this.libraryRegex = this.collectLibrary();
    this.walk(dsl);
    this.walkNodes(dsl);
    this.members = this.getLibraryMember();
  }
  private collectLibrary() {
    return this.dependencies
      .filter((n) => !!n.library)
      .map((n) => {
        return new RegExp(`(this.\\$libs.${n.library}.([\\\w]+))`, 'g');
      });
  }

  /**
   * 收集 import 信息
   * @param regexMatchItem  ex: this.$libs.ElementPlus.ElButton
   * @returns  ex: { name: 'ElButton', path: 'this.$libs.ElementPlus.', library: 'ElementPlus' }
   */
  private collectImport(regexMatchItem: string) {
    const sections = regexMatchItem.split('.');
    if (sections.length === 4) {
      const name = sections.pop() as string;
      const path = sections.join('.') + '.';
      const library = sections.pop() as string;
      if (name && library) {
        const packageName = this.dependencies.find(
          (n) => n.library === library
        )?.package;
        if (packageName) {
          const imports =
            this.imports[packageName] ||
            (this.imports[packageName] = new Set());
          imports.add(name);
        }
      }
      return {
        name,
        path,
        library
      };
    }
    return null;
  }

  // 代码中包含依赖库的引用，需要从代码中移除
  private replaceLibraryPath(code: JSExpression | JSFunction) {
    const { libraryRegex } = this;
    let result = code.value;
    for (const regex of libraryRegex) {
      const matches = code.value?.match(regex) || [];
      for (const match of matches) {
        const res = this.collectImport(match);
        if (res) {
          const pathStr = res.path.replace(/\$/g, '\\$');
          result = result.replace(new RegExp(pathStr, 'g'), '');
        }
      }
    }
    return result;
  }

  private walk(dsl: BlockSchema) {
    const walking = (item: unknown) => {
      if (!item) return;
      if (typeof item !== 'object') return;
      if (Array.isArray(item)) {
        for (let n of item) {
          walking(n);
        }
        return;
      }

      const values = Object.values(item as Record<string, any>);
      for (const value of values) {
        if (isJSCode(value)) {
          value.value = this.replaceLibraryPath(value);
        } else {
          walking(value);
        }
      }
    };
    walking(dsl);
  }

  private getLibraryMember(components: string[] = []) {
    let array: string[] = [...components];
    const imports = { ...this.imports };
    delete imports['uni-h5'];
    delete imports['@dcloudio/uni-h5'];
    delete imports['uni-ui'];
    delete imports['@dcloudio/uni-ui'];
    for (const set of Object.values(imports)) {
      array = array.concat(Array.from(set));
    }
    return dedupArray(array);
  }

  private collectContext(node: NodeSchema, parent?: NodeSchema) {
    const parentContext = new Set(parent?.id ? this.context[parent.id] : []);
    const vFor = (node.directives || []).find((n) => n.name === 'vFor');
    let nodeContext = new Set<string>(Array.from(parentContext));
    // 循环上下文
    if (vFor) {
      const { item = 'item', index = 'index' } = vFor.iterator || {};
      nodeContext = new Set([item, index, ...Array.from(nodeContext)]);
    }

    // 插槽上下文
    const slot = node.slot;
    if (slot) {
      const params = typeof slot === 'string' ? [] : slot.params || [];
      const items = params.length ? params : [`scope_${parent?.id}`];
      nodeContext = new Set([...items, ...Array.from(nodeContext)]);
    }
    this.context[node.id as string] = nodeContext;
  }

  private collectStyle(node: NodeSchema) {
    if (node.id && node.props?.style) {
      const hasStyle = !!Object.keys(node.props.style).length;
      if (hasStyle && !isJSCode(node.props.style)) {
        this.style[`.${node.name}_${node.id}`] = node.props.style;
      }
    }
  }

  private collectUrlSchema(node: NodeSchema) {
    if (typeof node.from === 'object' && node.from.type === 'UrlSchema') {
      this.urlSchemas[node.name] = node.from;
    }
  }

  private collectBlockPlugin(node: NodeSchema) {
    if (typeof node.from === 'object' && node.from.type === 'Plugin') {
      this.blockPlugins[node.name] = node.from;
    }
  }

  private walkNodes(dsl: BlockSchema) {
    const walking = (node: NodeSchema, parent?: NodeSchema) => {
      this.collectContext(node, parent);
      this.collectStyle(node);
      this.collectUrlSchema(node);
      this.collectBlockPlugin(node);
      if (Array.isArray(node.children)) {
        node.children.forEach((n) => walking(n, node));
      }
    };

    if (Array.isArray(dsl.nodes)) {
      dsl.nodes.forEach((n) => walking(n));
    }
  }
}
