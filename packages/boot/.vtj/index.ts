/// <reference types="vite/client" />
const modules = import.meta.glob(['/.vtj/project/*.json', '/.vtj/file/*.json']);
export default {
  modules,
  service: 'file',
  raw: false,
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
