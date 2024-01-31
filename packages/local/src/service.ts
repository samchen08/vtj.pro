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
import { readJsonSync, upperFirstCamelCase, timestamp } from '@vtj/node';
import { generator, createEmptyPage } from '@vtj/coder';
import { fail, success, type ApiRequest } from './shared';
import { JsonRepository, VueRepository } from './repository';

export async function notMatch(_req: ApiRequest) {
  return fail('找不到处理程序');
}

export async function saveLogs(e: any) {
  const name = `error-${timestamp()}`;
  const logs = new JsonRepository('logs');
  const json = JSON.parse(JSON.stringify(e));
  return logs.save(name, json);
}

export async function init() {
  const root = resolve('./');
  const pkg = readJsonSync(resolve(root, 'package.json'));
  const repository = new JsonRepository('projects');
  // 从项目的 package.json 中读取项目信息
  const { name, description } = pkg || {};

  // 如果项目文件已经存在，则直接返回文件内容
  let dsl = repository.get(name);
  if (dsl) {
    return success(dsl);
  } else {
    const model = new ProjectModel({
      id: name,
      name: description || upperFirstCamelCase(name),
      description
    });
    dsl = model.toDsl();
    repository.save(name, dsl);
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
    const content = await generator(dsl, componentMap, project.dependencies);
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
    await publishFile(project, block, componentMap);
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

  const content = await generator(dsl, componentMap, project.dependencies);
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
