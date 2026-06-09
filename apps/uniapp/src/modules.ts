/**
 * VTJ 模块加载器
 * 通过 vite.config.ts 中的 vtjModulesPlugin 虚拟模块插件，
 * 在编译时根据 NODE_ENV 决定 glob 内容：
 * - development: 包含 projects + files
 * - production: 仅包含 projects
 */
// @ts-ignore virtual module provided by vtjModulesPlugin
import vtjModulesRaw from 'virtual:vtj-modules';

export function createModules() {
  const res = vtjModulesRaw as Record<string, unknown>;
  let result: Record<string, () => Promise<any>> = {};
  for (const [key, value] of Object.entries(res)) {
    result[key] = () => Promise.resolve(value as any);
  }
  return result;
}
