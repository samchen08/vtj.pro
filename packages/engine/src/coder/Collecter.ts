import {
  BlockSchema,
  Dependencie,
  JSExpression,
  JSFunction,
  NodeSchema
} from '../core';
import { isJSFunction, isJSExpression, dedupArray } from '../utils';
export class Collecter {
  libraryMap: Record<string, boolean> = {};
  libraryKeys: string[];
  libraryRegex: RegExp[] = [];
  imports: Record<string, Set<string>> = {};
  context: Record<string, Set<string>> = {};
  constructor(
    public dsl: BlockSchema,
    public packages: Dependencie[]
  ) {
    this.libraryMap = packages.reduce(
      (prev, current) => {
        if (current.library) {
          prev[current.library] = true;
        }
        return prev;
      },
      {} as Record<string, boolean>
    );
    this.libraryKeys = Object.keys(this.libraryMap);
    this.libraryRegex = this.libraryKeys.map((key) => {
      return new RegExp(`this.\\$libs.${key}.([\\\w]+)`, 'g');
    });
    this.walk(dsl);
    this.walkNodes(dsl);
  }

  getPackageName(library: string) {
    return this.packages.find((n) => n.library === library)?.package || null;
  }

  isCode(val: unknown): val is JSExpression | JSFunction {
    return isJSExpression(val) || isJSFunction(val);
  }

  collectImport(str: string) {
    const items = str.split('.');
    if (items.length === 4) {
      const name = items.pop();
      const path = items.join('.') + '.';
      const library = items.pop();
      if (name && library) {
        const packageName = this.getPackageName(library);
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

  pick(code: string = '') {
    let result = code;
    const { libraryRegex } = this;
    for (const regex of libraryRegex) {
      const matches = code.match(regex) || [];
      for (const match of matches) {
        const res = this.collectImport(match);
        if (res) {
          result = result.replaceAll(res.path, '');
        }
      }
    }

    return result;
  }

  walk(dsl: BlockSchema) {
    const walking = (item: unknown) => {
      if (!item) return;
      if (typeof item !== 'object') return;
      if (Array.isArray(item)) {
        for (let n of item) {
          walking(n);
        }
        return;
      }

      const entries = Object.entries(item as Record<string, any>);
      for (const [key, value] of entries) {
        if (this.isCode(value)) {
          const newValue = this.pick(value.value);
          value.value = newValue;
        } else {
          walking(value);
        }
      }
    };
    walking(dsl);
  }

  getRefs(components: string[] = []) {
    let array: string[] = [...components];
    for (const set of Object.values(this.imports)) {
      array = array.concat(Array.from(set));
    }
    return dedupArray(array);
  }

  walkNodes(dsl: BlockSchema) {
    const walking = (node: NodeSchema, parent?: NodeSchema) => {
      this.collectContext(node, parent);
      if (Array.isArray(node.children)) {
        node.children.forEach((n) => walking(n, node));
      }
    };

    if (Array.isArray(dsl.children)) {
      dsl.children.forEach((n) => walking(n));
    }
  }

  collectContext(node: NodeSchema, parent?: NodeSchema) {
    const parentContext = new Set(parent?.id ? this.context[parent.id] : []);
    const vFor = (node.directives || []).find((n) => n.name === 'vFor');
    let nodeContext = new Set<string>(Array.from(parentContext));
    // 循环上下文
    if (vFor) {
      const { item = 'item', index = 'index' } = vFor.iterator || {};
      nodeContext = new Set([item, index, ...Array.from(nodeContext)]);
    }

    // 插槽上下文s
    const slot = node.slot;
    if (slot) {
      const params = typeof slot === 'string' ? [] : slot.params || [];
      const items = params.length ? params : [`scope_${parent?.id}`];
      nodeContext = new Set([...items, ...Array.from(nodeContext)]);
    }
    this.context[node.id as string] = nodeContext;
  }
}
