import { ElLoading, ElNotification, ElMessageBox } from 'element-plus';

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

export function alert(
  message: string,
  options?: Record<string, any>
): Promise<any> {
  return ElMessageBox.alert(message, options);
}
