import { type DataSourceSchema } from '@vtj/core';
import { isJSFunction } from '../utils';

export function parseDataSources(
  dataSources: Record<string, DataSourceSchema> = {}
) {
  return Object.values(dataSources).map((item) => {
    const transform = isJSFunction(item.transform)
      ? item.transform.value || `(res) => res`
      : `(res) => res`;
    return `async ${item.name}(...args:any[]) {
          return await this.provider.apis.${item.ref}.apply(this, args).then(${transform});
        }`;
  });
}
