import { createViteConfig } from '@vtj/cli';
import { createDevTools } from '@vtj/pro/vite';

export default createViteConfig({
  visualizer: false,
  plugins: [
    createDevTools({
      devMode: true
    })
  ]
});
