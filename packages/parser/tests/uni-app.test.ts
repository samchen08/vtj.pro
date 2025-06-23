import { expect, test, describe } from 'vitest';
import { parseUniApp } from '../src/uni';

describe('UniApp Parser', () => {
  //   test('parseUniApp should parse basic uni app config', () => {
  //     const content = `
  // <script>
  // export default {
  //   onLaunch() {
  //     console.log('App launched');
  //   },
  //   onShow() {
  //     console.log('App shown');
  //   }
  // }
  // </script>

  // <style>
  // page {
  //   background-color: #f8f8f8;
  // }
  // </style>
  //     `.trim();

  //     const result = parseUniApp(content);

  //     expect(result).toBeDefined();
  //     expect(result.onLaunch).toBeDefined();
  //     expect(result.onLaunch.type).toBe('JSFunction');
  //     expect(result.onShow).toBeDefined();
  //     expect(result.onShow.type).toBe('JSFunction');
  //     expect(result.css).toContain('background-color: #f8f8f8');
  //   });

  //   test('parseUniApp should handle complex app configuration', () => {
  //     const content = `
  // <script>
  // export default {
  //   globalData: {
  //     userInfo: null
  //   },
  //   onLaunch(options) {
  //     uni.getSystemInfo({
  //       success: (info) => {
  //         this.globalData.systemInfo = info;
  //       }
  //     });
  //   },
  //   onPageNotFound(options) {
  //     uni.redirectTo({
  //       url: '/pages/404/404'
  //     });
  //   }
  // }
  // </script>

  // <style>
  // page {
  //   height: 100%;
  //   font-size: 28rpx;
  //   line-height: 1.8;
  // }
  // </style>
  //     `.trim();

  //     const result = parseUniApp(content);

  //     expect(result.onLaunch).toBeDefined();
  //     expect(result.onLaunch.value).toContain('getSystemInfo');
  //     expect(result.onPageNotFound).toBeDefined();
  //     expect(result.onPageNotFound.value).toContain('redirectTo');
  //     expect(result.css).toContain('font-size: 28rpx');
  //   });

  //   test('parseUniApp should handle empty style', () => {
  //     const content = `
  // <script>
  // export default {
  //   onLaunch() {
  //     console.log('App launched');
  //   }
  // }
  // </script>
  //     `.trim();

  //     const result = parseUniApp(content);

  //     expect(result.onLaunch).toBeDefined();
  //     expect(result.css).toBe('');
  //   });

  test('parseUniApp should handle empty script', () => {
    const content = `
<style>
page {
  background: #fff;
}
</style>
    `.trim();

    const result = parseUniApp(content);

    expect(Object.keys(result)).toHaveLength(1);
    expect(result.css).toBeDefined();
    expect(result.css).toContain('background: #fff');
  });

  //   test('parseUniApp should handle multiple lifecycle methods', () => {
  //     const content = `
  // <script>
  // export default {
  //   onLaunch() {
  //     console.log('launch');
  //   },
  //   onShow() {
  //     console.log('show');
  //   },
  //   onHide() {
  //     console.log('hide');
  //   },
  //   onError(err) {
  //     console.error(err);
  //   }
  // }
  // </script>
  //     `.trim();

  //     const result = parseUniApp(content);

  //     expect(result.onLaunch).toBeDefined();
  //     expect(result.onShow).toBeDefined();
  //     expect(result.onHide).toBeDefined();
  //     expect(result.onError).toBeDefined();
  //     expect(result.onLaunch.type).toBe('JSFunction');
  //     expect(result.onShow.type).toBe('JSFunction');
  //     expect(result.onHide.type).toBe('JSFunction');
  //     expect(result.onError.type).toBe('JSFunction');
  //   });

  test('parseUniApp should handle complex styles', () => {
    const content = `
<script>
export default {
  onLaunch() {}
}
</script>

<style>
page {
  background: #f8f8f8;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.placeholder {
  height: var(--status-bar-height);
  width: 100%;
}
</style>
    `.trim();

    const result = parseUniApp(content);

    expect(result.css).toBeDefined();
    expect(result.css).toContain('background: #f8f8f8');
    expect(result.css).toContain('flex-direction: column');
    expect(result.css).toContain('--status-bar-height');
  });
});
