import { type App, type Ref, ref, watch } from 'vue';
import { delay, debounce } from '@vtj/utils';
import { type Engine } from './engine';
import {
  VUE_DEVTOOLS_FRAME_STATE_KEY,
  VUE_DEVTOOLS_PATH,
  VUE_DEVTOOLS_OVERLAY_PATH
} from '../constants';

declare global {
  interface Window {
    __VUE_DEVTOOLS_GLOBAL_HOOK__: any;
    __VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__: any;
  }
}

export class DevTools {
  private window?: Window;
  private engine?: Engine;
  private app?: App;
  public isOpen: Ref<boolean> = ref(false);
  public enabled?: boolean;
  private proxyUpdateState: (e: StorageEvent) => void;
  private isInited: boolean = false;
  private proxyLoad: any;
  constructor() {
    localStorage.removeItem(VUE_DEVTOOLS_FRAME_STATE_KEY);
    this.proxyUpdateState = this.updateState.bind(this);
    this.proxyLoad = debounce(this.load, 500);
  }
  private createScript(window: Window, src: string, onload?: () => void) {
    const el = window.document.createElement('script');
    el.type = 'module';
    el.src = src;
    el.onload = () => onload && onload();
    window.document.head.appendChild(el);
  }
  private async loadScripts(window: Window, onload: () => void) {
    const project = this.engine?.project.value;
    const { __BASE_PATH__ = '/' } = project || {};
    const host = '';
    // const host = 'http://localhost:9527';
    const now = Date.now();
    const devtoolsPath = `${host}${__BASE_PATH__}${VUE_DEVTOOLS_PATH}?t=${now}`;
    if (this.enabled === undefined) {
      this.enabled = await this.checkDevtools(devtoolsPath);
    }
    if (!this.enabled) return;
    this.createScript(window, devtoolsPath, () => {
      const overlayPath = `${host}${__BASE_PATH__}${VUE_DEVTOOLS_OVERLAY_PATH}?t=${now}`;
      if (this.isInited) {
        this.createScript(window, overlayPath, onload);
      } else {
        onload();
      }
    });
  }
  async load(window?: Window) {
    if (!this.enabled) return;
    await delay(200);
    if (this.window) {
      this.appUnmount(this.window);
    }
    if (window) {
      this.appInit(window);
    }
    this.isInited = true;
  }
  updateState(e: StorageEvent) {
    if (e.key === VUE_DEVTOOLS_FRAME_STATE_KEY) {
      this.isOpen.value = !!this.getState().open;
    }
  }

  init(window: Window, engine: Engine) {
    if (!this.engine) {
      this.engine = engine;
      const { simulator, changed } = this.engine;
      watch(simulator.rendered, () => {
        // console.log('rendered');
        this.proxyLoad(this.window);
      });
      watch(
        () => changed?.value,
        () => {
          // console.log('changed');
          this.proxyLoad(this.window);
        }
      );
    }
    if (this.window) {
      this.appUnmount(this.window);
      this.window = undefined;
    }
    this.isOpen.value = !!this.getState().open;
    window.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = {};
    this.loadScripts(window, () => {
      this.proxyLoad(window);
      if (this.window) {
        this.window.removeEventListener('storage', this.proxyUpdateState);
      }
      this.window = window;
      this.window.addEventListener('storage', this.proxyUpdateState);
    });
  }

  private async checkDevtools(url: string) {
    return await window
      .fetch(url)
      .then(async (res) => {
        const type = res.headers.get('Content-Type');
        return type === 'text/javascript';
      })
      .catch(() => false);
  }

  appInit(window: Window) {
    const simulator = this.engine?.simulator;
    const devtools = window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
    if (simulator && devtools) {
      const app = simulator.renderer?.app;
      if (!app) return;
      if (!window.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__) {
        window.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = {};
      }
      if (app._uid === 1) {
        // console.log('before app:unmount');
        devtools.emit('app:unmount', app);
      }
      // console.log('app:init');
      devtools.emit('app:init', app, app.version, {});
      this.app = app;
    }
  }

  appUnmount(window: Window) {
    const devtools = window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
    if (devtools && this.app) {
      // console.log('appUnmount');
      devtools.emit('app:unmount', this.app);
      this.app = undefined;
    }
  }

  private getState() {
    let state: Record<string, any> = {};
    try {
      state = JSON.parse(
        localStorage.getItem(VUE_DEVTOOLS_FRAME_STATE_KEY) || '{}'
      );
    } catch (e) {}
    return state;
  }
}
