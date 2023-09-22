import { uid, getPages } from '../utils';
import {
  ProjectSchema,
  Dependencie,
  SummarySchema,
  PageSchema,
  BlockSchema,
  EVENT_PROJECT_UPDATE,
  EVENT_FILE_CREATE,
  EVENT_FILE_UPDATE,
  EVENT_FILE_REMOVE,
  EVENT_PROJECT_ACTIVE_FILE,
  emitter,
  FileType,
  ApiSchema
} from '../core';
import { Block } from '../models';
import { version } from '../constants';

import { toRaw, ref, Ref, unref } from 'vue';

export class Project {
  private readonly __VTJ_PROJECT__: boolean = true;
  public id: string = '';
  public name: string = '';
  public description: string = '';
  public homepageId: string = '';
  public dependencies: Ref<Dependencie[]> = ref([]);
  public pages: Ref<PageSchema[]> = ref([]);
  public blocks: Ref<SummarySchema[]> = ref([]);
  public apis: Ref<ApiSchema[]> = ref([]);
  public current: Ref<Block | null> = ref(null);
  constructor(schema?: ProjectSchema, public source: Dependencie[] = []) {
    this.load(schema);
  }
  load(schema?: ProjectSchema) {
    const {
      id,
      description = '',
      name = '',
      homepageId = '',
      dependencies = [],
      pages = [],
      blocks = [],
      apis = []
    } = schema || {};
    this.id = id || uid();
    this.description = description;
    this.name = name;
    this.homepageId = homepageId;
    this.dependencies.value = this.mergeDeps(dependencies, this.source);
    this.pages.value = pages;
    this.blocks.value = blocks;
    this.apis.value = apis;
  }
  update(schema: Partial<ProjectSchema>) {
    const dsl = this.toDsl();
    Object.assign(dsl, schema);
    this.load(dsl);
    emitter.emit(EVENT_PROJECT_UPDATE, dsl);
  }

  activeFile(schema: BlockSchema | null) {
    this.current.value = schema ? new Block(schema) : null;
    emitter.emit(EVENT_PROJECT_ACTIVE_FILE, this.current.value);
  }
  mergeDeps(target: Dependencie[], source: Dependencie[]) {
    const official = target.filter((n) => !!n.official);
    const custom = target.filter((n) => !n.official);

    const mergeOfficial = source.map((item) => {
      const match = official.find((n) => n.package === item.package);
      return Object.assign(item, match || {});
    });

    return mergeOfficial.concat(custom);
  }

  setDeps(item: Dependencie) {
    const deps = this.dependencies.value;
    const index = deps.findIndex((n) => n.package === item.package);
    if (index > -1) {
      deps.splice(index, 1, {
        ...deps[index],
        ...item
      });
    } else {
      deps.push(toRaw(item));
    }
    emitter.emit(EVENT_PROJECT_UPDATE, this.toDsl());
  }

  removeDeps(item: Dependencie) {
    const deps = this.dependencies.value;
    const index = deps.findIndex((n) => n.package === item.package);
    if (index > -1) {
      deps.splice(index, 1);
      emitter.emit(EVENT_PROJECT_UPDATE, this.toDsl());
    }
  }

  toDsl(): ProjectSchema {
    const {
      id,
      description,
      name,
      homepageId,
      dependencies,
      pages,
      blocks,
      apis,
      __VTJ_PROJECT__
    } = this;
    return {
      __VTJ_PROJECT__,
      __VTJ_VERSION__: version,
      __VTJ_DATE__: Date.now().toString(),
      id,
      description,
      name,
      homepageId,
      dependencies: unref(dependencies),
      pages: unref(pages),
      blocks: unref(blocks),
      apis: unref(apis)
    };
  }

  findPage(id: string) {
    const finder = (
      id: string,
      pages: PageSchema[] = []
    ): PageSchema | undefined => {
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
    return finder(id, this.pages.value);
  }

  getPages() {
    return getPages(this.pages.value);
  }

  getHomePage() {
    const pages = this.getPages();
    return pages.find((n) => !!n.home);
  }

  clearHomePage() {
    const pages = this.getPages();
    pages.forEach((page) => {
      page.home = false;
    });
  }

  addPage(page: PageSchema, parentId?: string) {
    const { name, title, isDir, home } = page;
    const file = new Block({ name, title });
    const dsl = file.toDsl();
    page.id = dsl.id;

    if (home) {
      this.clearHomePage();
      page.home = true;
    }

    if (isDir) {
      page.children = [];
    }
    if (parentId) {
      const dir = this.findPage(parentId);
      if (dir) {
        if (dir.children) {
          dir.children.push(page);
        } else {
          dir.children = [page];
        }
      }
    } else {
      this.pages.value.push(page);
    }
    // 目录不需要创建文件
    if (!isDir) {
      emitter.emit(EVENT_FILE_CREATE, dsl);
    }
    emitter.emit(EVENT_PROJECT_UPDATE, this.toDsl());
    return file;
  }

  updatePage(page: PageSchema, block?: BlockSchema) {
    if (page.id) {
      const match = this.findPage(page.id);
      if (match) {
        Object.assign(match, page);
        if (match.home) {
          this.clearHomePage();
          match.home = true;
        }
        if (block) {
          block.name = match.name;
          block.title = match.title;
          emitter.emit(EVENT_FILE_UPDATE, block);
        }
        emitter.emit(EVENT_PROJECT_UPDATE, this.toDsl());
      }
    }
  }

  copyPage(page: PageSchema, block: BlockSchema, parentId?: string) {
    const id = uid();
    const newPage = {
      ...page,
      id
    };
    const newBlock = {
      ...block,
      id
    };
    const pages = parentId
      ? this.findPage(parentId)?.children || []
      : this.pages.value;
    const index = pages.findIndex((n) => n.id === page.id);
    pages.splice(index, 0, newPage);
    emitter.emit(EVENT_FILE_CREATE, newBlock);
    emitter.emit(EVENT_PROJECT_UPDATE, this.toDsl());
  }

  removePage(id: string) {
    const remover = (id: string, pages: PageSchema[]): void => {
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
    remover(id, this.pages.value);
    if (this.current.value?.id === id) {
      this.current.value = null;
    }
    emitter.emit(EVENT_FILE_REMOVE, id);
    emitter.emit(EVENT_PROJECT_UPDATE, this.toDsl());
  }

  addBlock(schema: BlockSchema) {
    const file = new Block(schema);
    const dsl = file.toDsl();

    const { id, name, title } = dsl;
    const summary: SummarySchema = {
      id,
      name,
      title
    };
    this.blocks.value.push(summary);
    emitter.emit(EVENT_FILE_CREATE, dsl);
    emitter.emit(EVENT_PROJECT_UPDATE, this.toDsl());
    return file;
  }

  updateBlock(summary: SummarySchema, schema: BlockSchema) {
    const { id } = summary;
    Object.assign(schema, summary);
    const files = this.blocks.value;
    const index = files.findIndex((n) => n.id === id);
    if (index > -1) {
      files.splice(index, 1, summary);
      emitter.emit(EVENT_FILE_UPDATE, schema);
      emitter.emit(EVENT_PROJECT_UPDATE, this.toDsl());
    }
  }

  removeBlock(id: string) {
    const files = this.blocks.value;
    const index = files.findIndex((n) => n.id === id);
    if (index > -1) {
      if (this.current.value?.id === id) {
        this.activeFile(null);
      }
      files.splice(index, 1);
      emitter.emit(EVENT_FILE_REMOVE, id);
      emitter.emit(EVENT_PROJECT_UPDATE, this.toDsl());
    }
  }

  findBlock(id: string) {
    return this.blocks.value.find((n) => n.id === id);
  }

  existBlockName(summary: SummarySchema) {
    return this.blocks.value.some(
      (n) => n.name === summary.name && n.id !== summary.id
    );
  }

  getFile(id: string): PageSchema | SummarySchema | undefined {
    const block = this.findBlock(id);
    if (block) return block;
    return this.findPage(id);
  }

  isPage(schema: unknown): schema is PageSchema {
    return typeof (schema as PageSchema)?.isDir === 'boolean';
  }

  setApi(item: ApiSchema) {
    const apis = this.apis.value;
    const index = apis.findIndex((n) => n.name === item.name);
    if (index > -1) {
      apis.splice(index, 1, item);
    } else {
      apis.push(item);
    }
    emitter.emit(EVENT_PROJECT_UPDATE, this.toDsl());
  }
  removeApi(name: string) {
    const apis = this.apis.value;
    const index = apis.findIndex((n) => n.name === name);
    if (index > -1) {
      apis.splice(index, 1);
      emitter.emit(EVENT_PROJECT_UPDATE, this.toDsl());
    }
  }
}
