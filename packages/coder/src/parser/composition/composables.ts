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
 * - { name: 'router', composable: { type: 'JSExpression', value: 'this.$libs.VueRouter.useRouter' } }
 *   → const router = this.$libs.VueRouter.useRouter();
 * - { composable: { type: 'JSExpression', value: 'useUserStore' }, destructure: ['user', 'login'] }
 *   → const { user, login } = useUserStore();
 * - { name: 'data', composable: { type: 'JSExpression', value: 'useFetch' }, args: ['/api'] }
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

    // 获取 composable 的字符串表示
    let composableStr = '';
    if (isJSCode(c.composable)) {
      composableStr = c.composable.value || '';
    } else if (typeof c.composable === 'string') {
      // 兼容旧协议
      composableStr = c.composable;
    }

    if (!composableStr) continue;

    // 过滤 useProvider，由模板写死版本始终生效
    if (composableStr === 'useProvider') continue;

    // 按 name 去重，同名的 composable 只会保留第一个
    if (c.name) {
      if (processedNames.has(c.name)) continue;
      processedNames.add(c.name);
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
        `const { ${c.destructure.join(', ')} } = ${composableStr}(${args});`
      );
    } else if (c.name) {
      statements.push(`const ${c.name} = ${composableStr}(${args});`);
    } else {
      // 无 name 无 destructure：仅调用副作用
      statements.push(`${composableStr}(${args});`);
    }
  }

  return { statements, imports };
}
