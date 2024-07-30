import { useSlots } from 'vue';
export function useDefineSlots(excludes: string[] = []) {
  const slots = useSlots();
  return Object.keys(slots).filter((n) => !excludes.includes(n));
}
