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
  return content.replace(new RegExp('this.context.', 'g'), '');
}

export function parseValue(
  val: unknown,
  stringify: boolean = true,
  noThis: boolean = true
) {
  const value = isJSCode(val)
    ? val.value
    : stringify
      ? JSON.stringify(val)
      : val;

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
  let handler: string = content.trim();
  if (handler.startsWith('{')) return handler;
  if (handler.startsWith('async function')) {
    handler = handler.replace(/^async function/, 'async');
  } else if (handler.startsWith('function')) {
    handler = handler.replace(/^function/, '');
  } else {
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
