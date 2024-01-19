import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig([
  {
    entries: [
      {
        builder: 'mkdist',
        input: 'src',
        outDir: 'dist'
      }
    ],
    declaration: true,
    clean: true,
    failOnWarn: false,
    rollup: {
      emitCJS: false
    },
    externals: [
      'path',
      '@vtj/cli',
      '@vtj/core',
      '@vtj/node',
      'serve-static',
      'body-parser'
    ]
  }
]);
