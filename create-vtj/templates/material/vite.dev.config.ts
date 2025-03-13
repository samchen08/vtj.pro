import { createViteConfig } from '@vtj/cli';
import { createDevTools } from '@vtj/pro/vite';
import { name } from './vtj.config';

export default createViteConfig({
  plugins: [
    createDevTools({
      link: false
    })
  ],
  staticDirs: ['dist'],
  alias: {
    [name]: '/src/library/index.ts'
  }
});
