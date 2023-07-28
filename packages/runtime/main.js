export * from './lib/index';
export const modules =
  process.env.NODE_ENV === 'development'
    ? import.meta.glob([
        '/.vtj/project/*.json',
        '/.vtj/file/*.json',
        '/src/views/pages/*.vue',
        '/src/components/blocks/*.vue'
      ])
    : import.meta.glob([
        '/.vtj/project/*.json',
        '/src/views/pages/*.vue',
        '/src/components/blocks/*.vue'
      ]);

window.__VTJ_MODULES__ = modules;
