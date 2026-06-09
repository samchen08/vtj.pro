import { expect, test, vi, describe, beforeEach } from 'vitest';
import { ProjectModel, emitter } from '../../src';
import type {
  ProjectSchema,
  PageFile,
  BlockFile,
  Dependencie,
  ApiSchema,
  MetaSchema
} from '../../src/protocols';

describe('ProjectModel', () => {
  beforeEach(() => {
    emitter.all.clear();
  });

  const createMinimalSchema = (): ProjectSchema => ({
    id: 'proj-1',
    name: 'TestProject'
  });

  describe('constructor', () => {
    test('should create project with id and name', () => {
      const project = new ProjectModel(createMinimalSchema());
      expect(project.id).toBe('proj-1');
      expect(project.name).toBe('TestProject');
    });

    test('should auto-generate id if not provided', () => {
      const project = new ProjectModel({ name: 'Test' });
      expect(project.id).toBeDefined();
    });

    test('should set default values', () => {
      const project = new ProjectModel({ name: 'Test' });
      expect(project.platform).toBe('web');
      expect(project.pages).toEqual([]);
      expect(project.blocks).toEqual([]);
      expect(project.dependencies).toEqual([]);
      expect(project.apis).toEqual([]);
    });

    test('should generate __UID__', () => {
      const project = new ProjectModel({ name: 'Test' });
      expect(project.__UID__).toBeDefined();
    });
  });

  describe('update', () => {
    test('should update properties', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.update({ name: 'Updated', platform: 'h5' });
      expect(project.name).toBe('Updated');
      expect(project.platform).toBe('h5');
    });

    test('should emit EVENT_PROJECT_CHANGE', () => {
      const listener = vi.fn();
      emitter.on('EVENT_PROJECT_CHANGE', listener);
      const project = new ProjectModel({ name: 'Test' });
      project.update({ name: 'Updated' });
      expect(listener).toHaveBeenCalled();
    });
  });

  describe('toDsl', () => {
    test('should serialize without dsl', () => {
      const schema: ProjectSchema = {
        id: 'proj-1',
        name: 'Test',
        pages: [
          {
            type: 'page',
            id: 'p1',
            name: 'Home',
            title: 'Home Page',
            dsl: { id: 'p1', name: 'Home' }
          }
        ],
        blocks: [
          {
            type: 'block',
            id: 'b1',
            name: 'Block',
            title: 'Block',
            dsl: { id: 'b1', name: 'Block' }
          }
        ]
      };
      const project = new ProjectModel(schema);
      const dsl = project.toDsl();
      expect(dsl.id).toBe('proj-1');
      expect(dsl.__VTJ_PROJECT__).toBe(true);
      expect((dsl.pages![0] as any).dsl).toBeUndefined();
      expect((dsl.blocks![0] as any).dsl).toBeUndefined();
    });
  });

  describe('active/deactivate', () => {
    test('active should set currentFile', () => {
      const project = new ProjectModel({ name: 'Test' });
      const file: PageFile = {
        type: 'page',
        id: 'p1',
        name: 'Home',
        title: 'Home'
      };
      project.active(file);
      expect(project.currentFile).toBe(file);
    });

    test('active should emit EVENT_PROJECT_ACTIVED', () => {
      const listener = vi.fn();
      emitter.on('EVENT_PROJECT_ACTIVED', listener);
      const project = new ProjectModel({ name: 'Test' });
      project.active({ type: 'page', id: 'p1', name: 'Home', title: 'Home' });
      expect(listener).toHaveBeenCalled();
    });

    test('deactivate should clear currentFile', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.active({ type: 'page', id: 'p1', name: 'Home', title: 'Home' });
      project.deactivate();
      expect(project.currentFile).toBeNull();
    });
  });

  describe('pages operations', () => {
    test('createPage should add page', async () => {
      const project = new ProjectModel({ name: 'Test' });
      const page = await project.createPage({
        type: 'page',
        id: 'p1',
        name: 'Home',
        title: 'Home'
      });
      expect(project.pages).toHaveLength(1);
      expect(page.type).toBe('page');
      expect(page.id).toBe('p1');
      expect(page.dsl).toBeDefined();
    });

    test('createPage should create dir page', async () => {
      const project = new ProjectModel({ name: 'Test' });
      const page = await project.createPage({
        type: 'page',
        id: 'dir1',
        name: 'Dir',
        title: 'Directory',
        dir: true
      });
      expect(page.children).toEqual([]);
    });

    test('createPage should create raw page', async () => {
      const project = new ProjectModel({ name: 'Test' });
      const page = await project.createPage({
        type: 'page',
        id: '',
        name: 'RawPage.vue',
        title: 'Raw',
        raw: true
      });
      expect(page.raw).toBe(true);
      expect(page.id).toBe('RawPage.vue');
    });

    test('getPage should find page by id', async () => {
      const project = new ProjectModel({ name: 'Test' });
      await project.createPage({
        type: 'page',
        id: 'p1',
        name: 'Home',
        title: 'Home'
      });
      const page = project.getPage('p1');
      expect(page).toBeDefined();
      expect(page!.name).toBe('Home');
    });

    test('getPage should find nested page', async () => {
      const project = new ProjectModel({ name: 'Test' });
      await project.createPage({
        type: 'page',
        id: 'dir1',
        name: 'Dir',
        title: 'Dir',
        dir: true
      });
      await project.createPage(
        { type: 'page', id: 'p1', name: 'Home', title: 'Home' },
        'dir1'
      );
      const page = project.getPage('p1');
      expect(page).toBeDefined();
      expect(page!.name).toBe('Home');
    });

    test('getPage should return undefined for non-existent', () => {
      const project = new ProjectModel({ name: 'Test' });
      expect(project.getPage('nonexistent')).toBeUndefined();
    });

    test('getPages should return flat list without directories', async () => {
      const project = new ProjectModel({ name: 'Test' });
      await project.createPage({
        type: 'page',
        id: 'p1',
        name: 'Home',
        title: 'Home'
      });
      await project.createPage({
        type: 'page',
        id: 'dir1',
        name: 'Dir',
        title: 'Dir',
        dir: true
      });
      const pages = project.getPages();
      expect(pages).toHaveLength(1);
      expect(pages[0].id).toBe('p1');
    });

    test('getHomepage should return homepage or first page', async () => {
      const project = new ProjectModel({ name: 'Test' });
      await project.createPage({
        type: 'page',
        id: 'p1',
        name: 'Home',
        title: 'Home'
      });
      await project.createPage({
        type: 'page',
        id: 'p2',
        name: 'About',
        title: 'About'
      });
      const homepage = project.getHomepage();
      expect(homepage).toBeDefined();
    });

    test('getHomepage should return specific page when set', async () => {
      const project = new ProjectModel({ name: 'Test' });
      await project.createPage({
        type: 'page',
        id: 'p1',
        name: 'Home',
        title: 'Home'
      });
      await project.createPage({
        type: 'page',
        id: 'p2',
        name: 'About',
        title: 'About'
      });
      project.setHomepage('p2');
      const homepage = project.getHomepage();
      expect(homepage!.id).toBe('p2');
    });

    test('updatePage should update page properties', async () => {
      const project = new ProjectModel({ name: 'Test' });
      await project.createPage({
        type: 'page',
        id: 'p1',
        name: 'Home',
        title: 'Home'
      });
      project.updatePage({
        type: 'page',
        id: 'p1',
        name: 'Updated',
        title: 'Updated'
      });
      expect(project.getPage('p1')!.name).toBe('Updated');
    });

    test('removePage should remove page', async () => {
      const project = new ProjectModel({ name: 'Test' });
      await project.createPage({
        type: 'page',
        id: 'p1',
        name: 'Home',
        title: 'Home'
      });
      project.removePage('p1');
      expect(project.getPage('p1')).toBeUndefined();
    });

    test('removePage should deactivate if current', async () => {
      const project = new ProjectModel({ name: 'Test' });
      await project.createPage({
        type: 'page',
        id: 'p1',
        name: 'Home',
        title: 'Home'
      });
      project.active({ type: 'page', id: 'p1', name: 'Home', title: 'Home' });
      project.removePage('p1');
      expect(project.currentFile).toBeNull();
    });

    test('clonePage should create a copy', async () => {
      const project = new ProjectModel({ name: 'Test' });
      await project.createPage({
        type: 'page',
        id: 'p1',
        name: 'Home',
        title: 'Home'
      });
      project.clonePage(project.getPage('p1')!);
      expect(project.pages).toHaveLength(2);
      expect(project.pages[1].name).toBe('HomeCopy');
    });

    test('findParent should return parent page', async () => {
      const project = new ProjectModel({ name: 'Test' });
      await project.createPage({
        type: 'page',
        id: 'dir1',
        name: 'Dir',
        title: 'Dir',
        dir: true
      });
      await project.createPage(
        { type: 'page', id: 'p1', name: 'Home', title: 'Home' },
        'dir1'
      );
      const parent = project.findParent('p1');
      expect(parent).toBeDefined();
      expect(parent!.id).toBe('dir1');
    });

    test('movePageTo should move page to directory', async () => {
      const project = new ProjectModel({ name: 'Test' });
      await project.createPage({
        type: 'page',
        id: 'p1',
        name: 'Home',
        title: 'Home'
      });
      await project.createPage({
        type: 'page',
        id: 'dir1',
        name: 'Dir',
        title: 'Dir',
        dir: true
      });
      project.movePageTo('p1', 'dir1');
      const dir = project.getPage('dir1');
      expect(dir!.children).toHaveLength(1);
      expect(dir!.children![0].id).toBe('p1');
    });

    test('getPageTree should return deep cloned tree without dsl', async () => {
      const project = new ProjectModel({ name: 'Test' });
      await project.createPage({
        type: 'page',
        id: 'p1',
        name: 'Home',
        title: 'Home',
        dsl: { id: 'p1', name: 'Home' as any }
      });
      const tree = project.getPageTree();
      expect(tree).toHaveLength(1);
      expect((tree[0] as any).dsl).toBeUndefined();
    });

    test('saveToBlock should create block from page', async () => {
      const project = new ProjectModel({ name: 'Test' });
      await project.createPage({
        type: 'page',
        id: 'p1',
        name: 'Home',
        title: 'Home'
      });
      const page = project.getPage('p1')!;
      await project.saveToBlock(page);
      expect(project.blocks).toHaveLength(1);
      expect(project.blocks[0].type).toBe('block');
    });

    test('existPageName should check name uniqueness', async () => {
      const project = new ProjectModel({ name: 'Test' });
      await project.createPage({
        type: 'page',
        id: 'p1',
        name: 'Home',
        title: 'Home'
      });
      expect(project.existPageName('Home')).toBe(true);
      expect(project.existPageName('About')).toBe(false);
    });
  });

  describe('blocks operations', () => {
    test('createBlock should add block', async () => {
      const project = new ProjectModel({ name: 'Test' });
      const block = await project.createBlock({
        type: 'block',
        id: 'b1',
        name: 'MyBlock',
        title: 'My Block'
      });
      expect(project.blocks).toHaveLength(1);
      expect(block.id).toBe('b1');
      expect(block.type).toBe('block');
      expect(block.fromType).toBe('Schema');
    });

    test('getBlock should find block', async () => {
      const project = new ProjectModel({ name: 'Test' });
      await project.createBlock({
        type: 'block',
        id: 'b1',
        name: 'MyBlock',
        title: 'My Block'
      });
      expect(project.getBlock('b1')).toBeDefined();
    });

    test('updateBlock should update block', async () => {
      const project = new ProjectModel({ name: 'Test' });
      await project.createBlock({
        type: 'block',
        id: 'b1',
        name: 'MyBlock',
        title: 'My Block'
      });
      project.updateBlock({
        type: 'block',
        id: 'b1',
        name: 'Updated',
        title: 'Updated'
      });
      expect(project.getBlock('b1')!.name).toBe('Updated');
    });

    test('cloneBlock should create a copy', async () => {
      const project = new ProjectModel({ name: 'Test' });
      await project.createBlock({
        type: 'block',
        id: 'b1',
        name: 'Block',
        title: 'Block'
      });
      project.cloneBlock(project.getBlock('b1')!);
      expect(project.blocks).toHaveLength(2);
      expect(project.blocks[1].name).toBe('BlockCopy');
    });

    test('removeBlock should remove block', async () => {
      const project = new ProjectModel({ name: 'Test' });
      await project.createBlock({
        type: 'block',
        id: 'b1',
        name: 'Block',
        title: 'Block'
      });
      project.removeBlock('b1');
      expect(project.getBlock('b1')).toBeUndefined();
    });

    test('existBlockName should check name uniqueness', async () => {
      const project = new ProjectModel({ name: 'Test' });
      await project.createBlock({
        type: 'block',
        id: 'b1',
        name: 'MyBlock',
        title: 'Block'
      });
      expect(project.existBlockName('MyBlock')).toBe(true);
      expect(project.existBlockName('Other')).toBe(false);
    });

    test('getFile should find page or block', async () => {
      const project = new ProjectModel({ name: 'Test' });
      await project.createPage({
        type: 'page',
        id: 'p1',
        name: 'Home',
        title: 'Home'
      });
      await project.createBlock({
        type: 'block',
        id: 'b1',
        name: 'Block',
        title: 'Block'
      });
      expect(project.getFile('p1')).toBeDefined();
      expect(project.getFile('b1')).toBeDefined();
      expect(project.getFile('nonexistent')).toBeUndefined();
    });
  });

  describe('dependencies operations', () => {
    test('setDeps should add new dependency', () => {
      const project = new ProjectModel({ name: 'Test' });
      const dep: Dependencie = {
        package: 'vue',
        version: '3.4.0',
        library: 'Vue',
        urls: []
      };
      project.setDeps(dep);
      expect(project.dependencies).toHaveLength(1);
    });

    test('setDeps should update existing dependency', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.setDeps({
        package: 'vue',
        version: '3.3.0',
        library: 'Vue',
        urls: []
      });
      project.setDeps({
        package: 'vue',
        version: '3.4.0',
        library: 'Vue',
        urls: []
      });
      expect(project.dependencies).toHaveLength(1);
      expect(project.dependencies[0].version).toBe('3.4.0');
    });

    test('removeDeps should remove dependency', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.setDeps({
        package: 'vue',
        version: '3.4.0',
        library: 'Vue',
        urls: []
      });
      project.removeDeps({
        package: 'vue',
        version: '3.4.0',
        library: 'Vue',
        urls: []
      });
      expect(project.dependencies).toHaveLength(0);
    });
  });

  describe('api operations', () => {
    test('setApi should add new api', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.setApi({ name: 'getList', url: '/api/list', id: '' });
      expect(project.apis).toHaveLength(1);
      expect(project.apis[0].id).toBeDefined();
    });

    test('setApi should update existing by name', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.setApi({ name: 'getList', url: '/api/list', id: '' });
      project.setApi({ name: 'getList', url: '/api/v2/list', id: '' });
      expect(project.apis).toHaveLength(1);
      expect(project.apis[0].url).toBe('/api/v2/list');
    });

    test('setApis should add multiple apis', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.setApis([
        { name: 'getList', url: '/api/list', id: '' },
        { name: 'getDetail', url: '/api/detail', id: '' }
      ]);
      expect(project.apis).toHaveLength(2);
    });

    test('removeApi should remove api', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.setApi({ name: 'getList', url: '/api/list', id: '' });
      project.removeApi('getList');
      expect(project.apis).toHaveLength(0);
    });

    test('existApiName should check name uniqueness', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.setApi({ name: 'getList', url: '/api/list', id: '' });
      expect(project.existApiName('getList')).toBe(true);
      expect(project.existApiName('other')).toBe(false);
    });
  });

  describe('meta operations', () => {
    test('setMeta should add new meta', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.setMeta({
        id: '',
        code: 'F001',
        title: 'Function',
        queryCode: 'Q001'
      });
      expect(project.meta).toHaveLength(1);
    });

    test('setMeta should update existing by code', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.setMeta({
        id: '',
        code: 'F001',
        title: 'Old',
        queryCode: 'Q001'
      });
      project.setMeta({
        id: '',
        code: 'F001',
        title: 'New',
        queryCode: 'Q001'
      });
      expect(project.meta).toHaveLength(1);
      expect(project.meta[0].title).toBe('New');
    });

    test('removeMeta should remove meta', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.setMeta({
        id: '',
        code: 'F001',
        title: 'Test',
        queryCode: 'Q001'
      });
      project.removeMeta('F001');
      expect(project.meta).toHaveLength(0);
    });

    test('existMetaCode should check code uniqueness', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.setMeta({
        id: '',
        code: 'F001',
        title: 'Test',
        queryCode: 'Q001'
      });
      expect(project.existMetaCode('F001')).toBe(true);
      expect(project.existMetaCode('F002')).toBe(false);
    });
  });

  describe('config operations', () => {
    test('setConfig should merge config', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.setConfig({ title: 'My App', logo: '/logo.png' });
      expect(project.config.title).toBe('My App');
      expect(project.config.logo).toBe('/logo.png');
    });

    test('setHomepage should set homepage', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.setHomepage('p1');
      expect(project.homepage).toBe('p1');
    });

    test('setUniConfig should set uni config', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.setUniConfig('manifestJson', { name: 'App' });
      expect(project.uniConfig.manifestJson).toEqual({ name: 'App' });
    });

    test('setGloblas should set global config', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.setGloblas('css', 'body { margin: 0; }');
      expect(project.globals.css).toBe('body { margin: 0; }');
    });

    test('setI18n should set i18n config', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.setI18n({
        locale: 'en',
        fallbackLocale: 'en',
        messages: [{ key: 'hello', 'zh-CN': '你好', en: 'hello' }]
      });
      expect(project.i18n.locale).toBe('en');
      expect(project.i18n.messages).toHaveLength(1);
    });

    test('setEnv should set env config', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.setEnv([
        {
          name: 'API_URL',
          development: 'http://localhost',
          production: 'https://api.example.com'
        }
      ]);
      expect(project.env).toHaveLength(1);
    });
  });

  describe('publish/genSource', () => {
    test('publish without file should emit EVENT_PROJECT_PUBLISH', () => {
      const listener = vi.fn();
      emitter.on('EVENT_PROJECT_PUBLISH', listener);
      const project = new ProjectModel({ name: 'Test' });
      project.publish();
      expect(listener).toHaveBeenCalled();
    });

    test('publish with file should emit EVENT_PROJECT_FILE_PUBLISH', () => {
      const listener = vi.fn();
      emitter.on('EVENT_PROJECT_FILE_PUBLISH', listener);
      const project = new ProjectModel({ name: 'Test' });
      project.publish({ type: 'page', id: 'p1', name: 'Home', title: 'Home' });
      expect(listener).toHaveBeenCalled();
    });

    test('genSource should emit EVENT_PROJECT_GEN_SOURCE', () => {
      const listener = vi.fn();
      emitter.on('EVENT_PROJECT_GEN_SOURCE', listener);
      const project = new ProjectModel({ name: 'Test' });
      project.genSource();
      expect(listener).toHaveBeenCalled();
    });
  });

  describe('lock/unlock', () => {
    test('lock should set locked id', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.lock('user-1');
      expect(project.locked).toBe('user-1');
    });

    test('unlock should clear locked if matching id', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.lock('user-1');
      project.unlock('user-1');
      expect(project.locked).toBe('');
    });

    test('unlock should not clear if id does not match', () => {
      const project = new ProjectModel({ name: 'Test' });
      project.lock('user-1');
      project.unlock('user-2');
      expect(project.locked).toBe('user-1');
    });
  });

  describe('getPageRoutes', () => {
    test('should generate page routes', async () => {
      const project = new ProjectModel({ name: 'Test', platform: 'web' });
      await project.createPage({
        type: 'page',
        id: 'p1',
        name: 'Home',
        title: 'Home'
      });
      const routes = project.getPageRoutes();
      expect(routes).toHaveLength(1);
      expect(routes[0].path).toBe('/page/p1');
      expect(routes[0].name).toBe('Home');
    });

    test('should use custom page route name', async () => {
      const project = new ProjectModel({ name: 'Test', platform: 'web' });
      await project.createPage({
        type: 'page',
        id: 'p1',
        name: 'Home',
        title: 'Home'
      });
      const routes = project.getPageRoutes('pages', '/app');
      expect(routes[0].path).toBe('/app/pages/p1');
    });

    test('should use pages dir for uniapp', async () => {
      const project = new ProjectModel({ name: 'Test', platform: 'uniapp' });
      await project.createPage({
        type: 'page',
        id: 'p1',
        name: 'Home',
        title: 'Home'
      });
      const routes = project.getPageRoutes();
      expect(routes[0].path).toBe('/pages/p1');
    });
  });

  describe('isPageFile', () => {
    test('should return true for page file', () => {
      const project = new ProjectModel({ name: 'Test' });
      expect(
        project.isPageFile({
          type: 'page',
          id: 'p1',
          name: 'Home',
          title: 'Home'
        })
      ).toBe(true);
      expect(
        project.isPageFile({
          type: 'block',
          id: 'b1',
          name: 'Block',
          title: 'Block'
        })
      ).toBe(false);
    });
  });
});
