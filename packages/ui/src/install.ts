import {  makeInstaller } from './index';
import { components } from './list';
const { install } = makeInstaller(components);
export { install };
export * from './index';
