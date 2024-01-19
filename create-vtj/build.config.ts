import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true
  },
  outDir: 'dist',
  stub: false,
  alias: {
    // we can always use non-transpiled code since we support 14.18.0+
    prompts: 'prompts/lib/index.js'
  }
});
