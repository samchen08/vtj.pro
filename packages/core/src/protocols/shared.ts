/**
 * json属性值
 */
export type JSONValue =
  | boolean
  | string
  | number
  | null
  | undefined
  | JSONArray
  | JSONObject;

/**
 * json 数组
 */
export type JSONArray = JSONValue[];

/**
 * json 对象
 */
export interface JSONObject {
  [key: string]: JSONValue;
}

/**
 * 表达式代码
 */
export interface JSExpression {
  type: 'JSExpression';
  id?: string;
  value: string;
}

/**
 * 函数代码
 */
export interface JSFunction {
  type: 'JSFunction';
  id?: string;
  value: string;
}

/**
 * 数据类型
 */
export type DataType =
  | 'String'
  | 'Boolean'
  | 'Number'
  | 'Date'
  | 'Object'
  | 'Array'
  | 'Function';

/**
 * 静态文件
 */
export interface StaticFileInfo {
  filename?: string;
  filepath: string;
}

export interface ExtensionConfig {
  /**
   * 扩展资源文件路径：js、css文件，js文件要求 umd 格式
   */
  urls: string[];
  /**
   * js库导出名
   */
  library: string;

  /**
   * 附加参数/数据，用作个性需求
   */
  params?: Array<Record<string, any>>;
}

export interface EnhanceConfig {
  name: string;
  urls: string[];
}

/**
 * 扩展配置
 */
export interface VTJConfig {
  /**
   * 应用增强配置
   */
  enhance?: boolean | EnhanceConfig;
  /**
   * 扩展配置
   */
  extension?: ExtensionConfig;

  /**
   * 路由History模式
   */

  history?: 'hash' | 'web';

  /**
   * 页面路由 base， 默认 '/'
   */
  base?: string;

  /**
   * 页面路由目录名称，默认： page
   */
  pageRouteName?: string;

  /**
   * 项目部署目录
   */
  __BASE_PATH__?: string;

  /**
   * 远程服务host
   */
  remote?: string;

  /**
   * 授权登录
   */
  auth?: string | (() => Promise<any>);

  /**
   * 检查版本更新
   */
  checkVersion?: boolean;

  /**
   * 平台
   */
  platform?: PlatformType;

  /**
   *  应用 Access 配置
   */
  access?: Record<string, any>;

  /**
   * 设计器是由Access 配置
   */
  __ACCESS__?: Record<string, any>;
}

/**
 * 平台类型
 */
export type PlatformType = 'web' | 'h5' | 'uniapp';

export interface ParseVueOptions {
  id: string;
  name: string;
  source: string;
}
