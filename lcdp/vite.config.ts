import { createViteConfig } from '@vtj/cli';
import { createDevTools } from '@vtj/pro/vite';

export default createViteConfig({
  base: './',
  visualizer: false,
  elementPlus: true,
  plugins: [
    createDevTools({
      devMode: true,
      packagesDir: '../packages',
      link: './link.js',
      linkOptions: {
        entry: '/index.html',
        href: './designer/#/',
        serveOnly: false
      }
      // staticBase: '/designer/'
    })
  ],
  pages: {
    app: 'index.html',
    designer: 'designer/index.html',
    yx: 'yx.html'
  }
});
