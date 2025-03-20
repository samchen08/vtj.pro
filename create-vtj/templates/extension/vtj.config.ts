import { name, version, vtj } from './package.json';

/**
 * npm 包名、版本号
 */
export { name, version };

/**
 * 调试项目配置信息
 */
export const project: Record<string, any> = {
  id: name,
  name: '扩展开发项目',
  platform: 'web'
};

/**
 * 库导出名称
 */
export const library = vtj.extension.library;

/**
 * 库产物文件
 */
export const outputLibrary = vtj.extension.urls;
