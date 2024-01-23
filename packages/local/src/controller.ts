import {
  type ProjectSchema,
  type BlockSchema,
  type HistorySchema,
  type PageFile
} from '@vtj/core';
import { type ApiRequest, type ApiResponse, fail } from './shared';
import * as service from './service';

export interface Controller {
  [index: string]: (req: ApiRequest) => Promise<ApiResponse>;
}

const controller: Controller = {
  notMatch: async (_req: ApiRequest) => {
    return fail('找不到处理程序');
  },
  init: service.init,
  saveProject: async (req: ApiRequest) => {
    const project = req.data as ProjectSchema;
    return service.saveProject(project);
  },
  saveFile: async (req: ApiRequest) => {
    const file = req.data as BlockSchema;
    return service.saveFile(file);
  },
  getFile: async (req: ApiRequest) => {
    const id = req.data as string;
    return service.getFile(id);
  },
  removeFile: async (req: ApiRequest) => {
    const id = req.data as string;
    return service.removeFile(id);
  },
  getHistory: async (req: ApiRequest) => {
    const id = req.data as string;
    return service.getHistory(id);
  },
  saveHistory: async (req: ApiRequest) => {
    const file = req.data as HistorySchema;
    return service.saveHistory(file);
  },
  removeHistory: async (req: ApiRequest) => {
    const id = req.data as string;
    return service.removeHistory(id);
  },
  getHistoryItem: async (req: ApiRequest) => {
    const { fId, id } = req.data || {};
    return service.getHistoryItem(fId, id);
  },
  saveHistoryItem: async (req: ApiRequest) => {
    const { fId, item } = req.data || {};
    return service.saveHistoryItem(fId, item);
  },
  removeHistoryItem: async (req: ApiRequest) => {
    const { fId, ids = [] } = req.data || {};
    return service.removeHistoryItem(fId, ids);
  },
  saveMaterials: async (req: ApiRequest) => {
    const { project, materials } = req.data || {};
    return service.saveMaterials(project, materials);
  },
  publishFile: async (req: ApiRequest) => {
    const { project, file } = req.data || {};
    return service.publishFile(project, file);
  },
  publish: async (req: ApiRequest) => {
    const project = req.data || {};
    return service.publish(project);
  },
  genVueContent: async (req: ApiRequest) => {
    const { project, dsl } = req.data || {};
    return service.genVueContent(project, dsl);
  },
  createRawPage: async (req: ApiRequest) => {
    const file = req.data as PageFile;
    return service.createRawPage(file);
  },
  removeRawPage: async (req: ApiRequest) => {
    const id = req.data as string;
    return service.removeRawPage(id);
  }
};

export const router = async (req: any) => {
  const body: ApiRequest = req.body || {};
  const handler = controller[body.type] || controller.notMatch;
  try {
    return await handler(body);
  } catch (e) {
    await service.saveLogs(e);
    return fail('异常错误', e);
  }
};
