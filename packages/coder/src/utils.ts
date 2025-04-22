import { type JSExpression, type JSFunction } from '@vtj/core';

export function isJSExpression(data: any): data is JSExpression {
  return data && data.type === 'JSExpression';
}

export function isJSFunction(x: any): x is JSFunction {
  return typeof x === 'object' && x && x.type === 'JSFunction';
}

export function isJSCode(data: unknown): data is JSExpression | JSFunction {
  return isJSExpression(data) || isJSFunction(data);
}

export function JSCodeToString(data: unknown) {
  if (isJSCode(data)) {
    return data.value;
  } else {
    return JSON.stringify(data);
  }
}

export function replaceThis(content: string) {
  return content.replace(new RegExp('this.', 'g'), '');
}

export function replaceContext(content: string) {
  return content.replace(/this\.context\??\./g, '');
}

export function parseValue(
  val: unknown,
  stringify: boolean = true,
  noThis: boolean = true,
  computedKeys: string[] = []
) {
  let value = isJSCode(val)
    ? val.value.trim().replace(/\"/g, "'").replace(/;$/, '')
    : stringify
      ? JSON.stringify(val)
      : val;
  value = replaceComputedValue(value as string, computedKeys);
  return noThis
    ? replaceThis(replaceContext(value as string))
    : replaceContext(value as string);
}

export function replaceComputedValue(content: string, keys: string[] = []) {
  let result = content;
  for (const key of keys) {
    result = result.replace(
      new RegExp(`this.${key}.value`, 'g'),
      `this.${key}`
    );
  }
  return result;
}

export function replaceFunctionTag(content: string) {
  let handler: string = content.trim().replace(/;$/, '');
  // 匹配格式： ( async function() {} ) 或  ( function() {} ) 或 (()=>{})
  const bracketRegex = /^\((\(|async|function)/;
  const isBracket = bracketRegex.test(handler);
  // 取括号内的内容
  handler = isBracket ? handler.substring(1, handler.length - 1) : handler;
  if (handler.startsWith('{')) return handler;
  if (handler.startsWith('async function')) {
    handler = handler.replace(/^async function/, 'async');
  } else if (handler.startsWith('function')) {
    handler = handler.replace(/^function/, '');
  } else {
    // 匹配格式： ( async () => {} ) 或  ( () => {} )
    const regex = /^(async\s)?\([\w]*\)\s+\=\>\s([\w\W]+)/;
    const match = handler.match(regex);
    if (match && match[2]) {
      if (!match[2].startsWith('{')) {
        handler = handler.replace(match[2], `{ return ${match[2]} }`);
      }
    }
    // 替换第一个箭头
    handler = handler.replace('=>', '');
  }
  return handler;
}

export function parsePlainObjectValue(obj: Record<string, any> = {}) {
  return Object.entries(obj).map(([name, value]) => {
    return `"${name}": ${parseValue(value)}`;
  });
}

export function getModifiers(
  modifiers: Record<string, boolean> = {},
  isToString: boolean = false
) {
  const keys = Object.keys(modifiers);
  return isToString ? keys.map((n) => '.' + n) : keys;
}

export function jsonToStyle(json: Record<string, any>) {
  let cssString = '';
  for (var key in json) {
    if (json.hasOwnProperty(key)) {
      var value = json[key];
      cssString += key + ': ' + value + ';';
    }
  }
  return cssString;
}

export function skipUniComponents(
  components: string[] = [],
  uniComponents: string[] = []
) {
  return components.filter((n) => !uniComponents.includes(n));
}
