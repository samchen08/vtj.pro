import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index'],
  externals: [
    'vite',
    'prettier',
    'prettier/parser-html',
    'prettier/parser-babel',
    'prettier/parser-postcss',
    '@vtj/utils'
  ],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true
  },
  outDir: 'lib'
});
