import {
  type Ref,
  type ShallowRef,
  type App,
  shallowRef,
  watch,
  ref
} from 'vue';
import {
  type Dependencie,
  type Material,
  type ApiSchema,
  type MetaSchema,
  type ProjectConfig,
  type PlatformType,
  type UniConfig,
  type EnhanceConfig,
  Base,
  BUILT_IN_NAME,
  BUILT_IN_LIBRARAY_MAP
} from '@vtj/core';
import {
  parseDeps,
  createAssetsCss,
  createAssetScripts,
  createSchemaApis,
  getRawComponent,
  mockApis,
  mockCleanup,
  parseUrls,
  type Provider
} from '@vtj/renderer';
import html2canvas from 'html2canvas';
import { logger } from '@vtj/utils';
import { Renderer } from './renderer';
import { Designer } from './designer';
import { type Engine } from './engine';
import { DevTools } from './devtools';
import Mock from 'mockjs';

declare global {
  interface Window {
    __simulator__: Simulator;
    Vue?: any;
    VueRouter?: any;
    ElementPlus?: any;
  }
}

export interface SimulatorEnv {
  window: Window;
  Vue: any;
  VueRouter: any;
  library: Record<string, any>;
  materials: Record<string, any>;
  components: Record<string, any>;
  apis: Record<string, any>;
  container: HTMLElement;
  globals: Record<string, any>;
  libraryLocaleMap: Record<string, any>;
  locales: Record<string, any>;
  enhance?: (app: App, provider: Provider) => void;
}

export interface SimulatorOptions {
  engine: Engine;
  materialPath: string;
  enhance?: EnhanceConfig;
}

export class Simulator extends Base {
  public contentWindow: Window | null = null;
  public renderer: Renderer | null = null;
  public designer: ShallowRef<Designer | null> = shallowRef(null);
  public engine: Engine;
  public materialPath: string;
  public rendered: Ref<symbol> = ref(Symbol());
  public devtools: DevTools = new DevTools();
  public enhance?: EnhanceConfig;
  constructor(options: SimulatorOptions) {
    super();
    const { engine, materialPath, enhance } = options;
    this.engine = engine;
    this.materialPath = materialPath;
    this.enhance = enhance;
    (window as any).Mock = Mock;

    watch(this.engine.current, () => {
      this.refresh();
    });
  }

  init(
    iframe: Ref<HTMLIFrameElement | undefined>,
    deps: Ref<Dependencie[]>,
    apis: Ref<ApiSchema[]>,
    meta: Ref<MetaSchema[]>,
    config: Ref<ProjectConfig>,
    uniConfig: Ref<UniConfig>
  ) {
    watch(
      [iframe, deps, apis, meta, config, uniConfig],
      () => {
        if (iframe.value && deps.value.length) {
          this.resetReady();
          this.renderer?.dispose();
          this.renderer = null;
          this.setup(iframe.value, deps.value);
          if (this.contentWindow) {
            this.designer.value?.dispose();
            this.designer.value = new Designer(
              this.engine,
              this.contentWindow,
              deps,
              this.devtools
            );
          }
        }
      },
      { immediate: true, deep: true }
    );
  }

  private createGlobalCss(platform: PlatformType = 'web') {
    return platform === 'uniapp'
      ? ''
      : `
        <style>
          html,
          body,
          #app {
            margin: 0;
            min-height: 100vh;
            width: 100%;
            height: 100%;
            font-size: 14px;
          }
          #app {
            background: var(--el-bg-color, #fff);
            box-sizing: border-box;
          }
          #app.is-page {
             padding: 10px;
          }
            #app.is-page.is-pure {
             background-color: var(--el-fill-color-light, #f5f7fa);
             padding: 0;
          }
         </style>`;
  }
  private initUniFeatures(platform: PlatformType = 'web') {
    return platform === 'uniapp'
      ? ''
      : `
    <script>
      window.__UNI_FEATURE_UNI_CLOUD__ = false;
      window.__UNI_FEATURE_WX__ = false;
      window.__UNI_FEATURE_WXS__ = false;
      window.__UNI_FEATURE_PAGES__ = false;
    </script>
    `;
  }

  private setup(iframe: HTMLIFrameElement, deps: Dependencie[]) {
    const cw = iframe.contentWindow;
    if (!cw) {
      logger.warn('Simulator contentWindow is null');
      return;
    }
    cw.__simulator__ = this;
    const doc = cw.document;
    this.contentWindow = cw;
    const {
      scripts,
      css,
      materials,
      libraryExports,
      materialExports,
      materialMapLibrary,
      libraryLocaleMap
    } = parseDeps(deps, this.materialPath, true);
    const { js: enhanceJs, css: enhanceCss } = parseUrls(
      this.enhance?.urls || []
    );
    const { platform = 'web' } = this.engine.project.value || {};
    doc.open();
    doc.write(`
     <!DOCTYPE html>
     <html lang="zh-CN">
       <head>
       <meta charset="utf-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0,viewport-fit=cover"/>
       ${this.initUniFeatures()}
       ${this.createGlobalCss(platform)}
       ${createAssetsCss([...css, ...enhanceCss])}
       </head>
       <body> 
       </body>
       ${createAssetScripts([...scripts, ...enhanceJs])}
       ${createAssetScripts(materials)}
       <script>
       __simulator__.emitReady(${JSON.stringify(libraryExports)},
        ${JSON.stringify(materialExports)}, 
    ${JSON.stringify(materialMapLibrary)},
    ${JSON.stringify(libraryLocaleMap)}
    );
     </script> 
     </html>
    `);
    doc.close();
  }

  async emitReady(
    libraryExports: string[] = [],
    materialExports: string[] = [],
    materialMapLibrary: Record<string, string> = {},
    libraryLocaleMap: Record<string, string> = {}
  ) {
    this.renderer?.dispose();
    this.renderer = null;
    const cw = this.contentWindow as any;
    const { assets, service, current, provider, project, report } = this.engine;
    const materialMap = provider.materials || {};
    const materials: Material[] = [];
    for (const name of materialExports) {
      const material: Material = materialMap[name]
        ? (await materialMap[name]()).default
        : cw[name];
      materials.push(material);
    }
    assets.load(materials);
    const env = this.createEnv(
      libraryExports,
      materialMapLibrary,
      materials,
      libraryLocaleMap
    );
    this.devtools.init(cw, this.engine);
    this.renderer = new Renderer(
      env,
      service,
      provider,
      report,
      project.value,
      this.designer.value
    );
    if (current.value) {
      this.renderer.render(current.value, project.value?.currentFile);
      this.rendered.value = Symbol();
    }
    this.triggerReady();
  }

  createEnv(
    libraryExports: string[] = [],
    materialMapLibrary: Record<string, string> = {},
    materials: Material[] = [],
    libraryLocaleMap: Record<string, string> = {}
  ): SimulatorEnv {
    const cw = this.contentWindow as any;
    const { engine } = this;
    const { project, assets, provider } = engine;
    const enhance = this.enhance ? cw[this.enhance.name] : undefined;
    const library = libraryExports.reduce((prev, cur) => {
      prev[cur] = cw[cur];
      return prev;
    }, {} as any);

    const locales: Record<string, any> = {};
    Object.entries(libraryLocaleMap).forEach(([k, v]) => {
      locales[k] = cw[v];
    });

    const components: Record<string, any> = {};

    const { groups, componentMap } = assets;

    for (const group of groups.value) {
      const names = group.names || [];
      if (group.name === BUILT_IN_NAME) {
        names.forEach((name) => {
          const desc = componentMap.get(name);
          const packageName = desc?.package || '';
          const exportName = BUILT_IN_LIBRARAY_MAP[packageName];
          const lib = library[exportName];
          if (lib && desc) {
            components[name] = getRawComponent(desc, lib);
          }
        });
      } else {
        const lib = library[materialMapLibrary[group.library || '']];

        if (lib) {
          names.forEach((name) => {
            const desc = componentMap.get(name);
            if (desc) {
              components[name] = getRawComponent(desc, lib);
            } else {
              components[name] = lib[name];
            }
          });
        }
      }
    }
    const { adapter, globals } = provider;
    provider.initMock();
    const apis = createSchemaApis(
      project.value?.apis,
      project.value?.meta,
      adapter
    );
    mockCleanup();
    mockApis(project.value?.apis || []);

    return {
      window: cw,
      Vue: cw.Vue,
      VueRouter: cw.VueRouter,
      library,
      materials,
      components,
      container: cw.document.body,
      apis,
      globals,
      libraryLocaleMap,
      locales,
      enhance
    };
  }

  refresh() {
    const { skeleton } = this.engine;
    const regionRef = skeleton?.getRegion('Workspace')?.regionRef;
    regionRef?.reload();
  }

  capture() {
    return new Promise((resolve, reject) => {
      if (!this.contentWindow) return reject(null);
      const body = this.contentWindow.document.body;
      html2canvas(body, {
        allowTaint: true,
        useCORS: true
      })
        .then((canvas) => {
          resolve(canvas);
        })
        .catch(reject);
    });
  }

  dispose() {
    this.renderer?.dispose();
    this.designer.value?.dispose();
    this.contentWindow = null;
    this.renderer = null;
    this.designer.value = null;
    this.resetReady();
  }
}
