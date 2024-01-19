import { createViteConfig } from '@vtj/cli';
import { createDevPlugin } from '@vtj/pro/vite';

export default createViteConfig({
  visualizer: false,
  plugins: [
    createDevPlugin({
      devMode: false
    })
  ]
});
