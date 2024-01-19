import {
  type ProjectSchema,
  type BlockSchema,
  type HistorySchema,
  type HistoryItem,
  type MaterialDescription
} from '@vtj/core';
import { mapToObject } from '@vtj/utils';
import { BaseService } from './base';

export class LocalService extends BaseService {
  async init(project: ProjectSchema): Promise<ProjectSchema> {
    const res = await this.api('init', project).catch(() => null);
    return (res || {}) as ProjectSchema;
  }

  async saveProject(project: ProjectSchema): Promise<boolean> {
    const res = await this.api('saveProject', project).catch(() => false);
    return !!res;
  }

  async saveMaterials(
    project: ProjectSchema,
    materials: Map<string, MaterialDescription>
  ): Promise<boolean> {
    return !!(await this.api('saveMaterials', {
      project,
      materials: mapToObject(materials)
    }).catch(() => false));
  }

  async saveFile(file: BlockSchema): Promise<boolean> {
    const res = await this.api('saveFile', file).catch(() => false);
    return !!res;
  }
  async getFile(id: string): Promise<BlockSchema> {
    const res = await this.api('getFile', id).catch(() => null);
    return (res || {}) as BlockSchema;
  }

  async removeFile(id: string): Promise<boolean> {
    const res = await this.api('removeFile', id).catch(() => false);
    return !!res;
  }

  async saveHistory(history: HistorySchema): Promise<boolean> {
    const res = await this.api('saveHistory', history).catch(() => false);
    return !!res;
  }

  async removeHistory(id: string): Promise<boolean> {
    const res = await this.api('removeHistory', id).catch(() => false);
    return !!res;
  }

  async getHistory(id: string): Promise<HistorySchema> {
    const res = await this.api('getHistory', id).catch(() => null);
    return (res || {}) as HistorySchema;
  }

  async getHistoryItem(fId: string, id: string): Promise<HistoryItem> {
    const res = await this.api('getHistoryItem', { fId, id }).catch(() => null);
    return (res || {}) as HistoryItem;
  }

  async saveHistoryItem(fId: string, item: HistoryItem): Promise<boolean> {
    const res = await this.api('saveHistoryItem', { fId, item }).catch(
      () => false
    );
    return !!res;
  }

  async removeHistoryItem(fId: string, ids: string[]): Promise<boolean> {
    const res = await this.api('removeHistoryItem', { fId, ids }).catch(
      () => false
    );
    return !!res;
  }
}
