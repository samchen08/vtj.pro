import { defineConfig, type Plugin } from 'vite';
import { createViteConfig } from '@vtj/cli';
import uni from '@dcloudio/vite-plugin-uni';

export default process.env.PREVIEW
  ? createViteConfig({
      outDir: 'dist/build/h5'
    })
  : defineConfig({
      plugins: [uni() as Plugin[]]
    });
