import { defineBuildConfig } from 'unbuild';

// export default defineBuildConfig([
//   {
//     entries: ['src/index'],
//     declaration: true,
//     clean: true,
//     failOnWarn: false,
//     rollup: {
//       emitCJS: true,
//       esbuild: {
//         // minify: true
//       }
//     },
//     externals: [
//       'path',
//       '@vtj/cli',
//       '@vtj/core',
//       '@vtj/node',
//       'serve-static',
//       'body-parser'
//     ]
//   }
// ]);

export default defineBuildConfig([
  {
    // entries: [
    //   {
    //     builder: 'mkdist',
    //     input: 'src',
    //     outDir: 'dist',
    //   }
    // ],
    entries: ['src/index'],
    declaration: true,
    clean: true,
    failOnWarn: false,
    rollup: {
      emitCJS: true
    },
    externals: [
      'vite',
      'path',
      '@vtj/cli',
      '@vtj/core',
      '@vtj/node',
      'serve-static',
      'body-parser',
      'fs',
      'sass',
      'esbuild'
    ]
  }
]);
