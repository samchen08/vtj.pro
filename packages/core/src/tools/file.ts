import type {
  BlockFile,
  PageFile,
  PlatformType,
  ProjectSchema
} from '../protocols';
import { kebabCase } from '@vtj/base';

export type ProjectFile = BlockFile | PageFile;

export interface ProjectFileIndex {
  byId: Map<string, ProjectFile>;
  blockIdByImportPath: Map<string, string>;
  blockIdBySourcePath: Map<string, string>;
  pageIdBySourcePath: Map<string, string>;
}

export function normalizeFilePath(value?: string) {
  return (value || '')
    .trim()
    .replace(/\\/g, '/')
    .replace(/^\/+|\/+$/g, '')
    .replace(/\.vue$/i, '');
}

export function normalizeRoutePath(value?: string) {
  const path = (value || '').trim().replace(/\\/g, '/');
  if (!path) return '';
  const result = `/${path}`.replace(/\/{2,}/g, '/');
  return result.length > 1 ? result.replace(/\/$/, '') : result;
}

export function getFilePath(file: ProjectFile) {
  return normalizeFilePath(file.filePath) || file.id;
}

export function getPageNamePath(name: string) {
  return kebabCase(name);
}

export function getSourceFilePath(
  file: ProjectFile,
  platform: PlatformType = 'web'
) {
  const path = getFilePath(file);
  if (file.type === 'block') {
    return `src/components/${path}.vue`;
  }
  return platform === 'uniapp'
    ? `src/pages/${path}.vue`
    : `src/views/${path}.vue`;
}

export function getBlockImportPath(block: BlockFile) {
  return `@/components/${getFilePath(block)}.vue`;
}

export function getPageRoutePath(
  page: PageFile,
  prefix: string = '',
  routeName: string = 'page'
) {
  const custom = normalizeRoutePath(page.routePath);
  if (custom) return custom;
  if (page.filePath) {
    const path = getFilePath(page)
      .split('/')
      .map((item) => kebabCase(item))
      .join('/');
    return normalizeRoutePath(`${prefix}${routeName}/${path}`);
  }
  return normalizeRoutePath(`${prefix}${routeName}/${page.id}`);
}

export function getUniPagePath(page: PageFile) {
  return `pages/${getFilePath(page)}`;
}

export function flattenPages(pages: PageFile[] = []) {
  const result: PageFile[] = [];
  for (const page of pages) {
    if (!page.dir) result.push(page);
    if (page.children?.length) {
      result.push(...flattenPages(page.children));
    }
  }
  return result;
}

export function createProjectFileIndex(
  project: Pick<ProjectSchema, 'pages' | 'blocks' | 'platform'>
): ProjectFileIndex {
  const byId = new Map<string, ProjectFile>();
  const blockIdByImportPath = new Map<string, string>();
  const blockIdBySourcePath = new Map<string, string>();
  const pageIdBySourcePath = new Map<string, string>();

  for (const block of project.blocks || []) {
    const source = getSourceFilePath(block, project.platform).toLowerCase();
    byId.set(block.id, block);
    blockIdBySourcePath.set(source, block.id);
    blockIdByImportPath.set(getBlockImportPath(block).toLowerCase(), block.id);
  }
  for (const page of flattenPages(project.pages)) {
    byId.set(page.id, page);
    pageIdBySourcePath.set(
      getSourceFilePath(page, project.platform).toLowerCase(),
      page.id
    );
  }
  return {
    byId,
    blockIdByImportPath,
    blockIdBySourcePath,
    pageIdBySourcePath
  };
}

export function isValidFilePath(value?: string) {
  if (!value) return true;
  const path = value.trim();
  return (
    !!path &&
    !path.startsWith('/') &&
    !path.endsWith('.vue') &&
    !/[\\?#]/.test(path) &&
    path.split('/').every((item) => /^(?!\.{1,2}$)[A-Za-z0-9_-]+$/.test(item))
  );
}

export function isValidRoutePath(value?: string) {
  if (!value) return true;
  return value.startsWith('/') && !/[?#]/.test(value);
}
