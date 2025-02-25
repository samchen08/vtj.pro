const _weex = (window as any).weex;
const _uniCloud = (window as any).uniCloud;
const _uni = (window as any).uni;
const _Vue = (window as any).Vue;
if (!_weex) {
  (window as any).weex = {
    requireModule: () => {
      return {
        addRule: () => {}
      };
    }
  };
}

if (!_uniCloud) {
  (window as any).uniCloud = {};
}

if (!_uni) {
  (window as any).uni = {
    getSystemInfoSync() {
      return {
        platform: 'h5'
      };
    },
    getDeviceInfo() {
      return {
        platform: 'h5'
      };
    },
    requireNativePlugin() {}
  };
}

if (!_Vue) {
  (window as any).Vue = {
    prototype: {}
  };
} else {
  // _Vue.prototype = _Vue.prototype || {};
}
