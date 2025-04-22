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
  public abstract getExtension(): Promise<VTJConfig | undefined>;
  public abstract init(project: Partial<ProjectSchema>): Promise<ProjectSchema>;
  public abstract saveProject(
    project: ProjectSchema,
    type?: string
  ): Promise<boolean>;
  public abstract saveMaterials(
    project: ProjectSchema,
    materials: Map<string, MaterialDescription>
  ): Promise<boolean>;
  public abstract saveFile(
    file: BlockSchema,
    project?: ProjectSchema
  ): Promise<boolean>;
  public abstract getFile(
    id: string,
    project?: ProjectSchema
  ): Promise<BlockSchema>;
  public abstract removeFile(
    id: string,
    project?: ProjectSchema
  ): Promise<boolean>;
  public abstract saveHistory(
    history: HistorySchema,
    project?: ProjectSchema
  ): Promise<boolean>;
  public abstract removeHistory(
    id: string,
    project?: ProjectSchema
  ): Promise<boolean>;
  public abstract getHistory(
    id: string,
    project?: ProjectSchema
  ): Promise<HistorySchema>;
  public abstract getHistoryItem(
    fId: string,
    id: string,
    project?: ProjectSchema
  ): Promise<HistoryItem>;
  public abstract saveHistoryItem(
    fId: string,
    item: HistoryItem,
    project?: ProjectSchema
  ): Promise<boolean>;
  public abstract removeHistoryItem(
    fId: string,
    ids: string[],
    project?: ProjectSchema
  ): Promise<boolean>;
  public abstract publish(project: ProjectSchema): Promise<boolean>;
  public abstract publishFile(
    project: ProjectSchema,
    file: PageFile | BlockFile
  ): Promise<boolean>;

  public abstract genVueContent(
    project: ProjectSchema,
    dsl: BlockSchema
  ): Promise<string>;

  public abstract parseVue(
    project: ProjectSchema,
    options: ParseVueOptions
  ): Promise<BlockSchema>;

  public abstract createRawPage(
    file: PageFile,
    project?: ProjectSchema
  ): Promise<boolean>;
  public abstract removeRawPage(
    id: string,
    project?: ProjectSchema
  ): Promise<boolean>;

  public abstract uploadStaticFile(
    file: File,
    projectId: string
  ): Promise<StaticFileInfo | null>;
  public abstract getStaticFiles(projectId: string): Promise<StaticFileInfo[]>;
  public abstract removeStaticFile(
    name: string,
    projectId: string
  ): Promise<boolean>;
  public abstract clearStaticFiles(projectId: string): Promise<boolean>;

  public abstract getPluginMaterial(
    from: NodeFromPlugin
  ): Promise<MaterialDescription | null>;

  public abstract genSource(project: ProjectSchema): Promise<string>;
}
