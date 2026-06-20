export { version as VTJ_CODER_VERSION } from './version';
export * from './generator';
export { tsFormatter, cssFormatter, vueFormatter } from './formatters';

// Global API mapping for cross-package alignment
export {
  GLOBAL_API_MAP,
  UI_GLOBAL_API_MAPS,
  UI_PACKAGES,
  detectUIPackage,
  buildEffectiveApiMap,
  type GlobalApiConfig
} from './parser/composition/globalApi';
