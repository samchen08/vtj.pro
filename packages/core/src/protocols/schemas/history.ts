import type { BlockSchema } from './block';
import type { ProjectSchema } from './project';

export type HistoryType = 'file' | 'project';

export type HistoryDsl = BlockSchema | ProjectSchema;

/**
 * 历史记录描述
 */
export interface HistorySchema {
  /**
   * 页面或区块文件id
   */
  id: string;

  /**
   * 历史记录类型，旧数据默认为文件历史
   */
  type?: HistoryType;

  /**
   * 历史记录项
   */
  items?: HistoryItem[];
}

/**
 * 记录项
 */
export interface HistoryItem {
  /**
   * 记录项唯一标识
   */
  id: string;
  /**
   * 记录项描述
   */
  label: string;
  /**
   * 记录项内容
   */
  dsl?: HistoryDsl;

  /**
   * 备注
   */
  remark?: string;
}
