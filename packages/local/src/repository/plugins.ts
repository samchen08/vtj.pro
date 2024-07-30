import { join } from 'path';
import { type BlockFile } from '@vtj/core';
import {
  pathExistsSync,
  readdirSync,
  readJsonSync,
  upperFirstCamelCase
} from '@vtj/node';
import type { DevToolsOptions } from '../plugin';
export class PluginRepository {
  private deps: string[] = [];
  constructor(
    private pkg: any,
    private opts: DevToolsOptions
  ) {
    const { devDependencies, dependencies } = pkg || {};
    const { presetPlugins } = opts;
    this.deps = Object.keys({ ...devDependencies, ...dependencies }).filter(
      (name) => presetPlugins.some((regex) => name.startsWith(regex))
    );
  }

  getName(dep: string) {
    const { presetPlugins } = this.opts;
    let name = dep;
    for (const regex of presetPlugins) {
      name = name.replace(regex, 'x-');
    }
    return upperFirstCamelCase(name);
  }

  getPlugins() {
    const { vtj = {} } = this.pkg;
    const { pluginNodeModulesDir = 'node_modules', staticBase = '/' } =
      this.opts;
    const plugins: BlockFile[] = (vtj.plugins || []).map((n: BlockFile) => {
      n.type = 'block';
      n.fromType = 'Plugin';
      n.preset = true;
      return n;
    });

    const ext = ['.css', '.js', '.json'];
    for (const dep of this.deps) {
      const dist = join(pluginNodeModulesDir, dep, 'dist');

      if (pathExistsSync(dist)) {
        const pkg = readJsonSync(
          join(pluginNodeModulesDir, dep, 'package.json')
        );
        const files = readdirSync(dist, { recursive: true, encoding: 'utf-8' });
        const urls = files
          .filter((url) => ext.some((n) => url.endsWith(n)))
          .map(
            (url) => `${staticBase}@vtj/plugins/${url.replace(/\\/gi, '/')}`
          );
        const { description } = pkg || '';
        const name = upperFirstCamelCase(dep);
        if (files.length) {
          plugins.push({
            type: 'block',
            fromType: 'Plugin',
            preset: true,
            id: dep,
            name: this.getName(dep),
            title: description || name,
            library: name,
            urls: urls.join(',')
          });
        }
      }
    }
    return plugins;
  }
}
