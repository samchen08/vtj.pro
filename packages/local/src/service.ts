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
import {
  readJsonSync,
  pathExistsSync,
  writeJsonSync,
  ensureFileSync,
  removeSync,
  outputFileSync,
  upperFirstCamelCase,
  timestamp
} from '@vtj/node';
import { generator, createEmptyPage } from '@vtj/coder';

import { fail, success, type ApiRequest } from './shared';

const root = resolve('./');
const vtjDir = resolve('.vtj');
const viewsDir = resolve('src/views');

const getProjectFilePath = (_name: string) => {
  return resolve(vtjDir, 'project.json');
};

const getMaterialsFilePath = (_name: string) => {
  return resolve(vtjDir, 'materials.json');
};

const getFilePath = (id: string) => {
  return resolve(vtjDir, `files/${id}.json`);
};

const getHistoryFilePath = (id: string) => {
  return resolve(vtjDir, `histories/${id}.json`);
};

const getHistoryItemFilePath = (fId: string, id: string) => {
  return resolve(vtjDir, `histories/${fId}/${id}.json`);
};

const getHistoryItemDir = (fId: string) => {
  return resolve(vtjDir, `histories/${fId}`);
};

const getRawFilePath = (id: string) => {
  return resolve(vtjDir, `raw/${id}.vue`);
};

const getRawPagePath = (id: string) => {
  return resolve(viewsDir, `${id}.vue`);
};

const getLogsDir = () => {
  return resolve(vtjDir, `logs`);
};

export async function notMatch(_req: ApiRequest) {
  return fail('找不到处理程序');
}

export async function saveLogs(e: any) {
  const name = `error-${timestamp()}.json`;
  outputFileSync(resolve(getLogsDir(), name), JSON.stringify(e), 'utf-8');
}

export async function init() {
  const pkg = readJsonSync(resolve(root, 'package.json'));
  // 从项目的 package.json 中读取项目信息
  const { name, description } = pkg || {};
  // 项目文件路径
  const filePath = getProjectFilePath(name);

  let schema: ProjectSchema = {} as ProjectSchema;

  // 如果已文件经存在，则直接返回文件内容
  if (pathExistsSync(filePath)) {
    schema = readJsonSync(filePath);
  }
  // 否则，创建一个新的项目文件
  const project = new ProjectModel({
    ...schema,
    id: name,
    name: description || upperFirstCamelCase(name),
    description
  });
  const dsl = project.toDsl(schema.__VERSION__);
  ensureFileSync(filePath);
  writeJsonSync(filePath, dsl);
  return success(dsl);
}

export async function saveProject(project: ProjectSchema) {
  const filePath = getProjectFilePath(project.id as string);
  if (pathExistsSync(filePath)) {
    writeJsonSync(filePath, project);
    return success(true);
  } else {
    return fail('项目文件不存在');
  }
}

export async function saveFile(file: BlockSchema) {
  const filePath = getFilePath(file.id as string);
  if (!pathExistsSync(filePath)) {
    ensureFileSync(filePath);
  }
  writeJsonSync(filePath, file);
  return success(true);
}

export async function getFile(id: string) {
  const filePath = getFilePath(id);
  if (pathExistsSync(filePath)) {
    const json = readJsonSync(filePath);
    return success(json);
  } else {
    return fail('文件不存在');
  }
}

export async function removeFile(id: string) {
  const filePath = getFilePath(id);
  if (pathExistsSync(filePath)) {
    removeSync(filePath);
    return success(true);
  } else {
    return fail('文件不存在');
  }
}

export async function getHistory(id: string) {
  const filePath = getHistoryFilePath(id);
  if (pathExistsSync(filePath)) {
    const json = readJsonSync(filePath);
    return success(json);
  } else {
    return success({});
  }
}

export async function saveHistory(file: HistorySchema) {
  const filePath = getHistoryFilePath(file.id as string);
  if (!pathExistsSync(filePath)) {
    ensureFileSync(filePath);
  }
  writeJsonSync(filePath, file);
  return success(true);
}

export async function removeHistory(id: string) {
  const filePath = getHistoryFilePath(id);
  const dir = getHistoryItemDir(id);
  if (pathExistsSync(filePath)) {
    removeSync(filePath);
    removeSync(dir);
    return success(true);
  } else {
    return fail('文件不存在');
  }
}

export async function getHistoryItem(fId: string, id: string) {
  const filePath = getHistoryItemFilePath(fId, id);
  if (pathExistsSync(filePath)) {
    const json = readJsonSync(filePath);
    return success(json);
  } else {
    return fail('文件不存在');
  }
}

export async function saveHistoryItem(fId: string, item: HistoryItem) {
  const filePath = getHistoryItemFilePath(fId, item.id);
  if (!pathExistsSync(filePath)) {
    ensureFileSync(filePath);
  }
  writeJsonSync(filePath, item);
  return success(true);
}

export async function removeHistoryItem(fId: string, ids: string[]) {
  ids.forEach((id: string) => {
    const filePath = getHistoryItemFilePath(fId, id);
    removeSync(filePath);
  });
  return success(true);
}

export async function saveMaterials(
  project: ProjectSchema,
  materials: Record<string, MaterialDescription>
) {
  const filePath = getMaterialsFilePath(project.id as string);
  ensureFileSync(filePath);
  writeJsonSync(filePath, materials);
  return success(true);
}

export async function publishFile(
  project: ProjectSchema,
  file: PageFile | BlockFile,
  componentMap?: Map<string, MaterialDescription>
) {
  const materialsPath = getMaterialsFilePath(project.id as string);
  const materials = await readJsonSync(materialsPath);
  componentMap =
    componentMap ||
    new Map<string, MaterialDescription>(Object.entries(materials));
  const filePath = getFilePath(file.id as string);
  const dsl = readJsonSync(filePath);
  const content = await generator(dsl, componentMap, project.dependencies);
  const rawPath = getRawFilePath(file.id as string);
  outputFileSync(rawPath, content, 'utf-8');
  return success(true);
}

export async function publish(project: ProjectSchema) {
  const { pages = [], blocks = [] } = project;
  const materialsPath = getMaterialsFilePath(project.id as string);
  const materials = await readJsonSync(materialsPath);
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

export async function getRaw(project: ProjectSchema, dsl: BlockSchema) {
  const materialsPath = getMaterialsFilePath(project.id as string);
  const materials = await readJsonSync(materialsPath);
  const componentMap = new Map<string, MaterialDescription>(
    Object.entries(materials)
  );
  const content = await generator(dsl, componentMap, project.dependencies);
  return success(content);
}

export async function createRawPage(file: PageFile) {
  const filePath = getRawPagePath(file.id as string);
  const page = await createEmptyPage(file);
  outputFileSync(filePath, page, 'utf-8');
  return success(true);
}
export async function removeRawPage(id: string) {
  const filePath = getRawPagePath(id);
  if (pathExistsSync(filePath)) {
    removeSync(filePath);
    return success(true);
  } else {
    return fail('文件不存在');
  }
}
