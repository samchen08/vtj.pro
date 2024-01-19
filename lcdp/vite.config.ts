import { createViteConfig } from '@vtj/cli';
import { createDevPlugin } from '@vtj/pro/vite';

export default createViteConfig({
  base: './',
  visualizer: false,
  plugins: [
    createDevPlugin({
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
    designer: 'designer/index.html'
  }
});
