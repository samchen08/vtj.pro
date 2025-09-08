import { ContextMode } from '@vtj/renderer';

export function createModules(mode: ContextMode = ContextMode.Runtime) {
  let res: Record<string, unknown> = {};
  if (mode === ContextMode.Runtime || process.env.NODE_ENV === 'development') {
    res = import.meta.glob(
      ['/src/.vtj/projects/*.json', '/src/.vtj/files/*.json'],
      { eager: true }
    );
  } else {
    res = import.meta.glob(['/src/.vtj/projects/*.json'], { eager: true });
  }
  let result: Record<string, () => Promise<any>> = {};
  for (const [key, value] of Object.entries(res)) {
    result[key] = () => Promise.resolve(value as any);
  }
  return result;
}
