import { inject } from 'vue';
import { Provider, providerInjectKey } from '../Provider';

export function useProvider(): Provider {
  const provider = inject(providerInjectKey, null);
  if (!provider) {
    throw new Error(`useProvider Provider 未定义`);
  }
  return provider as Provider;
}
