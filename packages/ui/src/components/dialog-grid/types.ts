import type { GridColumns } from '../grid';
import type { VxeTablePropTypes } from 'vxe-table';

export interface DialogGridProps {
  /**
   * 表格列配置
   */
  columns?: GridColumns;

  /**
   * 表格数据
   */
  model?: any;

  /**
   *  model数据转换为表格数据
   * @param model
   * @returns
   */
  formatter?: (model: any) => any[];

  /**
   * 表格数据转换为model数据
   * @param rows
   * @returns
   */
  valueFormatter?: (rows: any) => any;

  /**
   * 表格验证规则
   */
  rules?: VxeTablePropTypes.EditRules;

  /**
   * 显示增行按钮
   */
  plus?: boolean;

  /**
   * 显示删行按钮
   */
  minus?: boolean;

  /**
   *  表格其他配置
   */
  gridProps?: Record<string, any>;

  /**
   * 表单提交方法， return true 关闭弹窗
   * @param model
   * @returns
   */
  submitMethod?: (model: any) => Promise<boolean>;
}

export type DialogGridEmits = {
  submit: [model: any];
};
