import { describe, expect, test } from 'vitest';
import {
  createProjectFileIndex,
  getBlockImportPath,
  getFilePath,
  getPageRoutePath,
  getSourceFilePath,
  getUniPagePath,
  isValidFilePath
} from '../../src';
import type { BlockFile, PageFile, ProjectSchema } from '../../src';

describe('project file paths', () => {
  const page: PageFile = {
    id: 'page-1',
    type: 'page',
    name: 'Users',
    title: 'Users',
    filePath: 'system/users/index',
    routePath: '/users'
  };
  const block: BlockFile = {
    id: 'block-1',
    type: 'block',
    name: 'UserCard',
    title: 'UserCard',
    filePath: 'user/UserCard'
  };

  test('uses ids for legacy files', () => {
    expect(getFilePath({ ...page, filePath: undefined })).toBe('page-1');
    expect(
      getPageRoutePath({
        ...page,
        filePath: undefined,
        routePath: undefined
      })
    ).toBe('/page/page-1');
  });

  test('derives default routes from configured file paths', () => {
    expect(getPageRoutePath({ ...page, routePath: undefined })).toBe(
      '/page/system/users/index'
    );
    expect(
      getPageRoutePath({
        ...page,
        filePath: 'system/UserDetail',
        routePath: undefined
      })
    ).toBe('/page/system/user-detail');
  });

  test('creates platform source paths and imports', () => {
    expect(getSourceFilePath(page)).toBe('src/views/system/users/index.vue');
    expect(getSourceFilePath(page, 'uniapp')).toBe(
      'src/pages/system/users/index.vue'
    );
    expect(getSourceFilePath(block)).toBe('src/components/user/UserCard.vue');
    expect(getBlockImportPath(block)).toBe('@/components/user/UserCard.vue');
    expect(getUniPagePath(page)).toBe('pages/system/users/index');
  });

  test('indexes nested pages and blocks', () => {
    const project: ProjectSchema = {
      name: 'Test',
      pages: [
        {
          id: 'dir',
          type: 'page',
          name: 'Dir',
          title: 'Dir',
          dir: true,
          children: [page]
        }
      ],
      blocks: [block]
    };
    const index = createProjectFileIndex(project);
    expect(index.byId.get('page-1')).toBe(page);
    expect(
      index.blockIdByImportPath.get('@/components/user/usercard.vue')
    ).toBe('block-1');
  });

  test('rejects unsafe file paths', () => {
    expect(isValidFilePath('system/User')).toBe(true);
    expect(isValidFilePath('../User')).toBe(false);
    expect(isValidFilePath('/User')).toBe(false);
    expect(isValidFilePath('User.vue')).toBe(false);
  });
});
