import { type BlockProp, type BlockPropDataType } from '@vtj/core';
import { toArray } from '@vtj/base';
import { parseValue } from '../utils';

export function parseProps(props: Array<string | BlockProp> = []) {
  const toTypes = (type?: BlockPropDataType | BlockPropDataType[]) => {
    if (!type) return undefined;
    const types = toArray(type);
    const _types = types.map((n) => {
      return n.replace(/\'|\"/gi, '');
    });
    return `[${_types.join(',')}]`;
  };

  return props.map((prop) => {
    if (typeof prop === 'string') {
      return `${prop}: {}`;
    } else {
      return `${prop.name}: {
          type:${toTypes(prop.type)},
          required: ${prop.required},
          default: ${parseValue(prop.default, true, false)}
          }`;
    }
  });
}
