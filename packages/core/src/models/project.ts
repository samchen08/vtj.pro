import { uid, timestamp, merge, upperFirstCamelCase, delay } from '@vtj/base';
import type {
  ProjectSchema,
  Dependencie,
  PageFile,
  BlockFile,
  ApiSchema,
  ProjectConfig
} from '../protocols';
import { emitter, type ModelEventType } from '../tools';
import { BlockModel } from './block';

export interface ProjectModelEvent {
  model: ProjectModel;
  type: ModelEventType;
  data: any;
}

/**
 * 项目信息更新时触发事件
 */
export const EVENT_PROJECT_CHANGE = 'EVENT_PROJECT_CHANGE';
/**
 * 打开/关闭文件时触发事件
 */
export const EVENT_PROJECT_ACTIVED = 'EVENT_PROJECT_ACTIVED';

/**
 * 依赖更新时触发
 */
export const EVENT_PROJECT_DEPS_CHANGE = 'EVENT_PROJECT_DEPS_CHANGE';

/**
 * 页面文件更新
 */
export const EVENT_PROJECT_PAGES_CHANGE = 'EVENT_PROJECT_PAGES_CHANGE';

/**
 * 区块文件更新
 */
export const EVENT_PROJECT_BLOCKS_CHANGE = 'EVENT_PROJECT_BLOCKS_CHANGE';

/**
 * API更新
 */
export const EVENT_PROJECT_APIS_CHANGE = 'EVENT_PROJECT_APIS_CHANGE';

/**
 * 项目发布
 */
export const EVENT_PROJECT_PUBLISH = 'EVENT_PROJECT_PUBLISH';

/**
 * 项目文件发布
 */
export const EVENT_PROJECT_FILE_PUBLISH = 'EVENT_PROJECT_FILE_PUBLISH';

export class ProjectModel {
  id: string = '';
  name: string = '';
  description: string = '';
  homepage: string = '';
  dependencies: Dependencie[] = [];
  pages: PageFile[] = [];
  blocks: BlockFile[] = [];
  apis: ApiSchema[] = [];
  currentFile: PageFile | BlockFile | null = null;
  config: ProjectConfig = {};
  static attrs: string[] = [
    'name',
    'homepage',
    'description',
    'dependencies',
    'pages',
    'blocks',
    'apis',
    'config'
  ];
  constructor(schema: ProjectSchema) {
    const { id } = schema;
    this.id = id || uid();
    this.update(schema, true);
  }

  update(schema: Partial<ProjectSchema>, silent: boolean = false) {
    for (const key of ProjectModel.attrs) {
      const value = schema[key as keyof ProjectSchema];
      if (value) {
        (this as any)[key] = value;
      }
    }
    if (!silent) {
      emitter.emit(EVENT_PROJECT_CHANGE, {
        model: this,
        type: 'update',
        data: schema
      });
    }
  }
  isPageFile(file: PageFile | BlockFile): file is PageFile {
    return file.type === 'page';
  }

  toDsl(version?: string) {
    const { id } = this;
    const attrs = ProjectModel.attrs.reduce(
      (result, current) => {
        result[current] = (this as any)[current];
        return result;
      },
      {} as Record<string, any>
    );
    if (attrs.pages) {
      attrs.pages = attrs.pages.map((n: PageFile) => {
        delete n.dsl;
        return n;
      });
    }
    if (attrs.blocks) {
      attrs.blocks = attrs.blocks.map((n: BlockFile) => {
        delete n.dsl;
        return n;
      });
    }
    return {
      __VTJ_PROJECT__: true,
      __VERSION__: version || timestamp().toString(),
      id,
      ...attrs
    } as ProjectSchema;
  }
  /**
   * 打开文件
   * @param file
   * @param silent
   */
  active(file: BlockFile | PageFile, silent: boolean = false) {
    this.currentFile = file;
    if (!silent) {
      emitter.emit(EVENT_PROJECT_ACTIVED, {
        model: this,
        type: 'update',
        data: file
      });
    }
  }
  /**
   * 关闭文件
   * @param silent
   */
  deactivate(silent: boolean = false) {
    this.currentFile = null;
    if (!silent) {
      emitter.emit(EVENT_PROJECT_ACTIVED, {
        model: this,
        type: 'update',
        data: null
      });
    }
  }

  /**
   * 新增或更新依赖
   * @param item
   * @param silent
   */
  setDeps(item: Dependencie, silent: boolean = false) {
    const deps = this.dependencies;
    const index = deps.findIndex((n) => n.package === item.package);
    let type: ModelEventType;
    if (index > -1) {
      type = 'update';
      deps.splice(index, 1, {
        ...deps[index],
        ...item
      });
    } else {
      type = 'create';
      deps.push(item);
    }
    if (!silent) {
      const event: ProjectModelEvent = {
        model: this,
        type,
        data: item
      };
      emitter.emit(EVENT_PROJECT_DEPS_CHANGE, event);
      emitter.emit(EVENT_PROJECT_CHANGE, event);
    }
  }

  /**
   * 删除依赖
   * @param item
   * @param silent
   */
  removeDeps(item: Dependencie, silent: boolean = false) {
    const deps = this.dependencies;
    const index = deps.findIndex((n) => n.package === item.package);
    if (index > -1) {
      deps.splice(index, 1);
    }
    if (!silent) {
      const event: ProjectModelEvent = {
        model: this,
        type: 'delete',
        data: item
      };
      emitter.emit(EVENT_PROJECT_DEPS_CHANGE, event);
      emitter.emit(EVENT_PROJECT_CHANGE, event);
    }
  }

  /**
   * 根据页面id查找页面或目录
   * @param id
   * @returns
   */
  getPage(id: string) {
    const finder = (
      id: string,
      pages: PageFile[] = []
    ): PageFile | undefined => {
      for (const page of pages) {
        if (page.id === id) {
          return page;
        } else {
          if (page.children && page.children.length) {
            const match = finder(id, page.children);
            if (match) {
              return match;
            }
          }
        }
      }
    };
    return finder(id, this.pages);
  }

  /**
   * 查找全部页面，不含目录
   * @returns
   */
  getPages() {
    const finder = (pages: PageFile[] = []) => {
      let result: PageFile[] = [];
      for (const page of pages) {
        if (page.dir) {
          if (page.children && page.children.length) {
            result = result.concat(finder(page.children));
          }
        } else {
          result.push(page);
        }
      }
      return result;
    };
    return finder(this.pages);
  }

  /**
   * 新建页面
   * @param page
   * @param parentId
   * @param silent
   */
  async createPage(page: PageFile, parentId?: string, silent: boolean = false) {
    // 源码文件用name作为文件名
    page.id = page.raw ? page.name : page.id || uid();
    page.type = 'page';
    if (page.dir) {
      page.children = [];
    } else {
      page.dsl =
        page.dsl ||
        new BlockModel({
          id: page.id,
          name: upperFirstCamelCase(page.name)
        }).toDsl();
    }

    if (parentId) {
      const dir = this.getPage(parentId);
      if (dir) {
        if (dir.children) {
          dir.children.push(page);
        } else {
          dir.children = [page];
        }
      } else {
        console.warn(`not found PageFile for id: ${parentId} `);
      }
    } else {
      this.pages.push(page);
    }

    if (!silent) {
      const event: ProjectModelEvent = {
        model: this,
        type: 'create',
        data: page
      };
      emitter.emit(EVENT_PROJECT_PAGES_CHANGE, event);
      emitter.emit(EVENT_PROJECT_CHANGE, event);
    }

    // 没有打开任何文件时，自动打开新建的页面
    if (!this.currentFile && !page.dir) {
      await delay(2000);
      this.active(page, silent);
    }
  }

  /**
   * 更新页面
   * @param page
   * @param silent
   */
  updatePage(page: PageFile, silent: boolean = false) {
    const match = this.getPage(page.id);
    if (match) {
      Object.assign(match, page);
    } else {
      console.warn(`not found PageFile for id: ${page.id} `);
    }
    if (!silent) {
      const event: ProjectModelEvent = {
        model: this,
        type: 'update',
        data: page
      };
      emitter.emit(EVENT_PROJECT_PAGES_CHANGE, event);
      emitter.emit(EVENT_PROJECT_CHANGE, event);
    }
  }

  /**
   * 复制页面
   * @param page
   * @param parentId
   * @param silent
   */
  clonePage(page: PageFile, parentId?: string, silent: boolean = false) {
    const id = uid();
    const name = `${page.name}Copy`;
    const title = `${page.title}_副本`;

    const dsl = new BlockModel({
      id,
      name
    }).toDsl();
    const newPage = merge({}, page, { id, name, title, dsl });
    const pages = parentId
      ? this.getPage(parentId)?.children || []
      : this.pages;
    const index = pages.findIndex((n) => n.id === page.id);
    pages.splice(index + 1, 0, newPage);

    if (!silent) {
      const event: ProjectModelEvent = {
        model: this,
        type: 'clone',
        data: {
          page,
          newPage
        }
      };
      emitter.emit(EVENT_PROJECT_PAGES_CHANGE, event);
      emitter.emit(EVENT_PROJECT_CHANGE, event);
    }
  }

  /**
   * 删除页面或目录
   * @param id
   * @param silent
   */
  removePage(id: string, silent: boolean = false) {
    const pageFile = this.getPage(id);
    const remover = (id: string, pages: PageFile[]): void => {
      const index = pages.findIndex((n) => n.id === id);
      if (index >= 0) {
        pages.splice(index, 1);
        return;
      }
      for (const page of pages) {
        if (page.children && page.children.length) {
          return remover(id, page.children);
        }
      }
    };
    remover(id, this.pages);
    if (id === this.homepage) {
      this.homepage = '';
    }
    if (this.currentFile?.id === id) {
      this.deactivate(silent);
    }
    if (!silent) {
      const event: ProjectModelEvent = {
        model: this,
        type: 'delete',
        data: pageFile
      };
      emitter.emit(EVENT_PROJECT_PAGES_CHANGE, event);
      emitter.emit(EVENT_PROJECT_CHANGE, event);
    }
  }

  /**
   * 获取区块文件
   * @param id
   * @returns
   */
  getBlock(id: string) {
    return this.blocks.find((n) => n.id === id);
  }

  /**
   * 创建区块
   * @param block
   * @param silent
   */
  async createBlock(block: BlockFile, silent: boolean = false) {
    const id = block.id || uid();
    const name = upperFirstCamelCase(block.name);
    block.id = id;
    block.type = 'block';
    block.dsl = new BlockModel({ id, name }).toDsl();
    this.blocks.push(block);
    const type = block.fromType || 'Schema';

    if (!silent) {
      const event: ProjectModelEvent = {
        model: this,
        type: 'create',
        data: block
      };
      emitter.emit(EVENT_PROJECT_BLOCKS_CHANGE, event);
      emitter.emit(EVENT_PROJECT_CHANGE, event);
    }

    if (!this.currentFile && type === 'Schema') {
      await delay(2000);
      this.active(block, silent);
    }
  }

  /**
   *
   * @param block 更新区块
   * @param silent
   */
  updateBlock(block: BlockFile, silent: boolean = false) {
    const match = this.getBlock(block.id);
    if (match) {
      Object.assign(match, block);
      if (match.dsl) {
        match.dsl.name = block.name;
      }
    } else {
      console.warn(`not found PageFile for id: ${block.id} `);
    }
    if (!silent) {
      const event: ProjectModelEvent = {
        model: this,
        type: 'update',
        data: block
      };
      emitter.emit(EVENT_PROJECT_BLOCKS_CHANGE, event);
      emitter.emit(EVENT_PROJECT_CHANGE, event);
    }
  }

  /**
   * 删除区块
   * @param id
   * @param silent
   */
  removeBlock(id: string, silent: boolean = false) {
    const blockFile = this.getBlock(id);
    const blocks = this.blocks;
    const index = blocks.findIndex((n) => n.id === id);
    if (index > -1) {
      blocks.splice(index, 1);
      if (this.currentFile?.id === id) {
        this.deactivate(silent);
      }
    } else {
      console.warn(`not found PageFile for id: ${id} `);
    }
    if (!silent) {
      const event: ProjectModelEvent = {
        model: this,
        type: 'delete',
        data: blockFile
      };
      emitter.emit(EVENT_PROJECT_BLOCKS_CHANGE, event);
      emitter.emit(EVENT_PROJECT_CHANGE, event);
    }
  }

  /**
   * 检查是否存在名称的区块
   * @param name
   * @param excludes
   * @returns
   */
  existBlockName(name: string, excludes: string[] = []) {
    return this.blocks.some((n) => {
      return n.name === name && !excludes.includes(n.id);
    });
  }

  /**
   * 检测是否存在名称的页面
   * @param name
   * @param excludes
   * @returns
   */
  existPageName(name: string, excludes: string[] = []) {
    const pages = this.getPages();
    return pages.some((n) => n.name === name && !excludes.includes(n.id));
  }

  /**
   * 新增或更新api
   * @param item
   * @param silent
   */
  setApi(item: ApiSchema, silent: boolean = false) {
    const match = this.apis.find(
      (n) => n.name === item.name || n.id === item.id
    );
    let type: ModelEventType;
    if (match) {
      type = 'update';
      Object.assign(match, item);
    } else {
      type = 'create';
      item.id = uid();
      this.apis.push(item);
    }

    if (!silent) {
      const event: ProjectModelEvent = {
        model: this,
        type,
        data: item
      };
      emitter.emit(EVENT_PROJECT_APIS_CHANGE, event);
      emitter.emit(EVENT_PROJECT_CHANGE, event);
    }
  }
  /**
   * 删除api
   * @param name
   * @param silent
   */
  removeApi(name: string, silent: boolean = false) {
    const index = this.apis.findIndex((n) => n.name === name || n.id === name);
    if (index > -1) {
      this.apis.splice(index, 1);
    } else {
      console.warn(`not found Api for name: ${name} `);
    }
    if (!silent) {
      const event: ProjectModelEvent = {
        model: this,
        type: 'delete',
        data: name
      };
      emitter.emit(EVENT_PROJECT_APIS_CHANGE, event);
      emitter.emit(EVENT_PROJECT_CHANGE, event);
    }
  }

  existApiName(name: string, excludes: string[] = []) {
    return this.apis.some((n) => n.name === name && !excludes.includes(n.id));
  }
  setHomepage(id: string, silent: boolean = false) {
    this.homepage = id;
    if (!silent) {
      const event: ProjectModelEvent = {
        model: this,
        type: 'update',
        data: id
      };
      emitter.emit(EVENT_PROJECT_CHANGE, event);
    }
  }

  setConfig(config: ProjectConfig, silent: boolean = false) {
    this.config = Object.assign(this.config, config);
    if (!silent) {
      const event: ProjectModelEvent = {
        model: this,
        type: 'update',
        data: config
      };
      emitter.emit(EVENT_PROJECT_CHANGE, event);
    }
  }

  publish(file?: PageFile | BlockFile) {
    const event: ProjectModelEvent = {
      model: this,
      type: 'publish',
      data: file || this
    };
    if (file) {
      emitter.emit(EVENT_PROJECT_FILE_PUBLISH, event);
    } else {
      emitter.emit(EVENT_PROJECT_PUBLISH, event);
    }
  }
}
