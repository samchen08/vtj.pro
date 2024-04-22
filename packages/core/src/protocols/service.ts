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
import type { StaticFileInfo } from './shared';

export abstract class Service {
  public abstract init(project: ProjectSchema): Promise<ProjectSchema>;
  public abstract saveProject(project: ProjectSchema): Promise<boolean>;
  public abstract saveMaterials(
    project: ProjectSchema,
    materials: Map<string, MaterialDescription>
  ): Promise<boolean>;
  public abstract saveFile(file: BlockSchema): Promise<boolean>;
  public abstract getFile(id: string): Promise<BlockSchema>;
  public abstract removeFile(id: string): Promise<boolean>;
  public abstract saveHistory(history: HistorySchema): Promise<boolean>;
  public abstract removeHistory(id: string): Promise<boolean>;
  public abstract getHistory(id: string): Promise<HistorySchema>;
  public abstract getHistoryItem(fId: string, id: string): Promise<HistoryItem>;
  public abstract saveHistoryItem(
    fId: string,
    item: HistoryItem
  ): Promise<boolean>;
  public abstract removeHistoryItem(
    fId: string,
    ids: string[]
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

  public abstract createRawPage(file: PageFile): Promise<boolean>;
  public abstract removeRawPage(id: string): Promise<boolean>;

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
}
