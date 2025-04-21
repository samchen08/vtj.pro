import { type JSExpression, type JSFunction } from '@vtj/core';
import { parseExpression, parseFunction } from '@vtj/renderer';
import { kebabCase } from '@vtj/utils';
import { ElNotification, ElMessageBox, ElMessage } from 'element-plus';

export function alert(message: string, options?: any) {
  return ElMessageBox.alert(message, {
    title: '提示',
    type: 'warning',
    ...options
  });
}

export function notify(message: string, title: string = '提示') {
  return ElNotification.warning({
    title,
    message
  });
}

export async function confirm(message: string, options?: any) {
  return await ElMessageBox.confirm(message, '提示', {
    type: 'warning',
    ...options
  }).catch(() => false);
}

export function message(
  message: string,
  type: 'success' | 'warning' = 'success'
) {
  return ElMessage({
    message,
    type
  });
}

export function proxyContext(context: any) {
  const proxy = context ? { ...context } : ({} as any);

  const _proxy = (prop: any) => {
    return new Proxy(prop || {}, {
      get(target: any, name: string) {
        return typeof name === 'symbol'
          ? () => undefined
          : _proxy(target[name]);
      }
    });
  };

  proxy.context = new Proxy((proxy.context || {}) as any, {
    get(target: any, prop: string) {
      return _proxy(target[prop]);
    }
  });

  return proxy;
}

export function expressionValidate(
  str: JSExpression | JSFunction,
  self: any,
  thisRequired = false
) {
  let vaild = true;
  const context = proxyContext(self);
  try {
    if (str.type === 'JSExpression') {
      parseExpression(str, context, thisRequired, true);
    } else {
      parseFunction(str, context, thisRequired, true);
    }
  } catch (e: any) {
    vaild = false;
    ElNotification.error({
      title: '代码错误',
      message: e.message
    });
  }
  return vaild;
}

export function getClassProperties(obj: any) {
  return Object.keys(obj)
    .concat(
      Object.getPrototypeOf(obj)
        ? Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
        : []
    )
    .filter((n) => !['constructor'].includes(n));
}

export function normalizedStyle(style: Record<string, any> = {}) {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(style)) {
    result[kebabCase(key)] = value;
  }
  return result;
}
