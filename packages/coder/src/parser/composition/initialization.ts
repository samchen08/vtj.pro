import type { ParserOptions } from 'prettier';
import { parsers } from 'prettier/plugins/babel';

interface Node {
  type: string;
  name?: string;
  [key: string]: unknown;
}

function isNode(value: unknown): value is Node {
  return !!value && typeof value === 'object' && 'type' in value;
}

function children(node: Node): Node[] {
  return Object.values(node).flatMap((value) =>
    Array.isArray(value) ? value.filter(isNode) : isNode(value) ? [value] : []
  );
}

function bindings(node: unknown): string[] {
  if (!isNode(node)) return [];
  if (node.type === 'Identifier') return [node.name!];
  if (node.type === 'ObjectProperty') return bindings(node.value);
  if (node.type === 'AssignmentPattern') return bindings(node.left);
  return children(node).flatMap(bindings);
}

const functions = new Set([
  'FunctionExpression',
  'ArrowFunctionExpression',
  'FunctionDeclaration',
  'ObjectMethod',
  'ClassMethod',
  'ClassPrivateMethod'
]);

interface Reference {
  name: string;
  evaluate: boolean;
}

function references(root: Node, deep = false): Reference[] {
  const result: Reference[] = [];
  const active = new Set<Node>();
  const visit = (
    node: Node,
    locals = new Set<string>(),
    parent?: Node,
    localFunctions = new Map<string, Node>(),
    execute = false
  ) => {
    const isFunction = functions.has(node.type);
    if (isFunction && !execute) {
      if (node.computed && isNode(node.key)) visit(node.key, locals, node);
      return;
    }
    if (isFunction || node.type === 'BlockStatement') {
      locals = new Set(locals);
      localFunctions = new Map(localFunctions);
      if (isFunction) {
        for (const name of bindings(node.id)) locals.add(name);
        for (const param of (node.params as Node[]) || []) {
          for (const name of bindings(param)) locals.add(name);
        }
      }
      for (const item of Array.isArray(node.body)
        ? (node.body as Node[])
        : []) {
        if (item.type === 'VariableDeclaration') {
          for (const decl of item.declarations as Node[]) {
            for (const name of bindings(decl.id)) {
              locals.add(name);
              if (isNode(decl.init) && functions.has(decl.init.type))
                localFunctions.set(name, decl.init);
            }
          }
        } else if (item.type === 'FunctionDeclaration') {
          for (const name of bindings(item.id)) {
            locals.add(name);
            localFunctions.set(name, item);
          }
        }
      }
    }
    if (node.type === 'Identifier') {
      const callee =
        parent &&
        ['CallExpression', 'OptionalCallExpression', 'NewExpression'].includes(
          parent.type
        ) &&
        parent.callee === node;
      if (locals.has(node.name!)) {
        const fn = localFunctions.get(node.name!);
        if (callee && fn && !active.has(fn)) {
          active.add(fn);
          visit(fn, locals, undefined, localFunctions, true);
          active.delete(fn);
        }
        return;
      }
      const property =
        parent &&
        [
          'MemberExpression',
          'OptionalMemberExpression',
          'ObjectProperty',
          'ObjectMethod',
          'ClassMethod'
        ].includes(parent.type) &&
        (parent.property === node || parent.key === node) &&
        !parent.computed;
      if (!property) {
        result.push({
          name: node.name!,
          evaluate:
            !!parent &&
            (([
              'CallExpression',
              'OptionalCallExpression',
              'NewExpression'
            ].includes(parent.type) &&
              parent.callee === node) ||
              (['MemberExpression', 'OptionalMemberExpression'].includes(
                parent.type
              ) &&
                parent.object === node))
        });
      }
      return;
    }
    for (const child of children(node)) {
      if (
        (node.type === 'VariableDeclarator' && child === node.id) ||
        (isFunction && child === node.id)
      )
        continue;
      // 立即调用的函数体在初始化时执行。
      if (
        ['CallExpression', 'OptionalCallExpression'].includes(node.type) &&
        child === node.callee &&
        functions.has(child.type)
      ) {
        visit(child, locals, node, localFunctions, true);
      } else {
        visit(child, locals, node, localFunctions);
      }
    }
  };
  visit(root, new Set(), undefined, new Map(), deep);
  return result;
}

/** 按立即求值的依赖排序；函数声明体和 computed getter 保持延迟执行。 */
export function sortInitializations(
  statements: string[],
  composables: string[] = []
): string[] {
  if (!statements.length) return statements;
  const ast = parsers['babel-ts'].parse(
    statements.join('\n'),
    {} as ParserOptions
  );
  const nodes = ast.program.body as Node[];
  const owners = new Map<string, number>();
  const deferred = new Map<string, Reference[]>();
  const eager = nodes.map((node, index) => {
    if (node.type !== 'VariableDeclaration') return references(node);
    const declarator = (node.declarations as Node[])[0];
    const names = bindings(declarator.id);
    for (const name of names) owners.set(name, index);
    const init = declarator.init as Node;
    const isComputed =
      init.type === 'CallExpression' &&
      (init.callee as Node).name === 'computed';
    if (functions.has(init.type) || isComputed) {
      for (const name of names) {
        let target = init;
        if (isComputed) {
          target = (init.arguments as Node[])[0];
          if (target?.type === 'ObjectExpression') {
            const getter = (target.properties as Node[]).find(
              (prop) =>
                (prop.key as Node)?.name === 'get' ||
                (prop.key as Node)?.value === 'get'
            );
            target =
              getter?.type === 'ObjectMethod'
                ? getter
                : (getter?.value as Node);
          }
        }
        const refs = target ? references(target, true) : [];
        deferred.set(
          name,
          isComputed ? refs.map((ref) => ({ ...ref, evaluate: true })) : refs
        );
      }
    }
    return references(init);
  });
  const dependencies = eager.map((refs) => {
    const deps = new Set<number>();
    const expanded = new Set<string>();
    const add = ({ name, evaluate }: Reference) => {
      const owner = owners.get(name);
      if (owner !== undefined) deps.add(owner);
      if (evaluate && !expanded.has(name)) {
        expanded.add(name);
        for (const ref of deferred.get(name) || []) add(ref);
      }
    };
    refs.forEach(add);
    return deps;
  });
  // composable 的副作用调用按 DSL 数组顺序执行。
  for (let i = 1; i < composables.length; i++) {
    const index = statements.length - composables.length + i;
    dependencies[index].add(index - 1);
  }
  const result: string[] = [];
  const pending = new Set(nodes.map((_, index) => index));
  while (pending.size) {
    const next = [...pending].find((index) =>
      [...dependencies[index]].every((dep) => !pending.has(dep))
    );
    if (next === undefined) {
      const names = [...owners]
        .filter(([, index]) => pending.has(index))
        .map(([name]) => name);
      throw new Error(`[vtj/coder] 循环初始化依赖: ${names.join(', ')}`);
    }
    pending.delete(next);
    result.push(statements[next]);
  }
  return result;
}
