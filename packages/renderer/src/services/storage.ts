import {
  type ProjectSchema,
  type BlockSchema,
  type HistorySchema,
  type HistoryItem,
  type MaterialDescription,
  ProjectModel,
  HistoryModel
} from '@vtj/core';
import { Storage, mapToObject } from '@vtj/utils';
import { BaseService } from './base';

const storage = new Storage({
  type: 'local',
  expired: 0,
  prefix: '__VTJ_'
});

export class StorageService extends BaseService {
  public init(project: ProjectSchema): Promise<ProjectSchema> {
    const model = new ProjectModel(project);
    const match = storage.get(`project_${model.id}`);
    const dsl = Object.assign(model.toDsl(), match || {});
    storage.save(`project_${model.id}`, dsl);
    return Promise.resolve(dsl);
  }

  public saveProject(project: ProjectSchema): Promise<boolean> {
    const model = new ProjectModel(project);
    storage.save(`project_${model.id}`, model.toDsl());
    return Promise.resolve(true);
  }

  public saveMaterials(
    project: ProjectSchema,
    materials: Map<string, MaterialDescription>
  ): Promise<boolean> {
    storage.save(`materials_${project.id}`, mapToObject(materials));
    return Promise.resolve(true);
  }

  public saveFile(file: BlockSchema): Promise<boolean> {
    storage.save(`file_${file.id}`, file);
    return Promise.resolve(true);
  }

  public getFile(id: string): Promise<BlockSchema> {
    const dsl = storage.get(`file_${id}`);
    if (dsl) {
      return Promise.resolve(dsl as BlockSchema);
    } else {
      return Promise.reject(null);
    }
  }

  public removeFile(id: string): Promise<boolean> {
    storage.remove(`file_${id}`);
    return Promise.resolve(true);
  }

  public saveHistory(history: HistorySchema): Promise<boolean> {
    storage.save(`history_${history.id}`, history);
    return Promise.resolve(true);
  }

  public removeHistory(id: string): Promise<boolean> {
    const history = storage.get(`history_${id}`) as HistorySchema;
    if (history) {
      const items = history.items || [];
      const ids = items.map((item) => item.id);
      this.removeHistoryItem(id, ids);
      storage.remove(`history_${id}`);
    }

    return Promise.resolve(true);
  }

  public getHistory(id: string): Promise<HistorySchema> {
    const dsl = storage.get(`history_${id}`);
    const history = new HistoryModel(dsl || { id });
    return Promise.resolve(history.toDsl());
  }

  public getHistoryItem(fId: string, id: string): Promise<HistoryItem> {
    const item = storage.get(`history_${fId}_${id}`);
    return Promise.resolve(item);
  }

  public saveHistoryItem(fId: string, item: HistoryItem): Promise<boolean> {
    storage.save(`history_${fId}_${item.id}`, item);
    return Promise.resolve(true);
  }

  public removeHistoryItem(fId: string, ids: string[]): Promise<boolean> {
    ids.forEach((id) => {
      storage.remove(`history_${fId}_${id}`);
    });
    return Promise.resolve(true);
  }
}
