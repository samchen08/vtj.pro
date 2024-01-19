import { type Plugin, type ResolvedConfig } from 'vite';
import { copySync, emptyDirSync } from '@vtj/node';
import { resolve } from 'path';
export interface CopyPluginOption {
  from: string;
  to: string;
  emptyDir?: boolean;
}
export const copyPlugin = function (options: CopyPluginOption[] = []): Plugin {
  let config: ResolvedConfig;
  return {
    name: 'vtj-copy-plugin',
    apply: 'build',
    configResolved(resolvedConfig: ResolvedConfig) {
      config = resolvedConfig;
    },
    closeBundle() {
      const outDir = config.build.outDir;
      for (const { from, to, emptyDir = false } of options) {
        if (emptyDir) {
          emptyDirSync(resolve(outDir, to));
        }
        copySync(resolve(from), resolve(outDir, to));
      }
    }
  };
};
