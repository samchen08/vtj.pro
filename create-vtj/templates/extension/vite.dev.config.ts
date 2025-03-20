import { createViteConfig } from '@vtj/cli';
import { createDevTools } from '@vtj/pro/vite';
// import { name } from './vtj.config';

export default createViteConfig({
  plugins: [
    createDevTools({
      link: false
    })
  ],
  staticDirs: [
    {
      path: '/@vtj/extension/',
      dir: 'dist'
    }
  ],
  alias: {
    // [name]: '/src/library/index.ts'
  }
});
