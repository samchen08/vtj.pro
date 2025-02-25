import { ref } from 'vue';
import { version } from '../../version';
import { NPM_REGISTRY_URL } from '../../constants';

export function useCheckVersion(callback?: (v: string) => void) {
  const latest = ref<string>();
  if (!latest.value) {
    window
      .fetch(NPM_REGISTRY_URL)
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          latest.value = res['dist-tags']?.latest as string;
          if (latest.value && latest.value !== version) {
            callback && callback(latest.value);
          }
        }
      });
  } else {
    if (latest.value !== version) {
      callback && callback(latest.value);
    }
  }

  return {
    latest
  };
}
