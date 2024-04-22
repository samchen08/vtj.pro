import {
  StorageService,
  type ProjectSchema,
  type PageFile,
  type BlockFile,
  type BlockSchema,
  type StaticFileInfo,
  type NodeFromPlugin,
  type MaterialDescription
} from '@vtj/pro';
import { ElNotification } from 'element-plus';

export class LcdpService extends StorageService {
  publish(_project: ProjectSchema): Promise<boolean> {
    ElNotification.warning({
      title: '提示',
      message: '在线演示版本不支持发布功能，如需体验请下载本地版本。'
    });
    return Promise.resolve(false);
  }
  publishFile(
    _project: ProjectSchema,
    _file: PageFile | BlockFile
  ): Promise<boolean> {
    ElNotification.warning({
      title: '提示',
      message: '在线演示版本不支持发布功能，如需体验请下载本地版本。'
    });
    return Promise.resolve(false);
  }
  genVueContent(_project: ProjectSchema, _dsl: BlockSchema): Promise<string> {
    ElNotification.warning({
      title: '提示',
      message: '在线演示版本不支持源码生成功能，如需体验请下载本地版本。'
    });

    return Promise.resolve('');
  }
  async createRawPage(_file: PageFile): Promise<boolean> {
    ElNotification.warning({
      title: '提示',
      message: '在线演示版本不支持源码模式页面，如需体验请下载本地版本。'
    });
    return Promise.resolve(false);
  }

  async removeRawPage(_id: string): Promise<boolean> {
    ElNotification.warning({
      title: '提示',
      message: '在线演示版本不支持源码模式页面，如需体验请下载本地版本。'
    });
    return Promise.resolve(false);
  }

  async uploadStaticFile(
    _file: File,
    _rojectId: string
  ): Promise<StaticFileInfo | null> {
    ElNotification.warning({
      title: '提示',
      message: '在线演示版本不支持文件上传，如需体验请下载本地版本。'
    });
    return Promise.resolve(null);
  }

  async getStaticFiles(_projectId: string): Promise<StaticFileInfo[]> {
    ElNotification.warning({
      title: '提示',
      message: '在线演示版本不支持文件上传，如需体验请下载本地版本。'
    });
    return Promise.resolve([]);
  }

  async getPluginMaterial(
    _from: NodeFromPlugin
  ): Promise<MaterialDescription | null> {
    ElNotification.warning({
      title: '提示',
      message: '在线演示版本不支持引用和插件，如需体验请下载本地版本。'
    });
    return Promise.resolve(null);
  }
}
