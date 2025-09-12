import {
  ProjectModel,
  BlockModel,
  type ProjectSchema,
  type BlockSchema,
  type HistorySchema,
  type HistoryItem,
  type MaterialDescription,
  type PageFile,
  type BlockFile,
  type PlatformType,
  type VTJConfig,
  type EnhanceConfig
} from '@vtj/core';
import { resolve } from 'path';
import {
  readJsonSync,
  upperFirstCamelCase,
  timestamp,
  uuid,
  readdirSync,
  pathExistsSync,
  uid
} from '@vtj/node';
import { generator, createEmptyPage } from '@vtj/coder';
import { parseVue as vue2Dsl, type IParseVueOptions } from '@vtj/parser';
import formidable from 'formidable';
import { fail, success, type ApiRequest } from './shared';
import {
  JsonRepository,
  VueRepository,
  StaticRepository,
  PluginRepository,
  UniRepository,
  type StaticRepositoryOptions
} from './repository';
import type { DevToolsOptions } from './plugin';
import { getUniConfig } from './uni';
import { webPageJson, h5PageJson, uniappPageJson } from './launch/index';

let isInit = false;
let _platform: PlatformType = 'web';

export async function notMatch(_req: ApiRequest) {
  return fail('找不到处理程序');
}

export async function saveLogs(e: any, opts: DevToolsOptions) {
  const name = `error-${timestamp()}`;
  const logs = new JsonRepository({
    platform: _platform,
    dir: opts.vtjDir,
    category: 'logs'
  });
  const json = JSON.parse(JSON.stringify(e));
  return logs.save(name, json);
}

export async function getExtension(_body: any, opts: DevToolsOptions) {
  const root = resolve('./');
  const pkg = readJsonSync(resolve(root, 'package.json'));
  const { name = 'VTJEnhance', outDir = 'enhance' } =
    typeof opts.enhance === 'boolean' ? {} : opts.enhance || {};
  const outputDir = `${opts.nodeModulesDir}/${opts.packageName}/dist/${outDir}`;

  const enhance: EnhanceConfig = {
    name: name,
    urls: []
  };

  const enhanceDir = resolve(root, outputDir);
  if (pathExistsSync(enhanceDir)) {
    const files = readdirSync(enhanceDir) || [];
    enhance.urls = files.map((n) => `${outDir}/${n}`);
  }

  const { vtj = {} } = pkg || {};

  const __ACCESS__ = {
    auth: 'https://lcdp.vtj.pro/login',
    storageKey: 'RRO_IDE_ACCESS_STORAGE__',
    privateKey:
      'MIIBOgIBAAJBAKoIzmn1FYQ1YOhOBw9EhABxZ+PySAIaydI+zdhoKflrdgJ4A5E4/5gbQmRpk09hPWG8nvX7h+l/QLU8kXxAIBECAwEAAQJAAlgpxQY6sByLsXqzJcthC8LSGsLf2JEJkHwlnpwFqlEV8UCkoINpuZ2Wzl+aftURu5rIfAzRCQBvHmeOTW9/zQIhAO5ufWDmnSLyfAAsNo5JRNpVuLFCFodR8Xm+ulDlosR/AiEAtpAltyP9wmCABKG/v/hrtTr3mcvFNGCjoGa9bUAok28CIHbrVs9w1ijrBlvTsXYwJw46uP539uKRRT4ymZzlm9QjAiB+1KH/G9f9pEEL9rtaSOG7JF5D0JcOjlze4MGVFs+ZrQIhALKOUFBNr2zEsyJIjw2PlvEucdlG77UniszjXTROHSPd'
  };

  const config: VTJConfig = {
    remote: 'https://lcdp.vtj.pro',
    enhance,
    ...vtj,
    history: vtj.history || 'hash',
    base: vtj.base || '/',
    pageRouteName:
      vtj.pageRouteName || (vtj.platform === 'uniapp' ? 'pages' : 'page'),
    __BASE_PATH__: opts.staticBase,
    __ACCESS__: Object.assign(__ACCESS__, vtj.__ACCESS__ || {})
  };

  return success(config);
}

export async function init(body: any, opts: DevToolsOptions) {
  const root = resolve('./');
  const pkg = readJsonSync(resolve(root, 'package.json'));
  const pluginPepository = new PluginRepository(pkg, opts);
  // 从项目的 package.json 中读取项目信息
  const { vtj = {} } = pkg || {};
  const id = vtj.id || pkg.name;
  const name = vtj.name || pkg.description || upperFirstCamelCase(id);
  const description = vtj.description || pkg.description || '';
  const platform = vtj.platform || 'web';
  const dependencies = body?.data?.dependencies || [];
  _platform = platform;
  const repository = new JsonRepository({
    platform: _platform,
    dir: opts.vtjDir,
    category: 'projects'
  });
  // 如果项目文件已经存在，则直接返回文件内容
  let dsl: ProjectSchema = repository.get(id);
  const plugins = pluginPepository.getPlugins();
  if (dsl) {
    const blocks = (dsl.blocks || []).filter((n) => !n.preset);
    dsl.blocks = plugins.concat(blocks);
    Object.assign(dsl, { id, name, description, platform });
    if (platform === 'uniapp') {
      dsl.uniConfig = await getUniConfig(dsl);
    }

    if (dsl.dependencies?.length === 0 && dependencies.length > 0) {
      dsl.dependencies = dependencies;
      repository.save(id, dsl);
    }

    if (!isInit) {
      isInit = true;
      repository.save(id, dsl);
    }

    dsl.__BASE_PATH__ = opts.staticBase;
    if (!dsl.__UID__) {
      dsl.__UID__ = uuid(true);
    }
    return success(dsl);
  } else {
    const launchPage: PageFile = {
      id: uid(),
      dir: false,
      layout: false,
      name: 'LaunchPage',
      title: '启动页',
      icon: '',
      mask: false,
      hidden: false,
      raw: false,
      pure: true,
      cache: false,
      needLogin: false,
      style:
        platform === 'uniapp'
          ? {
              navigationStyle: 'custom'
            }
          : {},
      type: 'page'
    };
    const model = new ProjectModel({
      id,
      name,
      description,
      platform,
      dependencies,
      blocks: plugins,
      pages: [launchPage],
      homepage: launchPage.id
    });
    dsl = model.toDsl();
    if (platform === 'uniapp') {
      dsl.uniConfig = await getUniConfig(dsl);
    }
    repository.save(id, dsl);
    dsl.__BASE_PATH__ = opts.staticBase;

    let page;
    if (platform === 'web') {
      page = new BlockModel(
        Object.assign(webPageJson, { id: launchPage.id, name: launchPage.name })
      );
    }
    if (platform === 'h5') {
      page = new BlockModel(
        Object.assign(h5PageJson, { id: launchPage.id, name: launchPage.name })
      );
    }
    if (platform === 'uniapp') {
      page = new BlockModel(
        Object.assign(uniappPageJson, {
          id: launchPage.id,
          name: launchPage.name
        })
      );
    }

    if (page) {
      await saveFile(page.toDsl(), opts);
    }

    return success(dsl);
  }
}

export async function saveProject(
  dsl: ProjectSchema,
  type: string,
  opts: DevToolsOptions
) {
  const repository = new JsonRepository({
    platform: dsl.platform || 'web',
    dir: opts.vtjDir,
    category: 'projects'
  });
  if (repository.exist(dsl.id as string)) {
    const ret = repository.save(dsl.id as string, dsl);
    if (dsl.platform === 'uniapp') {
      await genUniConfig(dsl, type === 'delete');
    }
    return success(ret);
  } else {
    return fail('项目文件不存在');
  }
}

export async function saveFile(dsl: BlockSchema, opts: DevToolsOptions) {
  const repository = new JsonRepository({
    platform: _platform,
    dir: opts.vtjDir,
    category: 'files'
  });
  const ret = repository.save(dsl.id as string, dsl);
  return success(ret);
}

export async function getFile(id: string, opts: DevToolsOptions) {
  const repository = new JsonRepository({
    platform: _platform,
    dir: opts.vtjDir,
    category: 'files'
  });
  const json = repository.get(id);
  if (json) {
    return success(json);
  } else {
    return fail('文件不存在');
  }
}

export async function removeFile(id: string, opts: DevToolsOptions) {
  const repository = new JsonRepository({
    platform: _platform,
    dir: opts.vtjDir,
    category: 'files'
  });
  const ret = repository.remove(id);
  return success(ret);
}

export async function getHistory(id: string, opts: DevToolsOptions) {
  const repository = new JsonRepository({
    platform: _platform,
    dir: opts.vtjDir,
    category: 'histories'
  });
  const json = repository.get(id);
  if (json) {
    return success(json);
  } else {
    return success({});
  }
}

export async function saveHistory(file: HistorySchema, opts: DevToolsOptions) {
  const repository = new JsonRepository({
    platform: _platform,
    dir: opts.vtjDir,
    category: 'histories'
  });
  const ret = repository.save(file.id as string, file);
  return success(ret);
}

export async function removeHistory(id: string, opts: DevToolsOptions) {
  const repository = new JsonRepository({
    platform: _platform,
    dir: opts.vtjDir,
    category: 'histories'
  });
  const items = new JsonRepository({
    platform: _platform,
    dir: opts.vtjDir,
    category: `histories/${id}`
  });

  items.clear();
  repository.remove(id);
  return success(true);
}

export async function getHistoryItem(
  fId: string,
  id: string,
  opts: DevToolsOptions
) {
  const repository = new JsonRepository({
    platform: _platform,
    dir: opts.vtjDir,
    category: `histories/${fId}`
  });

  const json = repository.get(id);
  if (json) {
    return success(json);
  } else {
    return fail('文件不存在');
  }
}

export async function saveHistoryItem(
  fId: string,
  item: HistoryItem,
  opts: DevToolsOptions
) {
  const repository = new JsonRepository({
    platform: _platform,
    dir: opts.vtjDir,
    category: `histories/${fId}`
  });
  repository.save(item.id, item);
  return success(true);
}

export async function removeHistoryItem(
  fId: string,
  ids: string[],
  opts: DevToolsOptions
) {
  const repository = new JsonRepository({
    platform: _platform,
    dir: opts.vtjDir,
    category: `histories/${fId}`
  });

  ids.forEach((id: string) => {
    repository.remove(id);
  });

  return success(true);
}

export async function saveMaterials(
  project: ProjectSchema,
  materials: Record<string, MaterialDescription>,
  opts: DevToolsOptions
) {
  const repository = new JsonRepository({
    platform: _platform,
    dir: opts.vtjDir,
    category: 'materials'
  });
  repository.save(project.id as string, materials);
  return success(true);
}

export async function publishFile(
  project: ProjectSchema,
  file: PageFile | BlockFile,
  componentMap: Map<string, MaterialDescription> | undefined,
  opts: DevToolsOptions
) {
  const materialsRepository = new JsonRepository({
    platform: _platform,
    dir: opts.vtjDir,
    category: 'materials'
  });
  const materials = materialsRepository.get(project.id as string);
  componentMap =
    componentMap ||
    new Map<string, MaterialDescription>(Object.entries(materials || {}));

  const fileRepository = new JsonRepository({
    platform: project.platform || _platform,
    dir: opts.vtjDir,
    category: 'files'
  });
  const dsl = fileRepository.get(file.id as string);
  if (dsl) {
    const content = await generator(
      dsl,
      componentMap,
      project.dependencies,
      project.platform
    ).catch((e) => {
      try {
        saveLogs(
          {
            dsl: dsl,
            componentMap,
            dependencies: project.dependencies,
            message: e.message,
            stack: e.stack
          },
          opts
        );
      } catch (e) {}
      throw e;
    });
    const vueRepository = new VueRepository({
      platform: _platform,
      dir: opts.vtjRawDir
    });
    vueRepository.save(file.id as string, content);
    return success(true);
  } else {
    return fail('文件不存在');
  }
}

export async function publish(project: ProjectSchema, opts: DevToolsOptions) {
  const { pages = [], blocks = [] } = project;
  const materialsRepository = new JsonRepository({
    platform: project.platform || _platform,
    dir: opts.vtjDir,
    category: 'materials'
  });

  const materials = materialsRepository.get(project.id as string);
  const componentMap = new Map<string, MaterialDescription>(
    Object.entries(materials)
  );

  for (const block of blocks) {
    if (!block.fromType || block.fromType === 'Schema') {
      await publishFile(project, block, componentMap, opts);
    }
  }
  for (const page of pages) {
    if (!page.raw) {
      await publishFile(project, page, componentMap, opts);
    }
  }
  if (project.platform === 'uniapp') {
    await genUniConfig(project, true);
  }

  return success(true);
}

export async function genUniConfig(
  project: ProjectSchema,
  injectPages: boolean = false
) {
  const uniRepository = new UniRepository();
  uniRepository.saveManifestJson(project);
  if (injectPages) {
    uniRepository.savePagesJson(project);
  }
  await uniRepository.saveApp(project);
  return success(true);
}

export async function genVueContent(
  project: ProjectSchema,
  dsl: BlockSchema,
  opts: DevToolsOptions
) {
  const materialsRepository = new JsonRepository({
    platform: project.platform || _platform,
    dir: opts.vtjDir,
    category: 'materials'
  });
  const materials = materialsRepository.get(project.id as string);
  const componentMap = new Map<string, MaterialDescription>(
    Object.entries(materials || {})
  );

  const content = await generator(
    dsl,
    componentMap,
    project.dependencies,
    project.platform
  ).catch((e) => {
    throw e;
  });
  return success(content);
}

export async function parseVue(options: IParseVueOptions) {
  let errors: any = null;
  const dsl = await vue2Dsl(options).catch((e: any) => {
    errors = e;
    return null;
  });
  return success(errors ? errors : dsl);
}

export async function createRawPage(file: PageFile, opts: DevToolsOptions) {
  const repository = new VueRepository({
    platform: _platform,
    dir: opts.vtjRawDir
  });

  const page = await createEmptyPage(file);
  repository.save(file.id as string, page);
  return success(true);
}

export async function removeRawPage(id: string, opts: DevToolsOptions) {
  const repository = new VueRepository({
    platform: _platform,
    dir: opts.vtjRawDir
  });
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
