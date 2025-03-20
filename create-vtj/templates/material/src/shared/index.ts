import type { MaterialDescription } from '@vtj/core';

export function setPackageName(
  components: MaterialDescription[],
  name: string
) {
  return components.map((n) => {
    return {
      ...n,
      package: name
    } as MaterialDescription;
  });
}
