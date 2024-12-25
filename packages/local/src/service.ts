import {
  ProjectModel,
  type ProjectSchema,
  type BlockSchema,
  type HistorySchema,
  type HistoryItem,
  type MaterialDescription,
  type PageFile,
  type BlockFile
} from '@vtj/core';
import { resolve } from 'path';
import { readJsonSync, upperFirstCamelCase, timestamp, merge } from '@vtj/node';
import { generator, createEmptyPage } from '@vtj/coder';
import formidable from 'formidable';
import { fail, success, type ApiRequest } from './shared';
import {
  JsonRepository,
  VueRepository,
  StaticRepository,
  PluginRepository,
  type StaticRepositoryOptions
} from './repository';
import type { DevToolsOptions } from './plugin';

let isInit = false;

export async function notMatch(_req: ApiRequest) {
  return fail('找不到处理程序');
}

export async function saveLogs(e: any) {
  const name = `error-${timestamp()}`;
  const logs = new JsonRepository('logs');
  const json = JSON.parse(JSON.stringify(e));
  return logs.save(name, json);
}

export async function getExtension(_body: any, opts: DevToolsOptions) {
  const root = resolve('./');
  const pkg = readJsonSync(resolve(root, 'package.json'));
  const { vtj = {} } = pkg || {};

  const adapters = {
    remote: 'https://lcdp.vtj.pro',
    access: {
      auth: '/auth.html',
      privateKey:
        'MIIBOgIBAAJBAKoIzmn1FYQ1YOhOBw9EhABxZ+PySAIaydI+zdhoKflrdgJ4A5E4/5gbQmRpk09hPWG8nvX7h+l/QLU8kXxAIBECAwEAAQJAAlgpxQY6sByLsXqzJcthC8LSGsLf2JEJkHwlnpwFqlEV8UCkoINpuZ2Wzl+aftURu5rIfAzRCQBvHmeOTW9/zQIhAO5ufWDmnSLyfAAsNo5JRNpVuLFCFodR8Xm+ulDlosR/AiEAtpAltyP9wmCABKG/v/hrtTr3mcvFNGCjoGa9bUAok28CIHbrVs9w1ijrBlvTsXYwJw46uP539uKRRT4ymZzlm9QjAiB+1KH/G9f9pEEL9rtaSOG7JF5D0JcOjlze4MGVFs+ZrQIhALKOUFBNr2zEsyJIjw2PlvEucdlG77UniszjXTROHSPd'
    }
  };

  const extension = {
    ...(vtj.extension || {}),
    history: vtj.history || 'hash',
    base: vtj.base || '/',
    pageRouteName: vtj.pageRouteName || 'page',
    __BASE_PATH__: opts.staticBase,
    __adapters__: merge({}, adapters, vtj.adapters || {})
  };

  return success(extension);
}

export async function init(_body: any, opts: DevToolsOptions) {
  const root = resolve('./');
  const pkg = readJsonSync(resolve(root, 'package.json'));
  const repository = new JsonRepository('projects');
  const pluginPepository = new PluginRepository(pkg, opts);
  // 从项目的 package.json 中读取项目信息
  const { vtj = {} } = pkg || {};
  const id = vtj.id || pkg.name;
  const name = vtj.name || pkg.description || upperFirstCamelCase(id);
  const description = vtj.description || pkg.description || '';

  // 如果项目文件已经存在，则直接返回文件内容
  let dsl: ProjectSchema = repository.get(id);
  const plugins = pluginPepository.getPlugins();
  if (dsl) {
    const blocks = (dsl.blocks || []).filter((n) => !n.preset);
    dsl.blocks = plugins.concat(blocks);
    Object.assign(dsl, { id, name, description });
    if (!isInit) {
      isInit = true;
      repository.save(id, dsl);
    }
    dsl.__BASE_PATH__ = opts.staticBase;
    return success(dsl);
  } else {
    const model = new ProjectModel({
      id,
      name,
      description,
      blocks: plugins
    });
    dsl = model.toDsl();
    repository.save(id, dsl);
    dsl.__BASE_PATH__ = opts.staticBase;
    return success(dsl);
  }
}

export async function saveProject(dsl: ProjectSchema) {
  const repository = new JsonRepository('projects');
  if (repository.exist(dsl.id as string)) {
    const ret = repository.save(dsl.id as string, dsl);
    return success(ret);
  } else {
    return fail('项目文件不存在');
  }
}

export async function saveFile(dsl: BlockSchema) {
  const repository = new JsonRepository('files');
  const ret = repository.save(dsl.id as string, dsl);
  return success(ret);
}

export async function getFile(id: string) {
  const repository = new JsonRepository('files');
  const json = repository.get(id);
  if (json) {
    return success(json);
  } else {
    return fail('文件不存在');
  }
}

export async function removeFile(id: string) {
  const repository = new JsonRepository('files');
  const ret = repository.remove(id);
  return success(ret);
}

export async function getHistory(id: string) {
  const repository = new JsonRepository('histories');
  const json = repository.get(id);
  if (json) {
    return success(json);
  } else {
    return success({});
  }
}

export async function saveHistory(file: HistorySchema) {
  const repository = new JsonRepository('histories');
  const ret = repository.save(file.id as string, file);
  return success(ret);
}

export async function removeHistory(id: string) {
  const repository = new JsonRepository('histories');
  const items = new JsonRepository(`histories/${id}`);
  items.clear();
  repository.remove(id);
  return success(true);
}

export async function getHistoryItem(fId: string, id: string) {
  const repository = new JsonRepository(`histories/${fId}`);
  const json = repository.get(id);
  if (json) {
    return success(json);
  } else {
    return fail('文件不存在');
  }
}

export async function saveHistoryItem(fId: string, item: HistoryItem) {
  const repository = new JsonRepository(`histories/${fId}`);
  repository.save(item.id, item);
  return success(true);
}

export async function removeHistoryItem(fId: string, ids: string[]) {
  const repository = new JsonRepository(`histories/${fId}`);

  ids.forEach((id: string) => {
    repository.remove(id);
  });

  return success(true);
}

export async function saveMaterials(
  project: ProjectSchema,
  materials: Record<string, MaterialDescription>
) {
  const repository = new JsonRepository('materials');
  repository.save(project.id as string, materials);
  return success(true);
}

export async function publishFile(
  project: ProjectSchema,
  file: PageFile | BlockFile,
  componentMap?: Map<string, MaterialDescription>
) {
  const materialsRepository = new JsonRepository('materials');
  const materials = materialsRepository.get(project.id as string);
  componentMap =
    componentMap ||
    new Map<string, MaterialDescription>(Object.entries(materials || {}));
  const fileRepository = new JsonRepository('files');
  const dsl = fileRepository.get(file.id as string);
  if (dsl) {
    const content = await generator(
      dsl,
      componentMap,
      project.dependencies
    ).catch((e) => {
      try {
        saveLogs({
          dsl: dsl,
          componentMap,
          dependencies: project.dependencies,
          message: e.message,
          stack: e.stack
        });
      } catch (e) {}
      throw e;
    });
    const vueRepository = new VueRepository();
    vueRepository.save(file.id as string, content);
    return success(true);
  } else {
    return fail('文件不存在');
  }
}

export async function publish(project: ProjectSchema) {
  const { pages = [], blocks = [] } = project;
  const materialsRepository = new JsonRepository('materials');
  const materials = materialsRepository.get(project.id as string);
  const componentMap = new Map<string, MaterialDescription>(
    Object.entries(materials)
  );

  for (const block of blocks) {
    if (!block.fromType || block.fromType === 'Schema') {
      await publishFile(project, block, componentMap);
    }
  }
  for (const page of pages) {
    if (!page.raw) {
      await publishFile(project, page, componentMap);
    }
  }

  return success(true);
}

export async function genVueContent(project: ProjectSchema, dsl: BlockSchema) {
  const materialsRepository = new JsonRepository('materials');
  const materials = materialsRepository.get(project.id as string);
  const componentMap = new Map<string, MaterialDescription>(
    Object.entries(materials)
  );

  const content = await generator(
    dsl,
    componentMap,
    project.dependencies
  ).catch((e) => {
    throw e;
  });
  return success(content);
}

export async function createRawPage(file: PageFile) {
  const repository = new VueRepository();
  const page = await createEmptyPage(file);
  repository.save(file.id as string, page);
  return success(true);
}

export async function removeRawPage(id: string) {
  const repository = new VueRepository();
  repository.remove(id);
  return success(true);
}

export async function uploadStaticFiles(
  files: formidable.File[],
  options: StaticRepositoryOptions
) {
  const repository = new StaticRepository(options);
  const error = repository.validate(files);
  if (error) {
    return fail('文件名称已存在', error);
  }
  const res = repository.save(files);
  return success(res);
}

export async function removeStaticFile(
  filename: string,
  options: StaticRepositoryOptions
) {
  const repository = new StaticRepository(options);
  const ret = repository.remove(filename);
  return ret ? success(true) : fail('删除失败');
}

export async function getStaticFiles(options: StaticRepositoryOptions) {
  const repository = new StaticRepository(options);
  return success(repository.getAllFiles());
}

export async function clearStaticFiles(options: StaticRepositoryOptions) {
  const repository = new StaticRepository(options);
  return success(repository.clear());
}
