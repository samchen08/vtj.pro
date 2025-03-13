import { name, version } from './package.json';

export { name, version };

/**
 * 调试项目配置信息
 */
export const project: Record<string, any> = {
  id: name,
  name: '物料开发项目',
  platform: 'web'
};

/**
 * 库导出名称
 */
export const library = 'VX';

/**
 * 物料描述导出名称
 */
export const material = 'VXMaterial';

/**
 * 物料在设计器组件面板中的标题文本
 */
export const label = '扩展库';
