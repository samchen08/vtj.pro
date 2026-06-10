import type { BlockComposable, JSExpression, JSONValue } from '@vtj/core';
import { isJSCode } from '../../utils';
import { transformExpression } from './transformer';
import type { SymbolTable } from './symbolTable';

export interface ComposableResult {
  /** 顶层声明语句 */
  statements: string[];
  /** 需要 import 的标识符：{ from: [composable, ...] } */
  imports: Record<string, string[]>;
}

/**
 * 解析 composables：
 * - { name: 'router', composable: 'useRouter', from: 'vue-router' }
 *   → const router = useRouter();
 * - { composable: 'useUserStore', from: 'pinia', destructure: ['user', 'login'] }
 *   → const { user, login } = useUserStore();
 * - { name: 'data', composable: 'useFetch', args: ['/api'] }
 *   → const data = useFetch('/api');
 */
export function parseComposables(
  composables: BlockComposable[] = [],
  symbols: SymbolTable
): ComposableResult {
  const statements: string[] = [];
  const imports: Record<string, string[]> = {};
  const processedNames = new Set<string>();

  for (const c of composables) {
    if (!c || !c.composable) continue;

    // 过滤 useProvider，由模板写死版本始终生效
    if (c.composable === 'useProvider') continue;

    // 按 name 去重，同名的 composable 只会保留第一个
    if (c.name) {
      if (processedNames.has(c.name)) continue;
      processedNames.add(c.name);
    }

    // 收集 import
    if (c.from) {
      const arr = imports[c.from] ?? (imports[c.from] = []);
      if (!arr.includes(c.composable)) arr.push(c.composable);
    }

    // 解析参数
    const argList = (c.args ?? []) as Array<JSONValue | JSExpression>;
    const args = argList
      .map((arg) => {
        if (isJSCode(arg)) {
          return transformExpression(arg.value || '', symbols, 'script');
        }
        return JSON.stringify(arg);
      })
      .join(', ');

    // 解构 vs 命名
    if (c.destructure && c.destructure.length > 0) {
      statements.push(
        `const { ${c.destructure.join(', ')} } = ${c.composable}(${args});`
      );
    } else if (c.name) {
      statements.push(`const ${c.name} = ${c.composable}(${args});`);
    } else {
      // 无 name 无 destructure：仅调用副作用
      statements.push(`${c.composable}(${args});`);
    }
  }

  return { statements, imports };
}
