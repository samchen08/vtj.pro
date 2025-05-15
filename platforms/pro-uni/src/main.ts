import {
  createProvider,
  LocalService,
  NodeEnv,
  ContextMode,
  createAdapter,
  createServiceRequest,
  parseFunction,
  setupUniApp,
  createUniAppComponent,
  createUniRoutes,
  notify,
  loading,
  createModules,
  loadEnhance,
  type Provider,
  type VTJConfig,
  type EnhanceConfig
} from '@vtj/uni-app';

const adapter = createAdapter({ loading, notify });
const service = new LocalService(createServiceRequest(notify));
const modules = createModules();
const { provider, onReady } = createProvider({
  nodeEnv: process.env.NODE_ENV as NodeEnv,
  mode: ContextMode.Runtime,
  modules,
  materialPath: '../',
  adapter,
  service,
  dependencies: {
    Vue: () => import('vue'),
    VueRouter: () => import('vue-router')
  }
});

const init = async (provider: Provider) => {
  const config: VTJConfig =
    (await service.getExtension().catch(() => null)) || {};
  const win = (top || window) as Window;
  const enhance = await loadEnhance(
    config.enhance as EnhanceConfig,
    win.location.pathname
  );
  const { Vue, UniH5 } = window as any;
  const project = provider.project;
  if (!project) return;

  const uniConfig = project.uniConfig || {};
  const App = createUniAppComponent(uniConfig, (script) =>
    parseFunction(script, window, false, true)
  );
  const { manifestJson, pagesJson, css } = uniConfig;
  const routes = await createUniRoutes(provider, true);
  const app = setupUniApp({
    Vue,
    App,
    UniH5,
    routes,
    css,
    manifestJson,
    pagesJson
  });

  app.use(provider);
  if (enhance) {
    app.use(enhance, provider);
  }
  app.mount(document.body);
};

onReady(() => init(provider));
