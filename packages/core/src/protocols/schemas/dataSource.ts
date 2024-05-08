import type { JSFunction, JSExpression } from '../shared';

/**
 * 数据源类型，目前仅实现api类型
 */
export type DataSourceType = 'api' | 'cube' | 'meta';

/**
 * 请求方法
 */
export type ApiMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'jsonp';

/**
 * 项目级API类型数据源
 */
export interface ApiSchema {
  /**
   * 唯一标识
   */
  id: string;

  /**
   * 接口名称
   */
  name: string;

  /**
   * 接口描述说明
   */
  label?: string;

  /**
   * 接口请求url
   */
  url: string;

  /**
   * 接口请求方法
   */
  method?: ApiMethod;

  /**
   * 请求 设置配置
   */
  settings?: Record<string, any>;

  /**
   * 请求头配置
   */
  headers?: JSExpression | JSFunction;

  /**
   * jsonp请求配置
   */
  jsonpOptions?: Record<string, any>;

  /**
   * 模拟数据模板
   */
  mockTemplate?: JSFunction;

  /**
   * 是否开启模拟数据
   */
  mock?: boolean;
}

/**
 * 配置化查询数据源
 */
export interface MetaSchema {
  /**
   * 唯一标识
   */
  id: string;
  /**
   * 功能号
   */
  code: string;
  /**
   * 报表名称
   */
  title: string;
  /**
   * 查询方案编号
   */
  queryCode: string;
}

/**
 * 页面级引用数据源
 */
export interface DataSourceSchema {
  /**
   * 数据源类型
   */
  type: DataSourceType;

  /**
   * 数据源引用唯一标识
   */

  ref: string;

  /**
   * 数据源名称
   */
  name: string;

  /**
   * 描述标题
   */
  label?: string;

  /**
   * 数据转换函数
   */
  transform?: JSFunction;

  /**
   * 测试用例
   */
  test?: JSFunction;
}
