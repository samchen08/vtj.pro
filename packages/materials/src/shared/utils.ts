import type { MaterialDescription, MaterialProp } from '@vtj/core';

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

export function omitPropItem(props: MaterialProp[] = [], names: string[] = []) {
  return props.filter((n) => !names.includes(n.name));
}
