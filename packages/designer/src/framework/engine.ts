import {
  createApp,
  onUnmounted,
  unref,
  inject,
  shallowReactive,
  ref,
  nextTick,
  triggerRef,
  type ShallowReactive,
  type InjectionKey,
  type MaybeRef,
  type App,
  type Ref
} from 'vue';
import {
  Base,
  ProjectModel,
  BlockModel,
  HistoryModel,
  emitter,
  EVENT_BLOCK_CHANGE,
  EVENT_NODE_CHANGE,
  EVENT_PROJECT_BLOCKS_CHANGE,
  EVENT_PROJECT_PAGES_CHANGE,
  EVENT_PROJECT_DEPS_CHANGE,
  EVENT_PROJECT_CHANGE,
  EVENT_PROJECT_ACTIVED,
  EVENT_PROJECT_PUBLISH,
  EVENT_PROJECT_FILE_PUBLISH,
  EVENT_HISTORY_CHANGE,
  EVENT_HISTORY_LOAD,
  EVENT_PROJECT_GEN_SOURCE,
  type Service,
  type Emitter,
  type ProjectSchema,
  type BlockFile,
  type ProjectModelEvent,
  type PageFile,
  type HistoryItem,
  type HistoryModelEvent
} from '@vtj/core';
import {
  type Context,
  ContextMode,
  Provider,
  Access,
  type ProvideAdapter
} from '@vtj/renderer';
import { logger } from '@vtj/utils';

import { SkeletonWrapper, type SkeletonWrapperInstance } from '../wrappers';
import { depsManager, widgetManager } from '../managers';
import { Simulator } from './simulator';
import { Assets } from './assets';
import { message } from '../utils';

export const engineKey: InjectionKey<ShallowReactive<Engine>> =
  Symbol('VtjEngine');

export interface EngineOptions {
  container: MaybeRef<HTMLElement | undefined>;
  service: Service;
  project?: Partial<ProjectSchema>;
  dependencies?: Record<string, () => Promise<any>>;
  materials?: Record<string, () => Promise<any>>;
  materialPath?: string;
  globals?: Record<string, any>;
  adapter?: Partial<ProvideAdapter>;
  install?: (app: App, engine?: Engine) => void;
  pageBasePath?: string;
  pageRouteName?: string;
  /**
   * 这个是引擎自己的Access，不是业务应用，应用的在 adapter 中设置
   */
  access?: Access;
  /**
   * 远程服务host
   */
  remote?: string;
}

export const SAVE_BLOCK_FILE_FINISH = 'SAVE_BLOCK_FILE_FINISH';

export class Engine extends Base {
  public app?: App;
  public skeleton?: SkeletonWrapperInstance | null;
  public container: MaybeRef<HTMLElement | undefined>;
  public service: Service;
  public assets: Assets;
  public simulator: Simulator;
  public emitter: Emitter = emitter;
  public project: Ref<ProjectModel | null> = ref(null);
  public current: Ref<BlockModel | null> = ref(null);
  public context: Ref<Context | null> = ref(null);
  public isEmptyCurrent: Ref<boolean> = ref(false);
  public history: Ref<HistoryModel | null> = ref(null);
  public provider: Provider;
  public adapter?: Partial<ProvideAdapter>;
  /**
   * 当current变化时，更新该值，用于通知组件更新
   */
  public changed: Ref<symbol> = ref(Symbol());
  public access?: Access;
  public remote;
  constructor(public options: EngineOptions) {
    super();
    const {
      container,
      service,
      project = {},
      globals = {},
      dependencies,
      materials,
      materialPath = './',
      pageRouteName,
      adapter,
      install,
      access,
      remote = 'https://lcdp.vtj.pro'
    } = this.options;
    this.container = container;
    this.service = service;
    this.adapter = adapter;
    this.provider = new Provider({
      mode: ContextMode.Design,
      globals,
      project,
      service,
      dependencies,
      materials,
      materialPath,
      adapter,
      pageRouteName,
      install
    });
    this.assets = new Assets(this.service, this.provider);
    this.simulator = new Simulator({
      engine: this,
      materialPath
    });
    if (access) {
      this.access = access;
    }
    this.remote = remote;

    this.bindEvents();
    this.init(project as ProjectSchema).then(this.render.bind(this));
    onUnmounted(this.dispose.bind(this));
  }
  private async init(project: ProjectSchema) {
    const dsl = await this.service.init(project).catch((e) => {
      logger.warn('VTJEngine service init fail.', e);
      return null;
    });
    if (dsl) {
      const platform = dsl.platform || 'web';
      if (platform === 'uniapp') {
        widgetManager.set('UniConfig', {
          invisible: false
        });
      }
      dsl.dependencies = depsManager.merge(dsl.dependencies || [], platform);
      this.project.value = new ProjectModel(dsl);
      this.saveMaterials();
      this.triggerReady();
    }
  }
  private render() {
    const container = unref(this.container);
    if (container) {
      const app = createApp(SkeletonWrapper);
      if (this.options.install) {
        app.use(this.options.install, this);
      }
      app.provide(engineKey, shallowReactive(this));
      app.mount(container);
      this.app = app;
    } else {
      logger.warn('VTJEngine constructor param [ container ] is undefined');
    }
  }

  private bindEvents() {
    emitter.on(EVENT_PROJECT_CHANGE, (e) => this.saveProject(e));
    emitter.on(EVENT_PROJECT_BLOCKS_CHANGE, (e) => this.saveBlockFile(e));
    emitter.on(EVENT_PROJECT_PAGES_CHANGE, (e) => this.saveBlockFile(e));
    emitter.on(EVENT_PROJECT_DEPS_CHANGE, () => this.saveMaterials());
    emitter.on(EVENT_PROJECT_ACTIVED, (e) => this.activeFile(e));
    emitter.on(EVENT_PROJECT_PUBLISH, () => this.publish());
    emitter.on(EVENT_PROJECT_FILE_PUBLISH, () => this.publishCurrent());
    emitter.on(EVENT_BLOCK_CHANGE, (e) => this.changeFile(e));
    emitter.on(EVENT_NODE_CHANGE, () => this.changeCurrentFile());
    emitter.on(EVENT_HISTORY_CHANGE, (e) => this.saveHistory(e));
    emitter.on(EVENT_HISTORY_LOAD, (e) => this.loadHistory(e));
    emitter.on(EVENT_PROJECT_GEN_SOURCE, () => this.genSource());
  }

  private async activeFile(e: ProjectModelEvent) {
    await nextTick();
    const project = e.model;
    const file = e.model.currentFile;
    if (file) {
      if (project.isPageFile(file) && !!file.raw) {
        return;
      }
      const dsl = await this.service.getFile(file.id, project.toDsl());
      if (dsl) {
        file.dsl = dsl;
      }
    }

    if (file?.dsl) {
      const block = new BlockModel(file.dsl);
      this.updateCurrent(block);
      this.initHistory(block);
    } else {
      this.updateCurrent(null);
    }
    triggerRef(this.project);
  }

  private async changeFile(e: BlockModel) {
    await nextTick();
    const dsl = e.toDsl();
    this.service.saveFile(dsl, this.project.value?.toDsl());
    this.updateCurrent(e);
    this.history.value?.add(dsl);
    triggerRef(this.history);
  }

  private changeCurrentFile() {
    this.saveCurrentFile();
    if (this.current.value) {
      this.history.value?.add(this.current.value.toDsl());
      triggerRef(this.history);
    }
  }

  private async updateCurrent(
    block: BlockModel | null,
    isTrigger: boolean = true
  ) {
    this.current.value = block;
    await nextTick();
    this.context.value = this.simulator.renderer?.context || null;
    this.isEmptyCurrent.value = this.current.value?.nodes.length === 0;
    this.changed.value = Symbol();
    if (isTrigger) {
      triggerRef(this.context);
    }
  }

  private async saveProject(e: ProjectModelEvent) {
    const project = e.model;
    const dsl = project.toDsl();
    await this.service.saveProject(dsl, e.type);
    triggerRef(this.project);
  }

  private async saveBlockFile(e: ProjectModelEvent) {
    const type = e.type;
    const project = e.model;
    const projectDsl = project.toDsl();
    if (type === 'create') {
      const file = e.data as BlockFile | PageFile;
      if (project.isPageFile(file) && !!file.raw) {
        await this.service.createRawPage(file, projectDsl);
        message(`源码文件已经生成：/.vtj/vue/${file.id}.vue`, 'success');
      } else {
        file.dsl && (await this.service.saveFile(file.dsl, projectDsl));
      }
    }

    if (type === 'update') {
      const file = e.data as BlockFile | PageFile;
      if (project.isPageFile(file) && (file.dir || file.raw)) {
        return;
      }
      const dsl = await this.service.getFile(file.id, projectDsl);
      if (dsl) {
        dsl.name = file.name;
        Object.assign(dsl, file.dsl || {});
        await this.service.saveFile(dsl, projectDsl);
      }
    }

    if (type === 'delete') {
      const file = e.data as BlockFile | PageFile;
      if (file && project.isPageFile(file) && !!file.raw) {
        await this.service.removeRawPage(file.id, projectDsl);
      } else {
        if (!(file as PageFile).dir) {
          await this.service.removeFile(file.id, projectDsl);
          await this.service.removeRawPage(file.id, projectDsl);
          await this.service.removeHistory(file.id, projectDsl);
        }
      }
    }

    if (type === 'clone') {
      const { source, target } = e.data;
      const dsl = await this.service.getFile(source.id, projectDsl);
      if (dsl) {
        dsl.id = target.id;
        dsl.name = target.name;
        await this.service.saveFile(dsl, projectDsl);
      }
    }
    triggerRef(this.project);
    this.emitter.emit(SAVE_BLOCK_FILE_FINISH, e);
  }

  onSaveBlockFileFinish(callback: (e: ProjectModelEvent) => void) {
    const _callback = (e: any) => {
      callback(e);
      this.emitter.off(SAVE_BLOCK_FILE_FINISH, _callback);
    };
    this.emitter.on(SAVE_BLOCK_FILE_FINISH, _callback);
  }

  private async saveMaterials() {
    await nextTick();
    this.simulator.ready(() => {
      const project = this.project.value;
      if (project) {
        // this.assets.load([]);
        const map = this.assets.componentMap;
        this.service.saveMaterials(project.toDsl(), map);
      }
    });
  }

  private saveCurrentFile() {
    const current = this.current.value;
    if (current) {
      this.updateCurrent(current);
      this.service.saveFile(current.toDsl(), this.project.value?.toDsl());
    }
  }

  private async initHistory(block: BlockModel | null) {
    if (block) {
      const dsl = await this.service
        .getHistory(block.id, this.project.value?.toDsl())
        .catch(() => null);
      this.history.value = new HistoryModel(
        Object.assign(dsl || {}, { id: block.id })
      );
    } else {
      this.history.value = null;
    }
  }

  private async saveHistory(e: HistoryModelEvent) {
    const type = e.type;
    const history = e.model;
    const projectDsl = this.project.value?.toDsl();
    if (type === 'create') {
      await this.service.saveHistoryItem(
        history.id as string,
        e.data,
        projectDsl
      );
    }
    if (type === 'delete') {
      await this.service.removeHistoryItem(
        history.id as string,
        e.data as string[],
        projectDsl
      );
    }

    if (type === 'clear') {
      await this.service.removeHistoryItem(
        history.id as string,
        e.data,
        projectDsl
      );
    }

    const dsl = history.toDsl();
    await this.service.saveHistory(dsl, projectDsl);
    triggerRef(this.history);
  }

  private async loadHistory(e: HistoryModelEvent) {
    const history = e.model;
    const data = e.data as HistoryItem;
    const projectDsl = this.project.value?.toDsl();
    const item = await this.service.getHistoryItem(
      history.id,
      data.id,
      projectDsl
    );
    if (item && item.dsl) {
      const block = new BlockModel(item.dsl);
      await this.updateCurrent(block);
      this.service.saveFile(item.dsl, projectDsl);
      triggerRef(this.history);
    }
  }

  private async publish() {
    const project = this.project.value;
    if (project) {
      const dsl = {
        ...project.toDsl(),
        pages: project.getPages()
      };
      const ret = await this.service.publish(dsl);
      if (ret) {
        message('整站发布成功', 'success');
      }
    }
  }

  public async genSource() {
    const project = this.project.value;
    if (project) {
      const dsl = {
        ...project.toDsl(),
        pages: project.getPages()
      };
      return dsl ? await this.service.genSource(dsl) : undefined;
    }
  }

  private async publishCurrent() {
    const project = this.project.value;
    const current = project?.currentFile;
    if (project && current) {
      const dsl = {
        ...project.toDsl(),
        pages: project.getPages()
      };
      const ret = await this.service.publishFile(dsl, current);
      if (ret) {
        message('发布成功', 'success');
      }
    }
  }

  dispose() {
    this.emitter.all.clear();
    this.simulator.dispose();
    if (this.app) {
      this.app.unmount();
      this.container = undefined;
    }
  }

  async openFile(fileId?: string) {
    const project = this.project.value;
    const apps = this.skeleton?.getRegion('Apps');
    const id = fileId || project?.homepage;
    if (!project || !apps || !id) return;

    const page = project.getPage(id);
    if (page && !page.raw) {
      apps.regionRef?.setActive('Pages');
      this.simulator.ready(() => {
        project.active(page);
      });
    }

    const block = project.getBlock(id);
    if (block) {
      apps.regionRef?.setActive('Blocks');
      this.simulator?.ready(() => {
        project.active(block);
      });
    }
  }
}

export function useEngine() {
  const engine = inject(engineKey, null);
  if (!engine) {
    logger.error('VTJEngine is not exist');
  }
  return engine as ShallowReactive<Engine>;
}
