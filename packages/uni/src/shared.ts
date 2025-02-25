declare global {
  interface Window {
    uni: any;
  }
}

export function loading() {
  if (!window.uni) return;

  window.uni.showLoading({
    title: '加载中...',
    mask: true
  });

  return {
    close: () => {
      window.uni.hideLoading();
    }
  };
}

export function notify(
  message: string,
  title: string = '',
  _type: 'primary' | 'warning' | 'danger' | 'success' = 'warning'
) {
  if (!window.uni) return;
  window.uni.showModal({
    title,
    content: message,
    showCancel: false
  });
}

export function alert(message: string) {
  notify(message);
}
