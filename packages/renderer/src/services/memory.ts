import {
  type ProjectSchema,
  type BlockSchema,
  type HistorySchema,
  type HistoryItem,
  type MaterialDescription,
  ProjectModel,
  HistoryModel
} from '@vtj/core';

import { mapToObject } from '@vtj/utils';
import { BaseService } from './base';

export class MemoryService extends BaseService {
  private projects: Record<string, ProjectSchema> = {};
  private materials: Record<string, Record<string, MaterialDescription>> = {};
  private files: Record<string, BlockSchema> = {};
  private histories: Record<string, HistorySchema> = {};
  private historyItems: Record<string, HistoryItem> = {};

  public init(project: ProjectSchema): Promise<ProjectSchema> {
    const model = new ProjectModel(project);
    const match = this.projects[model.id] || {};
    const dsl = Object.assign(model.toDsl(), match);
    this.projects[dsl.id as string] = dsl;
    return Promise.resolve(dsl);
  }

  public saveProject(project: ProjectSchema): Promise<boolean> {
    const model = new ProjectModel(project);
    this.projects[model.id] = model.toDsl();
    return Promise.resolve(true);
  }

  public saveMaterials(
    project: ProjectSchema,
    materials: Map<string, MaterialDescription>
  ): Promise<boolean> {
    if (project.id) {
      this.materials[project.id] = mapToObject(materials);
    }
    return Promise.resolve(true);
  }

  public saveFile(file: BlockSchema): Promise<boolean> {
    this.files[file.id as string] = file;
    return Promise.resolve(true);
  }

  public getFile(id: string): Promise<BlockSchema> {
    const file = this.files[id];
    return file ? Promise.resolve(file) : Promise.reject(null);
  }

  public removeFile(id: string): Promise<boolean> {
    delete this.files[id];
    return Promise.resolve(true);
  }

  public saveHistory(history: HistorySchema): Promise<boolean> {
    this.histories[history.id] = history;
    return Promise.resolve(true);
  }

  public removeHistory(id: string): Promise<boolean> {
    const history = this.histories[id] as HistorySchema;
    if (history) {
      const items = history.items || [];
      const ids = items.map((item) => item.id);
      this.removeHistoryItem(id, ids);
      delete this.historyItems[id];
    }
    return Promise.resolve(true);
  }

  public getHistory(id: string): Promise<HistorySchema> {
    const dsl = this.histories[id];
    const history = new HistoryModel(dsl || { id });
    return Promise.resolve(history);
  }

  public getHistoryItem(fId: string, id: string): Promise<HistoryItem> {
    const key = `${fId}_${id}`;
    const item = this.historyItems[key] || {};
    return Promise.resolve(item);
  }

  public saveHistoryItem(fId: string, item: HistoryItem): Promise<boolean> {
    const key = `${fId}_${item.id}`;
    this.historyItems[key] = item;
    return Promise.resolve(true);
  }

  public removeHistoryItem(fId: string, ids: string[]): Promise<boolean> {
    ids.forEach((id) => {
      const key = `${fId}_${id}`;
      delete this.historyItems[key];
    });
    return Promise.resolve(true);
  }
}

let serviceInstance: MemoryService | null = null;

export function createMemoryService() {
  if (serviceInstance) return serviceInstance;
  {
    serviceInstance = new MemoryService();
    return serviceInstance;
  }
}
