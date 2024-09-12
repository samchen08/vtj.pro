import { type App, type Ref, ref, watch } from 'vue';
import { delay } from '@vtj/utils';
import { type Engine } from './engine';
import { VUE_DEVTOOLS_FRAME_STATE_KEY, VUE_DEVTOOLS_PATH } from '../constants';
export class DevTools {
  private window?: Window;
  private engine?: Engine;
  private app?: App;
  public isOpen: Ref<boolean> = ref(false);
  public enabled: boolean = false;
  constructor() {}
  init(window: Window, engine: Engine) {
    this.window = window;
    this.engine = engine;
    const project = engine.project.value;
    const { __BASE_PATH__ = '/' } = project || {};
    this.appendScript(window, __BASE_PATH__, () => {
      this.isOpen.value = !!this.getState().open;
    });
    this.bindEvents();
  }
  private async appendScript(window: Window, basePath: string, onload?: any) {
    const doc = window.document;
    if (!doc) return;
    const src = this.createVueDevToolsScript(basePath);
    if (!src) return;
    this.enabled = await this.checkDevtools(src);
    if (!this.enabled) return;
    const el = doc.createElement('script');
    el.type = 'module';
    el.src = src;
    el.onload = onload;
    doc.head.appendChild(el);
  }

  private createVueDevToolsScript(basePath: string = '/') {
    // const host = 'http://localhost:9527';
    const host = '';
    return `${host}${basePath}${VUE_DEVTOOLS_PATH}`;
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

  private bindEvents() {
    const { simulator, changed, current } = this.engine || {};
    if (!simulator) return;
    watch(simulator.rendered, () => {
      this.reload();
    });

    watch(
      () => changed?.value,
      () => {
        this.reload();
      }
    );
    watch(
      () => current?.value,
      () => {
        this.reload();
      }
    );

    this.window?.addEventListener('storage', (e) => {
      if (e.key === VUE_DEVTOOLS_FRAME_STATE_KEY) {
        this.isOpen.value = !!this.getState().open;
      }
    });
  }

  public async reload() {
    if (!this.enabled) return;
    await delay(200);
    const win = this.window as any;
    const simulator = this.engine?.simulator;
    if (!win || !simulator) return;
    const devtools = win.__VUE_DEVTOOLS_GLOBAL_HOOK__;

    if (devtools) {
      devtools.enabled = true;
      if (this.app) {
        devtools.emit('app:unmount', this.app);
      }
      this.app = simulator.renderer?.app as App;
      if (this.app) {
        devtools.emit('app:init', this.app, this.app.version, {});
      }
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

  public setup(window: Window, app: App, basePath: string = '/') {
    const win = window as any;
    this.appendScript(win, basePath, () => {
      const devtools = win.__VUE_DEVTOOLS_GLOBAL_HOOK__;
      if (devtools && app) {
        devtools.enabled = true;
        devtools.emit('app:init', app);
      }
    });
  }
}
