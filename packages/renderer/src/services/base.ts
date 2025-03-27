import {
  type ProjectSchema,
  type PageFile,
  type BlockFile,
  type BlockSchema,
  type MaterialDescription,
  type HistorySchema,
  type HistoryItem,
  type Service,
  type StaticFileInfo,
  type NodeFromPlugin,
  type VTJConfig
} from '@vtj/core';
import {
  type IStaticRequest,
  type IRequestSettings,
  request,
  createRequest
} from '@vtj/utils';
import { isJSON } from '../utils';

const settings: IRequestSettings = {
  type: 'json',
  validSuccess: true,
  originResponse: false,
  failMessage: true,
  validate: (res: any) => {
    return res.data?.code === 0;
  }
};

const createApi = (
  request: IStaticRequest,
  url: string = '/__vtj__/api/:type.json'
) => {
  return (type: string, data?: any, query?: any) => {
    return request.send({
      url,
      method: 'post',
      params: { type },
      query,
      data: {
        type,
        data
      },
      settings
    });
  };
};

const createUploader = (
  request: IStaticRequest,
  url: string = '/__vtj__/api/uploader.json'
) => {
  return async (file: File, projectId: string) => {
    return await request
      .send({
        url,
        method: 'post',
        data: {
          files: file,
          projectId
        },
        settings: {
          ...settings,
          type: 'data'
        }
      })
      .then((res) => {
        if (res && res[0]) {
          return res[0];
        }
        return null;
      })
      .catch(() => null);
  };
};

export function createServiceRequest(notify?: (msg: string) => void) {
  return createRequest({
    settings: {
      type: 'json',
      validSuccess: true,
      originResponse: false,
      failMessage: true,
      validate: (res: any) => {
        return res.data?.code === 0;
      },
      showError: (msg: string) => {
        if (notify) {
          notify(msg || '未知错误');
        }
      }
    }
  });
}

export class BaseService implements Service {
  protected api: (type: string, data: any, query?: any) => Promise<any>;
  private pluginCaches: Record<string, any> = {};
  protected uploader: (
    file: File,
    projectId: string
  ) => Promise<StaticFileInfo>;
  constructor(public req: IStaticRequest = request) {
    this.api = createApi(req);
    this.uploader = createUploader(req);
  }
  async getExtension(): Promise<VTJConfig | undefined> {
    console.log('BaseService.getExtension');
    return undefined;
  }

  async init(project: ProjectSchema): Promise<ProjectSchema> {
    console.log('BaseService.init', project);
    return {} as ProjectSchema;
  }

  async saveProject(project: ProjectSchema, type?: string): Promise<boolean> {
    const res = await this.api('saveProject', project, { type }).catch(
      () => false
    );
    return !!res;
  }

  async saveMaterials(
    project: ProjectSchema,
    materials: Map<string, MaterialDescription>
  ): Promise<boolean> {
    console.log('BaseService.saveMaterials', project, materials);
    return false;
  }

  async saveFile(file: BlockSchema): Promise<boolean> {
    console.log('BaseService.saveFile', file);
    return false;
  }
  async getFile(id: string): Promise<BlockSchema> {
    console.log('BaseService.getFile', id);
    return {} as BlockSchema;
  }

  async removeFile(id: string): Promise<boolean> {
    console.log('BaseService.removeFile', id);
    return false;
  }

  async saveHistory(history: HistorySchema): Promise<boolean> {
    console.log('BaseService.saveHistory', history);
    return false;
  }

  async removeHistory(id: string): Promise<boolean> {
    console.log('BaseService.removeHistory', id);
    return false;
  }

  async getHistory(id: string): Promise<HistorySchema> {
    console.log('BaseService.getHistory', id);
    return {} as HistorySchema;
  }

  async getHistoryItem(fId: string, id: string): Promise<HistoryItem> {
    console.log('BaseService.getHistoryItem', fId, id);
    return {} as HistoryItem;
  }

  async saveHistoryItem(fId: string, item: HistoryItem): Promise<boolean> {
    console.log('BaseService.saveHistoryItem', fId, item);
    return false;
  }

  async removeHistoryItem(fId: string, ids: string[]): Promise<boolean> {
    console.log('BaseService.removeHistoryItem', fId, ids);
    return false;
  }

  async publish(project: ProjectSchema): Promise<boolean> {
    return !!(await this.api('publish', project).catch(() => false));
  }

  async publishFile(
    project: ProjectSchema,
    file: PageFile | BlockFile
  ): Promise<boolean> {
    return !!(await this.api('publishFile', { project, file }).catch(
      () => false
    ));
  }

  async genVueContent(
    project: ProjectSchema,
    dsl: BlockSchema
  ): Promise<string> {
    return await this.api('genVueContent', { project, dsl }).catch(() => '');
  }

  async createRawPage(file: PageFile): Promise<boolean> {
    return await this.api('createRawPage', file).catch(() => '');
  }

  async removeRawPage(id: string): Promise<boolean> {
    return await this.api('removeRawPage', id).catch(() => '');
  }

  async uploadStaticFile(
    file: File,
    projectId: string
  ): Promise<StaticFileInfo | null> {
    return await this.uploader(file, projectId).catch(() => null);
  }
  async getStaticFiles(projectId: string): Promise<StaticFileInfo[]> {
    const res = await this.api('getStaticFiles', projectId).catch(() => []);
    return res as StaticFileInfo[];
  }
  async removeStaticFile(name: string, projectId: string): Promise<boolean> {
    return await this.api('removeStaticFile', { name, projectId }).catch(
      () => ''
    );
  }
  async clearStaticFiles(projectId: string): Promise<boolean> {
    return await this.api('clearStaticFiles', projectId).catch(() => '');
  }

  async getPluginMaterial(
    from: NodeFromPlugin
  ): Promise<MaterialDescription | null> {
    const { urls = [] } = from;
    const url = urls.filter((n) => isJSON(n))[0];
    if (!url) return null;
    const cache = this.pluginCaches[url];
    if (cache) return cache;
    return (this.pluginCaches[url] = request
      .send({
        url,
        method: 'get',
        settings: {
          validSuccess: false,
          originResponse: true
        }
      })
      .then((res) => res.data as MaterialDescription)
      .catch(() => null));
  }

  public async genSource(project: ProjectSchema): Promise<string> {
    console.log('BaseService.genSource', project);
    return '';
  }
}
