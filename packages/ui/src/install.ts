import { components, makeInstaller } from './index';
const { install } = makeInstaller(components);
export { install };
export * from './index';
