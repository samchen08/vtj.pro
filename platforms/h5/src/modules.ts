import { ContextMode } from './renderer';


export function createModules(mode: ContextMode = ContextMode.Runtime) {
  if (mode === ContextMode.Runtime || process.env.NODE_ENV === 'development') {
    return import.meta.glob([
      '/.vtj/projects/*.json',
      '/.vtj/files/*.json',
      '/.vtj/vue/*.vue'
    ]);
  } else {
    return import.meta.glob(['/.vtj/projects/*.json', '/.vtj/vue/*.vue']);
  }
}
