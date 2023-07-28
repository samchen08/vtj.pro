import fs from 'fs-extra';
import { join } from 'path';
import { coder, getPages } from '@vtj/engine/shared';
import { success, fail, ApiRequest } from './shared';
const {
  readJSONSync,
  writeJSONSync,
  existsSync,
  ensureDirSync,
  removeSync,
  writeFileSync
} = fs;
const DIR_PATH = join(process.cwd(), '.vtj');
const PROJECT_PATH = join(DIR_PATH, 'project');
const FILE_PATH = join(DIR_PATH, 'file');
const HISTORY_PATH = join(DIR_PATH, 'histroy');
const SRC_PATH = join(process.cwd(), 'src');

function getFilePath(dir: string, id: string) {
  return join(dir, id + '.json');
}

export async function notMatch(req: ApiRequest) {
  return fail('找不到处理程序');
}

export async function getProject(req: ApiRequest) {
  let id = req.data;
  if (!id) {
    return fail('项目id不存在');
  }
  id = id.replace(/\//gi, '_');
  const file = getFilePath(PROJECT_PATH, id);

  if (existsSync(file)) {
    const content = readJSONSync(file);
    return success(content);
  } else {
    return success(null);
  }
}

export async function createProject(req: ApiRequest) {
  let id = req.data?.id;
  if (!id) {
    return fail('项目id不存在');
  }
  id = id.replace(/\//gi, '_');
  const file = getFilePath(PROJECT_PATH, id);
  if (!existsSync(PROJECT_PATH)) {
    ensureDirSync(PROJECT_PATH);
  }
  writeJSONSync(file, req.data);
  return success(true);
}

export async function createFile(req: ApiRequest) {
  const id = req.data?.id;
  if (!id) {
    return fail('文件id不存在');
  }
  const file = getFilePath(FILE_PATH, id);
  if (!existsSync(FILE_PATH)) {
    ensureDirSync(FILE_PATH);
  }
  writeJSONSync(file, req.data);
  return success(true);
}

export async function getFile(req: ApiRequest) {
  const id = req.data;
  if (!id) {
    return fail('文件id不存在');
  }
  const file = getFilePath(FILE_PATH, id);
  if (existsSync(file)) {
    const content = readJSONSync(file);
    return success(content);
  } else {
    return fail(`文件Id: ${id} 不存在`);
  }
}

export async function removeFile(req: ApiRequest) {
  const id = req.data;
  if (!id) {
    return fail('文件id不存在');
  }
  const file = getFilePath(FILE_PATH, id);
  if (existsSync(file)) {
    removeSync(file);
    return success(true);
  } else {
    return fail(`文件Id: ${id} 不存在`);
  }
}

export async function removeHistory(req: ApiRequest) {
  const id = req.data;
  if (!id) {
    return fail('文件id不存在');
  }
  const file = getFilePath(HISTORY_PATH, id);
  if (existsSync(file)) {
    removeSync(file);
    return success(true);
  } else {
    return fail(`文件Id: ${id} 不存在`);
  }
}

export async function saveHistory(req: ApiRequest) {
  const { blockId, items } = req.data || {};
  if (!blockId) {
    return fail('文件id不存在');
  }
  const file = getFilePath(HISTORY_PATH, blockId);
  if (!existsSync(HISTORY_PATH)) {
    ensureDirSync(HISTORY_PATH);
  }
  writeJSONSync(file, items);
  return success(true);
}

export async function getHistory(req: ApiRequest) {
  const id = req.data;
  if (!id) {
    return fail('文件id不存在');
  }
  const file = getFilePath(HISTORY_PATH, id);
  if (existsSync(file)) {
    const content = readJSONSync(file);
    return success(content);
  } else {
    return success([]);
  }
}

export async function projectCoder(req: ApiRequest) {
  const { assets, project } = req.data;
  if (!assets || !project) {
    return fail('缺少 assets 或 project');
  }
  const pagesDir = join(SRC_PATH, 'views/pages');
  const blocksDir = join(SRC_PATH, 'components/blocks');

  const results: string[] = [];

  const jsonPages = getPages(project.pages || [])
    .map((n) => {
      const file = getFilePath(FILE_PATH, n.id as string);
      if (existsSync(file)) {
        return readJSONSync(file);
      }
      return null;
    })
    .filter((n) => !!n);

  const jsonBlocks = (project.blocks || [])
    .map((n: any) => {
      const file = getFilePath(FILE_PATH, n.id as string);
      if (existsSync(file)) {
        return readJSONSync(file);
      }
      return null;
    })
    .filter((n: any) => !!n);

  try {
    const { pages, blocks } = coder({
      pages: jsonPages,
      blocks: jsonBlocks,
      apis: project.apis || [],
      componentMap: assets.componentMap || {}
    });
    if (!existsSync(pagesDir)) {
      ensureDirSync(pagesDir);
    }
    if (!existsSync(blocksDir)) {
      ensureDirSync(blocksDir);
    }

    for (const file of pages) {
      const filePath = join(pagesDir, `${file.id}.vue`);
      writeFileSync(filePath, file.content, 'utf-8');
      results.push(filePath);
    }

    for (const file of blocks) {
      const filePath = join(blocksDir, `${file.id}.vue`);
      writeFileSync(filePath, file.content, 'utf-8');
      results.push(filePath);
    }
  } catch (e: any) {
    // console.log(e);
    return fail(e.message);
  }

  return success(results);
}
