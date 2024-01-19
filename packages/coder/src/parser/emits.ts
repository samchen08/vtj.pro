
export function parseEmits(emits: string[] = []) {
  return emits.map((n) => {
    return `'${n}'`;
  });
}
