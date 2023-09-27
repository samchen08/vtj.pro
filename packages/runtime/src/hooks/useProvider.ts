import { inject } from 'vue';
import { Provider, providerInjectKey } from '../Provider';

export function useProvider(): Provider {
  const provider = inject(providerInjectKey, null);
  if (!provider) {
    console.warn('useProvider Provider 未定义');
  }
  return provider as Provider;
}
