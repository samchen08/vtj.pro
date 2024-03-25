import { ref, onUnmounted } from 'vue';
export function useKeyboardHeight(defaults: number = 300) {
  const height = ref(defaults);

  const setHeight = (res: UniApp.OnKeyboardHeightChangeResult) => {
    height.value = res.height;
  };

  if (uni.onKeyboardHeightChange) {
    uni.onKeyboardHeightChange(setHeight);
  }

  // onMounted(() => {
  //   uni.getSystemInfo({
  //     success: (res) => {
  //       height.value = res.screenHeight - res.windowHeight;
  //     }
  //   });
  // });

  onUnmounted(() => {
    uni.offKeyboardHeightChange && uni.offKeyboardHeightChange(setHeight);
  });

  return height;
}
