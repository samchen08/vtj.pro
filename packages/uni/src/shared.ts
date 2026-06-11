declare const uni: any;

function getUni(): any {
  if (typeof uni !== 'undefined') {
    return uni;
  }
  if (typeof globalThis !== 'undefined' && (globalThis as any).uni) {
    return (globalThis as any).uni;
  }
  if (typeof window !== 'undefined' && (window as any).uni) {
    return (window as any).uni;
  }
  return undefined;
}

export function loading() {
  const _uni = getUni();
  if (_uni?.showLoading) {
    _uni.showLoading({
      title: '加载中...',
      mask: true
    });
  }

  return {
    close: () => {
      const _uni = getUni();
      _uni?.hideLoading && _uni.hideLoading();
    }
  };
}

export async function notify(
  message: string,
  title: string = '',
  _type: 'primary' | 'warning' | 'danger' | 'success' = 'warning'
) {
  const _uni = getUni();
  if (_uni?.showModal) {
    return _uni.showModal({
      title,
      content: message,
      showCancel: false
    });
  }
  if (typeof window !== 'undefined') {
    window.alert(message);
  }
  return true;
}

export async function alert(message: string) {
  return notify(message);
}
