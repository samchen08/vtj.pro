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
  const sources = import.meta.glob([
    '/src/pages/**/*.vue',
    '/src/components/**/*.vue'
  ]);
  res = { ...res, ...sources };
  let result: Record<string, () => Promise<any>> = {};
  for (const [key, value] of Object.entries(res)) {
    result[key] =
      typeof value === 'function'
        ? (value as () => Promise<any>)
        : () => Promise.resolve(value as any);
  }
  return result;
}
