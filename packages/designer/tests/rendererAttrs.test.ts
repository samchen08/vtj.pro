import { describe, expect, it } from 'vitest';
import { BlockModel, NodeModel } from '@vtj/core';
import {
  isAttrsEqual,
  takeAttrsSnapshot
} from '../src/framework/renderer-utils';

function createBlock() {
  return new BlockModel({
    id: 'page-attrs',
    name: 'PageAttrs',
    state: { count: 0 },
    props: [],
    nodes: [
      { id: 'node-a', name: 'div' },
      { id: 'node-b', name: 'span' }
    ]
  } as any);
}

describe('renderer attrs snapshot', () => {
  it('节点树变化不视为区块属性变化', () => {
    const block = createBlock();
    const snapshot = takeAttrsSnapshot(block);

    block.addNode(new NodeModel({ name: 'p' } as any));

    expect(isAttrsEqual(block, snapshot)).toBe(true);
  });

  it('删除节点不视为区块属性变化', () => {
    const block = createBlock();
    const snapshot = takeAttrsSnapshot(block);

    block.removeNode(block.nodes[0]);

    expect(isAttrsEqual(block, snapshot)).toBe(true);
  });

  it('原地修改 state 能被识别', () => {
    const block = createBlock();
    const snapshot = takeAttrsSnapshot(block);

    block.setState('count', 1);

    expect(isAttrsEqual(block, snapshot)).toBe(false);
  });

  it('原地修改区块 props 能被识别', () => {
    const block = createBlock();
    const snapshot = takeAttrsSnapshot(block);

    block.setProp({ name: 'title', type: 'String' } as any);

    expect(isAttrsEqual(block, snapshot)).toBe(false);
  });

  it('修改 CSS 能被识别', () => {
    const block = createBlock();
    const snapshot = takeAttrsSnapshot(block);

    block.setCss('.page { color: red; }');

    expect(isAttrsEqual(block, snapshot)).toBe(false);
  });

  it('未发生变更时判定为一致', () => {
    const block = createBlock();
    const snapshot = takeAttrsSnapshot(block);

    expect(isAttrsEqual(block, snapshot)).toBe(true);
  });
});
