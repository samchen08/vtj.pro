declare global {
  interface Window {
    uni: any;
  }
}

export function loading() {
  if (window.uni?.showLoading) {
    window.uni.showLoading({
      title: '加载中...',
      mask: true
    });
  }
  return {
    close: () => {
      window.uni?.hideLoading && window.uni.hideLoading();
    }
  };
}

export async function notify(
  message: string,
  title: string = '',
  _type: 'primary' | 'warning' | 'danger' | 'success' = 'warning'
) {
  if (window.uni?.showModal) {
    return window.uni.showModal({
      title,
      content: message,
      showCancel: false
    });
  }
  return Promise.reject(new Error('window.uni.showModal is undefined'));
}

export async function alert(message: string) {
  return notify(message);
}
