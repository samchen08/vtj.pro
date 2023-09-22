import { defineComponent, createVNode, markRaw } from 'vue';

export function createIconComponent(name: string, className: string) {
  return markRaw(
    defineComponent({
      name,
      render() {
        return createVNode('i', { class: className });
      }
    })
  );
}
