import type { BlockSchema } from './block';

/**
 * 历史记录描述
 */
export interface HistorySchema {
  /**
   * 页面或区块文件id
   */
  id: string;

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
  dsl?: BlockSchema;
}
