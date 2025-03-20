import { ContextMode } from '@vtj/renderer';

export function createModules(mode: ContextMode = ContextMode.Runtime) {
  if (mode === ContextMode.Runtime || process.env.NODE_ENV === 'development') {
    return import.meta.glob([
      '/src/.vtj/projects/*.json',
      '/src/.vtj/files/*.json'
    ]);
  } else {
    return import.meta.glob(['/src/.vtj/projects/*.json']);
  }
}
