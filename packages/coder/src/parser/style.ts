import { jsonToStyle } from '../utils';
export function parseStyle(style: Record<string, Record<string, any>> = {}) {
  const result: string[] = [];
  for (const [name, json] of Object.entries(style)) {
    result.push(`
    ${name} {
        ${jsonToStyle(json)}
    }
    `);
  }
  return result.join('\n');
}
