import { createAdapter } from '@vtj/renderer';
import { useTitle } from '@vueuse/core';
import { ElNotification, ElLoading } from 'element-plus';
import { Startup } from './components';

export function loading() {
  return ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
}

export function notify(
  message: string,
  title: string = '',
  type: 'success' | 'warning' | 'error' | 'info' = 'warning'
) {
  ElNotification({
    title,
    message,
    type
  });
}

export * from '@vtj/renderer';

export const adapter = createAdapter({ loading, notify, Startup, useTitle });
