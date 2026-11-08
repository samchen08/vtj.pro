import { describe, expect, it } from 'vitest';
import {
  createApp,
  defineComponent,
  h,
  nextTick,
  reactive,
  Suspense
} from 'vue';
import { BlockModel, type BlockSchema, type NodeSchema } from '@vtj/core';
import { ContextMode, createRenderer } from '@vtj/renderer';

/**
 * 旧实现（Renderer.updateChild）的算法：按 id 定向替换子树。
 * 仅用于对照，验证跨父级移动时它会漏掉旧父节点。
 */
function patchSubtree(node: NodeSchema, parent: any): boolean {
  const children = parent.children || parent.nodes || [];
  for (let i = 0; i < children.length; i++) {
    if (children[i].id === node.id) {
      children.splice(i, 1, node);
      return true;
    }
    if (patchSubtree(node, children[i])) return true;
  }
  return false;
}

function countInDsl(dsl: any, id: string): number {
  let count = 0;
  const walk = (nodes: any[] = []) => {
    for (const n of nodes) {
      if (n.id === id) count++;
      if (Array.isArray(n.children)) walk(n.children);
    }
  };
  walk(dsl.nodes);
  return count;
}

function createBlock() {
  return new BlockModel({
    id: 'page-move',
    name: 'MovePage',
    nodes: [
      {
        id: 'root-a',
        name: 'div',
        children: [{ id: 'child-1', name: 'span', children: 'moved' }]
      },
      { id: 'root-b', name: 'div', children: [] }
    ]
  } as any);
}

describe('跨父级移动节点', () => {
  it('整体同步节点树后不会渲染出重复元素', async () => {
    const block = createBlock();
    const dsl = reactive(block.toDsl()) as BlockSchema;
    const { renderer } = createRenderer({
      dsl,
      mode: ContextMode.Design
    });
    const host = document.createElement('div');
    document.body.appendChild(host);
    const app = createApp(
      defineComponent({
        render: () => h(Suspense, null, { default: () => h(renderer) })
      })
    );
    app.mount(host);
    await nextTick();
    await nextTick();

    const rendered = () => host.querySelectorAll('[data-vtj="child-1"]').length;

    expect(rendered()).toBe(1);

    // 把 child-1 从 root-a 内部移动到 root-b 内部
    const child = (block.nodes[0] as any).children[0];
    block.move(child, block.nodes[1], 'inner');

    // 旧实现只更新「新父节点」，旧父节点在响应式 DSL 里仍留着这个节点
    patchSubtree((block.nodes[1] as any).toDsl(), dsl);
    await nextTick();
    expect(countInDsl(dsl, 'child-1')).toBe(2);
    expect(rendered()).toBe(2);

    // 新实现：整体替换节点树
    dsl.nodes = (block.toDsl().nodes || []) as NodeSchema[];
    await nextTick();

    expect(countInDsl(dsl, 'child-1')).toBe(1);
    expect(rendered()).toBe(1);
    expect(host.querySelector('[data-vtj="root-a"]')?.children.length).toBe(0);

    app.unmount();
    host.remove();
  });
});
