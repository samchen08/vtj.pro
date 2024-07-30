import type { GridColumns } from '../grid';
import type { VxeTablePropTypes } from 'vxe-table';

export interface GridEditorProps {
  title?: string;
  /**
   * 表格列配置
   */
  columns?: GridColumns;

  /**
   * 表格数据
   */
  modelValue?: any;

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
   * 弹窗配置
   */
  dialogProps?: Record<string, any>;
}

export type GridEditorEmits = {
  'update:modelValue': [model: any];
  change: [model: any];
};
