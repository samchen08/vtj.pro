import { type BlockProp, type BlockPropDataType } from '@vtj/core';
import { toArray } from '@vtj/base';
import { parseValue, isJSCode } from '../utils';

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
      if (isJSCode(prop.default) && !prop.default.value) {
        prop.default.value = 'undefined';
      }
      return `${prop.name}: {
          type:${toTypes(prop.type)},
          required: ${parseValue(!!prop.required, true, false)},
          default: ${parseValue(prop.default, true, false)}
          }`;
    }
  });
}
