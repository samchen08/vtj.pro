import { BlockModel, NodeModel } from '../models';
import { type BlockSchema, type NodeSchema } from '../protocols';

export function isBlock(value: unknown): value is BlockModel {
  return value instanceof BlockModel;
}

export function isNode(value: unknown): value is BlockModel {
  return value instanceof NodeModel;
}

export function isBlockSchema(value: unknown): value is BlockSchema {
  return !!(value as any).__VTJ_BLOCK__;
}

export function cloneDsl(dsl: NodeSchema) {
  delete dsl.id;
  if (Array.isArray(dsl.children)) {
    dsl.children = dsl.children.map((n) => cloneDsl(n));
  }
  return dsl;
}
