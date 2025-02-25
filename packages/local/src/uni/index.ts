import type { ProjectSchema, JSFunction } from '@vtj/core';
import { manifestJson as defaultManifestJson } from './manifest';
import { pagesJson as defaultPagesJson } from './pages';
import { resolve } from 'path';
import { readJsonSync, pathExistsSync, fs, camelCase } from '@vtj/node';
import { parseUniApp } from '@vtj/parser';
import { tsFormatter } from '@vtj/coder';

function isJSFunction(x: any): x is JSFunction {
  return typeof x === 'object' && x && x.type === 'JSFunction';
}

function getJson(name: string, dsl: ProjectSchema) {
  const map: Record<string, string> = {
    manifestJson: 'manifest.json',
    pagesJson: 'pages.json'
  };
  const defaults: Record<string, any> = {
    manifestJson: defaultManifestJson,
    pagesJson: defaultPagesJson
  };
  const file = map[name];
  const filePath = resolve('./src', file);
  if (pathExistsSync(filePath)) {
    return readJsonSync(filePath);
  }
  const uniConfig: Record<string, any> = dsl.uniConfig || {};
  return uniConfig[name] || defaults[name];
}

function getApp(dsl: ProjectSchema) {
  const filePath = resolve('./src/App.vue');
  if (pathExistsSync(filePath)) {
    const source = fs.readFileSync(filePath, 'utf-8');
    return parseUniApp(source);
  }
  return dsl.uniConfig || {};
}

async function formatUniConfigCode(uniConfig: Record<string, any>) {
  for (const [name, value] of Object.entries(uniConfig)) {
    if (isJSFunction(value)) {
      const code = uniConfig[name].value;
      uniConfig[name].value = await tsFormatter(code);
    }
  }
  return uniConfig;
}

export async function getUniConfig(dsl: ProjectSchema) {
  const manifestJson: Record<string, any> = getJson('manifestJson', dsl);
  const pagesJson: Record<string, any> = getJson('pagesJson', dsl);
  const lifeCycle = getApp(dsl);
  const { name, id, description } = dsl;

  const appId = camelCase(id?.replace(/\//, '__')).toUpperCase();
  Object.assign(manifestJson, {
    name: name,
    appid: appId.startsWith('__UNI__') ? appId : `__UNI__${appId}`,
    description: description
  });
  return {
    ...dsl.uniConfig,
    ...(await formatUniConfigCode(lifeCycle)),
    manifestJson,
    pagesJson
  };
}
