import {
  type ProjectSchema,
  type BlockSchema,
  type HistorySchema,
  type PageFile
} from '@vtj/core';
import formidable from 'formidable';
import { type ApiRequest, type ApiResponse, fail } from './shared';
import * as service from './service';
import type { DevToolsOptions } from './plugin';
import { resolve } from 'path';

export interface Controller {
  [index: string]: (
    req: ApiRequest,
    opts: DevToolsOptions
  ) => Promise<ApiResponse>;
}

const controller: Controller = {
  notMatch: async (_req: ApiRequest) => {
    return fail('找不到处理程序');
  },
  getExtension: service.getExtension,
  init: service.init,
  saveProject: async (req: ApiRequest) => {
    const project = req.data as ProjectSchema;
    return service.saveProject(project, req.query?.type);
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
    const result = await service.publishFile(project, file);
    if (project.platform === 'uniapp') {
      await service.genUniConfig(project, true);
    }
    return result;
  },
  publish: async (req: ApiRequest) => {
    const project = req.data || {};
    return service.publish(project);
  },
  genVueContent: async (req: ApiRequest) => {
    const { project, dsl } = req.data || {};
    return service.genVueContent(project, dsl);
  },
  parseVue: async (req: ApiRequest) => {
    const { id, name, source, project } = req.data || {};
    return service.parseVue({
      id,
      name,
      source,
      project
    });
  },
  createRawPage: async (req: ApiRequest) => {
    const file = req.data as PageFile;
    return service.createRawPage(file);
  },
  removeRawPage: async (req: ApiRequest) => {
    const id = req.data as string;
    return service.removeRawPage(id);
  },
  getStaticFiles: async (_req: ApiRequest, opts?: DevToolsOptions) => {
    return service.getStaticFiles(opts as any);
  },
  removeStaticFile: async (req: ApiRequest, opts?: DevToolsOptions) => {
    const name = req.data?.name as string;
    return service.removeStaticFile(name, opts as any);
  },
  clearStaticFiles: async (_req: ApiRequest, opts?: DevToolsOptions) => {
    return service.clearStaticFiles(opts as any);
  },

  uploader: async (req: any, opts?: DevToolsOptions) => {
    if (!opts) return fail('异常错误');
    const uploadDir = resolve(opts.staticDir, opts.vtjDir);
    const form = formidable({
      keepExtensions: true,
      multiples: true,
      createDirsFromUploads: true,
      uploadDir
    });
    return await new Promise<ApiResponse>((reslove) => {
      form.parse(req, (err, _fields, files) => {
        if (err) {
          reslove(fail('异常错误', err));
          return;
        }
        const tempFiles = files.files || [];
        const result = service.uploadStaticFiles(tempFiles, opts as any);
        reslove(result);
      });
    });
  }
};

export function parse(str: string, sep?: string, eq?: string) {
  const obj: Record<string, any> = {};
  str = str.replace(/^[^]*\?/, '');
  sep = sep || '&';
  eq = eq || '=';
  let arr;
  const reg = new RegExp(
    '(?:^|\\' +
      sep +
      ')([^\\' +
      eq +
      '\\' +
      sep +
      ']+)(?:\\' +
      eq +
      '([^\\' +
      sep +
      ']*))?',
    'g'
  );
  while ((arr = reg.exec(str)) !== null) {
    if (arr[1] !== str) {
      obj[decodeURIComponent(arr[1])] = decodeURIComponent(arr[2] || '');
    }
  }
  return obj;
}

export const router = async (req: any, opts: DevToolsOptions) => {
  const body: ApiRequest = req.body || {};
  body.query = parse(req.url);
  const reqUrl = req.url || '';
  const uploaderPath = `${opts.baseURL}${opts.uploader}`;
  const isUploader = reqUrl.startsWith(uploaderPath);
  if (isUploader) {
    return await controller.uploader(req, opts);
  } else {
    const handler = controller[body.type] || controller.notMatch;
    try {
      return await handler(body, opts);
    } catch (e: any) {
      const info = {
        input: body,
        error: {
          message: e?.message,
          stack: e?.stack
        }
      };
      await service.saveLogs(info);
      return fail('异常错误', e?.message, e?.stack);
    }
  }
};
