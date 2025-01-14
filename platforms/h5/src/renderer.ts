import { createAdapter } from '@vtj/renderer';

import { showNotify, showLoadingToast, showDialog } from 'vant';

export function loading() {
  return showLoadingToast({
    message: '加载中...',
    forbidClick: true
  });
}

export function notify(
  message: string,
  title: string = '',
  type: 'primary' | 'warning' | 'danger' | 'success' = 'warning'
) {
  const msg = title ? `[${title}]${message}` : message;
  showNotify({ type, message: msg });
}

export function alert(message: string) {
  return showDialog({ message });
}

export * from '@vtj/renderer';

export const adapter = createAdapter({ loading, notify });
