import {
  createProjectFileIndex,
  getSourceFilePath,
  type ProjectSchema
} from '@vtj/core';

function resolvePath(path: string) {
  const result: string[] = [];
  for (const item of path.replace(/\\/g, '/').split('/')) {
    if (!item || item === '.') continue;
    if (item === '..') {
      result.pop();
    } else {
      result.push(item);
    }
  }
  return result.join('/');
}

function dirname(path: string) {
  return path.split('/').slice(0, -1).join('/');
}

function normalizeImportSource(source: string, currentSourcePath?: string) {
  const value = source.split(/[?#]/)[0].replace(/\\/g, '/');
  let path = value;
  if (value.startsWith('@/')) {
    path = `src/${value.slice(2)}`;
  } else if (value.startsWith('.') && currentSourcePath) {
    path = `${dirname(currentSourcePath)}/${value}`;
  }
  path = resolvePath(path).replace(/^\//, '');
  return path.endsWith('.vue') ? path : `${path}.vue`;
}

export function resolveProjectBlockImport(
  source: string,
  project: ProjectSchema,
  currentId: string
) {
  const index = createProjectFileIndex(project);
  const current = index.byId.get(currentId);
  const currentSourcePath = current
    ? getSourceFilePath(current, project.platform)
    : undefined;
  const normalized = normalizeImportSource(
    source,
    currentSourcePath
  ).toLowerCase();
  const matched = index.blockIdBySourcePath.get(normalized);
  if (matched) return matched;

  const legacyId = source
    .split(/[?#]/)[0]
    .replace(/\\/g, '/')
    .split('/')
    .pop()
    ?.replace(/\.vue$/i, '');
  return legacyId && project.blocks?.some((item) => item.id === legacyId)
    ? legacyId
    : undefined;
}
