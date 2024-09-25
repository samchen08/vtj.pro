import { cloneDeep } from '@vtj/base';
import { BlockModel, NodeModel } from '../models';
import {
  type BlockSchema,
  type NodeSchema,
  type BlockFile,
  type NodeFrom
} from '../protocols';

export function isBlock(value: unknown): value is BlockModel {
  return value instanceof BlockModel;
}

export function isNode(value: unknown): value is BlockModel {
  return value instanceof NodeModel;
}

export function isBlockSchema(value: unknown): value is BlockSchema {
  return !!(value as any).__VTJ_BLOCK__;
}

export function cloneDsl(oDsl: NodeSchema) {
  const dsl = cloneDeep(oDsl);
  delete dsl.id;
  if (Array.isArray(dsl.children)) {
    dsl.children = dsl.children.map((n) => cloneDsl(n));
  }
  return dsl;
}

export function createNodeFrom(file: BlockFile): NodeFrom {
  const fromType = file.fromType || 'Schema';
  if (fromType === 'Schema') {
    return {
      type: 'Schema',
      id: file.id as string
    };
  }
  if (fromType === 'UrlSchema') {
    return {
      type: 'UrlSchema',
      url: (file.urls || '').split(',')[0] || ''
    };
  }

  if (fromType === 'Plugin') {
    return {
      type: 'Plugin',
      urls: (file.urls || '').split(','),
      library: file.library
    };
  }
  return '';
}
