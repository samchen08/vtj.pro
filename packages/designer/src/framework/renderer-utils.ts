import { BlockModel } from '@vtj/core';

/**
 * 采集区块级属性快照（不含节点树）。
 *
 * 采用序列化后的字符串，而不是原值引用：setProp / setState / removeFunction
 * 等方法都是原地修改同一个数组或对象，持有引用的快照会跟着一起变，
 * 从而漏判变更，导致画布该重建时没有重建。
 */
export function takeAttrsSnapshot(block: BlockModel): Record<string, string> {
  const snapshot: Record<string, string> = {};
  for (const key of BlockModel.normalAttrs) {
    snapshot[key] = JSON.stringify((block as any)[key] ?? null);
  }
  return snapshot;
}

/**
 * 判断区块级属性是否与快照一致。
 * 一致说明本次变更只动了节点树，可以直接同步 DSL，无需重建整个 App。
 */
export function isAttrsEqual(
  block: BlockModel,
  snapshot: Record<string, string>
): boolean {
  for (const key of BlockModel.normalAttrs) {
    const value = JSON.stringify((block as any)[key] ?? null);
    if (value !== snapshot[key]) {
      return false;
    }
  }
  return true;
}
