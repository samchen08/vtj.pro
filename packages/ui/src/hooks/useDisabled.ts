import { type MaybeRef, computed, unref } from 'vue';
export type IUseDisabled = MaybeRef<
  undefined | boolean | ((...args: any[]) => boolean)
>;
export function useDisabled(disabled: IUseDisabled, params?: any) {
  return computed(() => {
    const value = unref(disabled);
    return typeof value === 'function' ? value(params) : !!value;
  });
}
