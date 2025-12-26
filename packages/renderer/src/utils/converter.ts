const DESIGN_BASE_WIDTH = 750;

/**
 * 将rpx转换为px（Web/通用环境）
 * @param rpx 需要转换的rpx值
 * @param customBaseWidth 自定义基准宽度，默认为设计稿宽度
 * @returns 计算出的px值
 */
export function rpxToPx(
  window: any,
  rpx: number,
  customBaseWidth?: number
): number {
  // 获取屏幕宽度（兼容不同环境）
  let screenWidth: number;

  if (typeof window !== 'undefined') {
    // 浏览器环境
    screenWidth =
      window.innerWidth || window.document.documentElement.clientWidth;
  } else {
    // 其他环境，使用默认值或抛出错误
    console.warn('无法获取屏幕宽度，使用默认值375');
    screenWidth = 375;
  }

  const baseWidth = customBaseWidth || DESIGN_BASE_WIDTH;

  // 核心转换公式：px = (rpx * 屏幕宽度) / 基准宽度
  return (rpx * screenWidth) / baseWidth;
}

/**
 * 将CSS字符串中的rpx单位转换为px单位
 * @param css 需要转换的CSS字符串
 * @returns 转换后的CSS字符串
 */
export function convertCssRpx(window: any, css: string): string {
  // 使用简单的状态机来跟踪是否在字符串内
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let inUrl = false;
  let result = '';

  for (let i = 0; i < css.length; i++) {
    const char = css[i];

    // 更新状态
    if (char === "'" && !inDoubleQuote && !inUrl) {
      inSingleQuote = !inSingleQuote;
    } else if (char === '"' && !inSingleQuote && !inUrl) {
      inDoubleQuote = !inDoubleQuote;
    } else if (
      css.substr(i, 4).toLowerCase() === 'url(' &&
      !inSingleQuote &&
      !inDoubleQuote
    ) {
      inUrl = true;
    } else if (char === ')' && inUrl) {
      inUrl = false;
    }

    // 如果不在字符串或URL中，检查rpx模式
    if (!inSingleQuote && !inDoubleQuote && !inUrl) {
      // 检查是否匹配 rpx 模式
      const match = css.substr(i).match(/^(-?\d+(?:\.\d+)?)\s*rpx/);
      if (match) {
        const rpxValue = match[1];
        const rpxNum = parseFloat(rpxValue);
        const pxNum = rpxToPx(window, rpxNum);
        const pxValue = `${pxNum.toFixed(6).replace(/\.?0+$/, '')}px`;
        result += pxValue;
        i += match[0].length - 1; // 跳过已处理的字符
        continue;
      }
    }

    result += char;
  }

  return result;
}
