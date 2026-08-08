/**
 * 通用 ID 生成（时间戳 + 随机后缀）
 */
export function genId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
