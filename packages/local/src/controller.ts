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
  saveProject: async (req: ApiRequest, opts: DevToolsOptions) => {
    const project = req.data as ProjectSchema;
    return service.saveProject(project, req.query?.type, opts);
  },
  saveFile: async (req: ApiRequest, opts: DevToolsOptions) => {
    const file = req.data as BlockSchema;
    return service.saveFile(file, opts);
  },
  getFile: async (req: ApiRequest, opts: DevToolsOptions) => {
    const id = req.data as string;
    return service.getFile(id, opts);
  },
  removeFile: async (req: ApiRequest, opts: DevToolsOptions) => {
    const id = req.data as string;
    return service.removeFile(id, opts);
  },
  getHistory: async (req: ApiRequest, opts: DevToolsOptions) => {
    const id = req.data as string;
    return service.getHistory(id, opts);
  },
  saveHistory: async (req: ApiRequest, opts: DevToolsOptions) => {
    const file = req.data as HistorySchema;
    return service.saveHistory(file, opts);
  },
  removeHistory: async (req: ApiRequest, opts: DevToolsOptions) => {
    const id = req.data as string;
    return service.removeHistory(id, opts);
  },
  getHistoryItem: async (req: ApiRequest, opts: DevToolsOptions) => {
    const { fId, id } = req.data || {};
    return service.getHistoryItem(fId, id, opts);
  },
  saveHistoryItem: async (req: ApiRequest, opts: DevToolsOptions) => {
    const { fId, item } = req.data || {};
    return service.saveHistoryItem(fId, item, opts);
  },
  removeHistoryItem: async (req: ApiRequest, opts: DevToolsOptions) => {
    const { fId, ids = [] } = req.data || {};
    return service.removeHistoryItem(fId, ids, opts);
  },
  saveMaterials: async (req: ApiRequest, opts: DevToolsOptions) => {
    const { project, materials } = req.data || {};
    return service.saveMaterials(project, materials, opts);
  },
  publishFile: async (req: ApiRequest, opts: DevToolsOptions) => {
    const { project, file } = req.data || {};
    const result = await service.publishFile(project, file, undefined, opts);
    if (project.platform === 'uniapp') {
      await service.genUniConfig(project, true);
    }
    return result;
  },
  publish: async (req: ApiRequest, opts: DevToolsOptions) => {
    const project = req.data || {};
    return service.publish(project, opts);
  },
  genVueContent: async (req: ApiRequest, opts: DevToolsOptions) => {
    const { project, dsl } = req.data || {};
    return service.genVueContent(project, dsl, opts);
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
  createRawPage: async (req: ApiRequest, opts: DevToolsOptions) => {
    const file = req.data as PageFile;
    return service.createRawPage(file, opts);
  },
  removeRawPage: async (req: ApiRequest, opts: DevToolsOptions) => {
    const id = req.data as string;
    return service.removeRawPage(id, opts);
  },
  getStaticFiles: async (_req: ApiRequest, opts: DevToolsOptions) => {
    return service.getStaticFiles({
      staticBase: opts.staticBase,
      staticDir: opts.staticDir,
      vtjStaticDir: opts.vtjStaticDir
    });
  },
  removeStaticFile: async (req: ApiRequest, opts: DevToolsOptions) => {
    const name = req.data?.name as string;
    return service.removeStaticFile(name, {
      staticBase: opts.staticBase,
      staticDir: opts.staticDir,
      vtjStaticDir: opts.vtjStaticDir
    });
  },
  clearStaticFiles: async (_req: ApiRequest, opts: DevToolsOptions) => {
    return service.clearStaticFiles({
      staticBase: opts.staticBase,
      staticDir: opts.staticDir,
      vtjStaticDir: opts.vtjStaticDir
    });
  },

  uploader: async (req: any, opts: DevToolsOptions) => {
    if (!opts) return fail('异常错误');
    const uploadDir = resolve(opts.staticDir, opts.vtjStaticDir);
    const form = formidable({
      keepExtensions: true,
      multiples: true,
      createDirsFromUploads: true,
      uploadDir
    });
    return await new Promise<ApiResponse>((reslove) => {
      form.parse(req, async (err, _fields, files) => {
        if (err) {
          reslove(fail('异常错误', err));
          return;
        }
        const tempFiles = files.files || [];
        const result = await service.uploadStaticFiles(tempFiles, {
          staticBase: opts.staticBase,
          staticDir: opts.staticDir,
          vtjStaticDir: opts.vtjStaticDir
        });
        setTimeout(() => {
          reslove(result);
        }, 200);
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
      await service.saveLogs(info, opts);
      return fail('异常错误', e?.message, e?.stack);
    }
  }
};
