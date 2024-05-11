import { type JSExpression, type JSFunction } from '@vtj/core';
import { parseExpression, parseFunction } from '@vtj/renderer';
import { ElNotification, ElMessageBox, ElMessage } from 'element-plus';

export function notify(message: string, title: string = '提示') {
  return ElNotification.warning({
    title,
    message
  });
}

export async function confirm(message: string) {
  return await ElMessageBox.confirm(message, '提示', { type: 'warning' }).catch(
    () => false
  );
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

export function expressionValidate(
  str: JSExpression | JSFunction,
  self: any,
  thisRequired = false
) {
  let vaild = true;
  try {
    if (str.type === 'JSExpression') {
      parseExpression(str, self, thisRequired, true);
    } else {
      parseFunction(str, self, thisRequired, true);
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
    .concat(Object.getOwnPropertyNames(Object.getPrototypeOf(obj)))
    .filter((n) => !['constructor'].includes(n));
}
