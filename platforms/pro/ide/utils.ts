import { ElLoading, ElNotification } from 'element-plus';

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
