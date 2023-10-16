import { watch, WatchStopHandle, ShallowReactive, Ref, ref } from 'vue';
import { Renderer } from './Renderer';
import { Assets } from './Assets';
import { Service } from './services';
import {
  EVENT_SIMULATOR_OPEN,
  EVENT_SIMULATOR_READY,
  EVENT_ASSETS_LOADED,
  EVENT_HISTORY_SAVE,
  EVENT_HISTORY_CHANGE,
  emitter
} from './emitter';
import { VUE } from '../constants';

import {
  isJSUrl,
  isCSSUrl,
  createAssetsCss,
  createAssetScripts,
  createApiHandler
} from '../utils';

import { DataSourceHandler, HistoryItemSchema } from './types';

import { Project, History, Block } from '../models';

export interface IContentWindow extends Window {
  __simulator__?: Simulator;
}

export interface SimulatorOptions {
  project: ShallowReactive<Project>;
  assets: Assets;
  service: Service;
  globals: Record<string, any>;
}

export interface SimulatorEnv {
  window: IContentWindow;
  Vue: any;
  libs: Record<string, any>;
  components: Record<string, any>;
  apis: Record<string, any>;
  container: HTMLElement;
  globals: Record<string, any>;
}

export class Simulator {
  private unwatches: WatchStopHandle[] = [];
  private iframe: HTMLIFrameElement | null = null;
  public contentWindow: IContentWindow | null = null;
  public project: ShallowReactive<Project>;
  public renderer: Renderer | null = null;
  public assets: Assets;
  public service: Service;
  public globals: Record<string, any>;
  public history: Ref<History | null> = ref(null);
  public isReady: boolean = false;
  constructor(options: SimulatorOptions) {
    const { project, assets, service, globals } = options;
    this.project = project;
    this.assets = assets;
    this.service = service;
    this.globals = globals;
    emitter.on(EVENT_ASSETS_LOADED, () => this.open());
    emitter.on(EVENT_HISTORY_SAVE, (dsl: any) => this.service.saveHistory(dsl));
    emitter.on(EVENT_HISTORY_CHANGE, (item: any) => {
      const block = project.current.value;
      if (block) {
        block.init(item.block);
        this.renderer?.render(block);
      }
    });
    this.unwatches.push(
      watch(project.current, async (v) => {
        if (v) {
          await this.loadHistory(v);
          this.renderer?.render(v);
        } else {
          this.history.value = null;
          this.renderer?.dispose();
        }
      })
    );
  }
  async loadHistory(block: Block) {
    const items = await this.service.getHistory(block.id);
    this.history.value = new History({
      history: {
        blockId: block.id,
        items
      }
    });
  }

  init(iframe: Ref<HTMLIFrameElement | undefined>) {
    watch(iframe, (v) => {
      if (v) {
        this.iframe = v;
        if (this.assets.isReady) {
          this.open();
        }
      }
    });
  }
  private open() {
    if (!this.iframe) return;
    this.isReady = false;
    this.contentWindow = this.iframe.contentWindow as Window;
    this.contentWindow.__simulator__ = this;
    const doc = this.contentWindow.document;
    emitter.emit(EVENT_SIMULATOR_OPEN, doc);
    const { scripts, css } = this.parseDependencies();

    doc.open();
    doc.write(`
     <!DOCTYPE html>
     <html lang="zh-CN">
       <head>
       <meta charset="utf-8">
       <meta name="viewport"
             content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0,viewport-fit=cover"/>
         <style>
            html, body, #app {
              background: #fff;
              padding: 0;
              margin: 0;
              min-height: 100vh;
              width: 100%;
              height: 100%;
              font-size:12px;
            }
         </style>
         ${createAssetsCss(css)}
         ${createAssetScripts(scripts)}
       </head>
       <body> 
       </body>
       <script>
       __simulator__.ready();
     </script> 
     </html>
    `);
    doc.close();
  }

  private parseDependencies() {
    const packages = this.project.dependencies.value.filter((n) => n.enabled);
    const scripts: string[] = [];
    const css: string[] = [];
    packages.forEach(({ urls }) => {
      urls?.forEach((url) => {
        if (isJSUrl(url)) {
          scripts.push(url);
        }
        if (isCSSUrl(url)) {
          css.push(url);
        }
      });
    });
    return {
      scripts,
      css
    };
  }

  private parseApis() {
    const apis = this.project.apis.value;
    return apis.reduce(
      (res, current) => {
        res[current.name] = createApiHandler(current);
        return res;
      },
      {} as Record<string, DataSourceHandler>
    );
  }

  private createEnv() {
    const { contentWindow, assets, globals } = this;
    const packages = this.project.dependencies.value;
    const componentGroups = assets.componentGroups;
    const env: SimulatorEnv = {
      window: contentWindow,
      Vue: null,
      libs: {},
      components: {},
      apis: this.parseApis(),
      container: contentWindow?.document.body,
      globals
    } as SimulatorEnv;
    packages
      .filter((n) => !!n.enabled)
      .forEach(({ library }) => {
        const lib = (contentWindow as any)[library];
        if (lib) {
          env.libs[library] = lib;
          if (library === VUE) {
            env[VUE] = lib;
          }
          const group = componentGroups.find((n) => n.library === library);

          const names = group?.names || [];
          names.forEach((name) => {
            const desc = assets.componentMap[name];
            if (desc) {
              env.components[name] = desc.parent
                ? lib[desc.parent]?.[desc.alias || name]
                : lib[desc.alias || name];
            } else {
              env.components[name] = lib[name];
            }
          });
        }
      });

    return env;
  }

  ready() {
    this.isReady = true;
    this.renderer?.dispose();
    this.renderer = null;
    const file = this.project.current.value;
    const env = this.createEnv();
    this.renderer = new Renderer(env, this.service, this.history);
    if (file) {
      this.renderer.render(file);
    }
    emitter.emit(EVENT_SIMULATOR_READY, this.contentWindow?.document);
  }
  dispose() {
    this.renderer?.dispose();
    this.contentWindow = null;
    this.iframe = null;
    this.renderer = null;
    this.history.value = null;
    this.unwatches.forEach((unwatch) => unwatch());
    emitter.off(EVENT_ASSETS_LOADED);
    emitter.off(EVENT_HISTORY_SAVE);
    emitter.off(EVENT_HISTORY_CHANGE);
  }
}
