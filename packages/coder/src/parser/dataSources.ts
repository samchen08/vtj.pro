import { type DataSourceSchema } from '@vtj/core';
import { isJSFunction } from '../utils';

export function parseDataSources(
  dataSources: Record<string, DataSourceSchema> = {}
) {
  return Object.values(dataSources).map((item) => {
    if (item.type === 'mock') {
      const mockTemplate = isJSFunction(item.mockTemplate)
        ? item.mockTemplate.value || `(params) => ({})`
        : `(params) => ({})`;
      return `async ${item.name}(...args:any[]) {
        const mock = this.provider.createMock(${mockTemplate})
        return await mock.apply(this, args);
      }`;
    } else {
      const transform = isJSFunction(item.transform)
        ? item.transform.value || `(res) => res`
        : `(res) => res`;
      return `async ${item.name}(...args:any[]) {
          return await this.provider.apis['${item.ref}'].apply(this, args).then(${transform});
        }`;
    }
  });
}
