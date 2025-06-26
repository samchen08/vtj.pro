import type {
  ProjectSchema,
  BlockSchema,
  HistorySchema,
  HistoryItem,
  PageFile,
  BlockFile,
  NodeFromPlugin
} from './schemas';
import type { MaterialDescription } from './assets';
import type { StaticFileInfo, VTJConfig, ParseVueOptions } from './shared';

export abstract class Service {
  /**
   * 获取低代码设计器配置
   */
  public abstract getExtension(): Promise<VTJConfig | undefined>;

  /**
   * 获取完整的项目信息
   * @param project
   */
  public abstract init(project: Partial<ProjectSchema>): Promise<ProjectSchema>;

  /**
   * 保存项目信息
   * @param project
   * @param type
   */
  public abstract saveProject(
    project: ProjectSchema,
    type?: string
  ): Promise<boolean>;

  /**
   * 保存项目的物料信息
   * @param project
   * @param materials
   */
  public abstract saveMaterials(
    project: ProjectSchema,
    materials: Map<string, MaterialDescription>
  ): Promise<boolean>;

  /**
   * 保存页面文件
   * @param file
   * @param project
   */
  public abstract saveFile(
    file: BlockSchema,
    project?: ProjectSchema
  ): Promise<boolean>;

  /**
   * 获取页面文件
   * @param id
   * @param project
   */
  public abstract getFile(
    id: string,
    project?: ProjectSchema
  ): Promise<BlockSchema>;

  /**
   * 删除文件
   * @param id
   * @param project
   */
  public abstract removeFile(
    id: string,
    project?: ProjectSchema
  ): Promise<boolean>;

  /**
   * 保存历史记录
   * @param history
   * @param project
   */
  public abstract saveHistory(
    history: HistorySchema,
    project?: ProjectSchema
  ): Promise<boolean>;

  /**
   * 删除历史记录
   * @param id
   * @param project
   */
  public abstract removeHistory(
    id: string,
    project?: ProjectSchema
  ): Promise<boolean>;

  /**
   * 获取历史记录
   * @param id
   * @param project
   */
  public abstract getHistory(
    id: string,
    project?: ProjectSchema
  ): Promise<HistorySchema>;

  /**
   * 获取历史记录项
   * @param fId
   * @param id
   * @param project
   */
  public abstract getHistoryItem(
    fId: string,
    id: string,
    project?: ProjectSchema
  ): Promise<HistoryItem>;

  /**
   * 保存历史记录项
   * @param fId
   * @param id
   * @param project
   */
  public abstract saveHistoryItem(
    fId: string,
    item: HistoryItem,
    project?: ProjectSchema
  ): Promise<boolean>;

  /**
   * 删除历史记录项
   * @param fId
   * @param id
   * @param project
   */
  public abstract removeHistoryItem(
    fId: string,
    ids: string[],
    project?: ProjectSchema
  ): Promise<boolean>;

  /**
   * 发布项目，整站出码
   * @param project
   */
  public abstract publish(project: ProjectSchema): Promise<boolean>;

  /**
   * 发布页面，单个页面出码
   * @param project
   */
  public abstract publishFile(
    project: ProjectSchema,
    file: PageFile | BlockFile
  ): Promise<boolean>;

  /**
   * 文件DSL转Vue源码
   * @param project
   * @param dsl
   */
  public abstract genVueContent(
    project: ProjectSchema,
    dsl: BlockSchema
  ): Promise<string>;

  /**
   * Vue源码转DSL
   * @param project
   * @param options
   */
  public abstract parseVue(
    project: ProjectSchema,
    options: ParseVueOptions
  ): Promise<BlockSchema>;

  /**
   * 创建源码模式的文件
   * @param file
   * @param project
   */
  public abstract createRawPage(
    file: PageFile,
    project?: ProjectSchema
  ): Promise<boolean>;

  /**
   * 删除源码模式的文件
   * @param file
   * @param project
   */
  public abstract removeRawPage(
    id: string,
    project?: ProjectSchema
  ): Promise<boolean>;

  /**
   * 上传静态文件
   * @param file
   * @param project
   */
  public abstract uploadStaticFile(
    file: File,
    projectId: string
  ): Promise<StaticFileInfo | null>;
  public abstract getStaticFiles(projectId: string): Promise<StaticFileInfo[]>;

  /**
   * 删除静态文件
   * @param file
   * @param project
   */
  public abstract removeStaticFile(
    name: string,
    projectId: string
  ): Promise<boolean>;

  /**
   * 删除全部静态文件
   * @param file
   * @param project
   */
  public abstract clearStaticFiles(projectId: string): Promise<boolean>;

  /**
   * 获取插件的物料
   * @param file
   * @param project
   */
  public abstract getPluginMaterial(
    from: NodeFromPlugin
  ): Promise<MaterialDescription | null>;

  /**
   * 弃用，无作用
   * @deprecated
   * @param project
   */
  public abstract genSource(project: ProjectSchema): Promise<string>;
}
