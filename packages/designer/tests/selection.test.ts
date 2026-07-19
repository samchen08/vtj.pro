import { describe, expect, it } from 'vitest';
import { BlockModel } from '@vtj/core';
import type { Engine } from '../src/framework';
import {
  applyAISelection,
  createAISelectionContext,
  parseAINodeSchema
} from '../src/components/hooks/selection';

function createEngine(block: BlockModel, selectedIndex = 0) {
  return {
    current: { value: block },
    simulator: {
      designer: {
        value: {
          selected: {
            value: {
              model: block.nodes[selectedIndex]
            }
          }
        }
      }
    }
  } as unknown as Engine;
}

describe('AI selected component helpers', () => {
  it('parses the vtj-node JSON payload', () => {
    expect(
      parseAINodeSchema(
        '{"name":"ElButton","props":{"type":"success"}}'
      )
    ).toMatchObject({ name: 'ElButton', props: { type: 'success' } });
    expect(() => parseAINodeSchema('{"props":{}}')).toThrow(
      'Invalid VTJ NodeSchema'
    );
  });

  it('captures the selected node DSL and stable path', () => {
    const block = new BlockModel({
      id: 'page-1',
      name: 'PageOne',
      nodes: [
        {
          id: 'layout',
          name: 'div',
          children: [{ id: 'button', name: 'ElButton', children: 'Save' }]
        }
      ]
    });
    const children = block.nodes[0].children;
    expect(Array.isArray(children)).toBe(true);
    const button = (children as any[])[0];
    const engine = createEngine(block);
    (engine.simulator.designer.value!.selected.value as any).model = button;

    const selection = createAISelectionContext(engine);

    expect(selection).toMatchObject({
      nodeId: 'button',
      name: 'ElButton',
      indexPath: [0, 0],
      path: ['div#layout', 'ElButton#button']
    });
    expect(selection?.dsl.children).toBe('Save');
  });

  it('updates only the captured node and preserves its identity', () => {
    const block = new BlockModel({
      id: 'page-1',
      name: 'PageOne',
      nodes: [
        { id: 'selected', name: 'ElButton', props: { type: 'primary' } },
        { id: 'sibling', name: 'div', children: 'Keep me' }
      ]
    });
    const selection = createAISelectionContext(createEngine(block));

    const updated = applyAISelection(block, selection!, {
      name: 'ElButton',
      props: { type: 'success' },
      children: 'Updated'
    });

    expect(updated.id).toBe('selected');
    expect(updated.toDsl()).toMatchObject({
      id: 'selected',
      name: 'ElButton',
      props: { type: 'success' },
      children: 'Updated'
    });
    expect(block.nodes[1].toDsl()).toMatchObject({
      id: 'sibling',
      children: 'Keep me'
    });
  });

  it('rejects a generated root component with a different type', () => {
    const block = new BlockModel({
      id: 'page-1',
      name: 'PageOne',
      nodes: [{ id: 'selected', name: 'ElButton' }]
    });
    const selection = createAISelectionContext(createEngine(block));

    expect(() =>
      applyAISelection(block, selection!, { name: 'ElInput' })
    ).toThrow('根组件类型');
  });
});
