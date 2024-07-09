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

/**
 * 扩展配置
 */
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

  /**
   * 项目部署目录
   */
  __BASE_PATH__?: string;
}
