import { createViteConfig } from '@vtj/cli';
import { createDevTools } from '@vtj/pro/vite';

export default createViteConfig({
  plugins: [createDevTools()]
});
