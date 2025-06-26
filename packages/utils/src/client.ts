export interface ClientInfo {
  os: string;
  osVersion: string;
  browser: string;
  browserVersion: string;
  isMobile: boolean;
}

export function getClientInfo(): ClientInfo {
  const ua = navigator.userAgent;
  let os = 'Unknown';
  let osVersion = 'Unknown';
  let browser = 'Unknown';
  let browserVersion = 'Unknown';
  let isMobile = false;

  // 检测操作系统
  if (/Windows NT/i.test(ua)) {
    os = 'Windows';
    const windowsVersionMap: { [key: string]: string } = {
      '12.0': '12',
      '11.0': '11',
      '10.0': '10',
      '6.3': '8.1',
      '6.2': '8',
      '6.1': '7',
      '6.0': 'Vista',
      '5.2': 'XP 64-bit',
      '5.1': 'XP'
    };
    const versionMatch = ua.match(/Windows NT (\d+\.\d+)/);
    if (versionMatch) {
      osVersion = windowsVersionMap[versionMatch[1]] || versionMatch[1];
    }
  } else if (/Mac OS X/i.test(ua)) {
    os = 'Mac OS';
    const versionMatch = ua.match(/Mac OS X (\d+[._]\d+[._]?\d*)/);
    if (versionMatch) {
      osVersion = versionMatch[1].replace(/_/g, '.');
    }
  } else if (/(iPhone|iPad|iPod)/i.test(ua)) {
    os = 'iOS';
    const versionMatch = ua.match(/OS (\d+[_\.]\d+[_\.]?\d*)/);
    if (versionMatch) {
      osVersion = versionMatch[1].replace(/_/g, '.');
    }
  } else if (/Android/i.test(ua)) {
    os = 'Android';
    const versionMatch = ua.match(/Android (\d+\.\d+)/);
    if (versionMatch) {
      osVersion = versionMatch[1];
    }
  } else if (/Linux/i.test(ua)) {
    os = 'Linux';
  }

  // 检测浏览器
  const edgeMatch = ua.match(/(Edge|Edg|Edga|EdgA)\/(\d+)/i);
  if (edgeMatch) {
    browser = 'Microsoft Edge';
    browserVersion = edgeMatch[2];
  } else {
    const firefoxMatch = ua.match(/Firefox\/(\d+)/i);
    if (firefoxMatch) {
      browser = 'Firefox';
      browserVersion = firefoxMatch[1];
    } else {
      const operaMatch = ua.match(/(Opera|OPR)\/(\d+)/i);
      if (operaMatch) {
        browser = 'Opera';
        browserVersion = operaMatch[2];
      } else {
        const chromeMatch = ua.match(/Chrome\/(\d+)/i);
        if (chromeMatch) {
          browser = 'Chrome';
          browserVersion = chromeMatch[1];
        } else {
          const safariMatch = ua.match(/Version\/(\d+\.\d+)/i);
          if (safariMatch && /Safari/i.test(ua)) {
            browser = 'Safari';
            browserVersion = safariMatch[1];
          } else {
            const ieMatch = ua.match(/(MSIE |Trident.*rv:)(\d+)/i);
            if (ieMatch) {
              browser = 'Internet Explorer';
              browserVersion = ieMatch[2];
            }
          }
        }
      }
    }
  }

  isMobile =
    // 移动设备通用检测
    /(iPhone|iPod|iPad|Android|Windows Phone|Mobile)/i.test(ua) ||
    // 根据已识别的操作系统补充判断
    ['iOS', 'Android'].includes(os);

  // 针对平板的特殊处理（可选）
  if (/(iPad|Tablet|Android(?!.*Mobile))/i.test(ua)) {
    isMobile = true; // 将平板视为移动端
  }

  return {
    os,
    osVersion,
    browser,
    browserVersion,
    isMobile
  };
}
