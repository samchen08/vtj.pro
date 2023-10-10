/// <reference types="vite/client" />
const modules = import.meta.glob([
  '/.vtj/project/*.json',
  '/.vtj/file/*.json',
  '/src/views/pages/*.vue',
  '/src/components/blocks/*.vue'
]);
export default {
  modules,
  service: 'file',
  raw: true,
  isProd: process.env.NODE_ENV === 'production',
  project: {
    id: 'boot',
    name: '示例项目',
    base: '/',
    mode: 'hash',
    page: '/page',
    preview: '/preview',
    home: '/'
  },
  ide: { path: '/ide/' }
};
