import {
  isNode,
  type BlockModel,
  type NodeModel,
  type NodeSchema
} from '@vtj/core';
import type { AISelectionContext, Engine } from '../../framework';

function findNode(nodes: NodeModel[], nodeId: string): NodeModel | null {
  for (const node of nodes) {
    if (node.id === nodeId) return node;
    if (Array.isArray(node.children)) {
      const child = findNode(node.children, nodeId);
      if (child) return child;
    }
  }
  return null;
}

export function parseAINodeSchema(content: string): NodeSchema {
  const schema = JSON.parse(content);
  if (!schema || typeof schema !== 'object' || typeof schema.name !== 'string') {
    throw new Error('Invalid VTJ NodeSchema');
  }
  return schema;
}

function getNodePath(block: BlockModel, node: NodeModel) {
  const nodes: NodeModel[] = [];
  let current: NodeModel | null = node;
  while (current) {
    nodes.unshift(current);
    current = current.parent;
  }

  const indexPath: number[] = [];
  let siblings = block.nodes;
  for (const item of nodes) {
    const index = siblings.findIndex((child) => child.id === item.id);
    if (index < 0) return null;
    indexPath.push(index);
    siblings = Array.isArray(item.children) ? item.children : [];
  }

  return {
    path: nodes.map((item) => `${item.name}#${item.id}`),
    indexPath
  };
}

export function createAISelectionContext(
  engine: Engine
): AISelectionContext | null {
  const block = engine.current.value;
  const model = engine.simulator.designer.value?.selected.value?.model;
  if (!block || !isNode(model)) return null;

  const nodePath = getNodePath(block, model);
  if (!nodePath) return null;

  return {
    nodeId: model.id,
    name: model.name,
    from: model.from,
    ...nodePath,
    dsl: model.toDsl()
  };
}

export function applyAISelection(
  block: BlockModel,
  selection: AISelectionContext,
  schema: NodeSchema
) {
  const target = findNode(block.nodes, selection.nodeId);
  if (!target) {
    throw new Error('选中的组件已不存在，无法应用 AI 修改');
  }
  if (!schema || schema.name !== target.name || schema.name !== selection.name) {
    throw new Error('AI 返回的根组件类型与选中组件不一致');
  }

  const current = target.toDsl();
  target.update({
    ...current,
    ...schema,
    id: target.id,
    name: target.name,
    from: target.from
  });
  return target;
}
