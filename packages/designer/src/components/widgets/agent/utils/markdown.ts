export function formatMarkdownContent(value: unknown): string {
  if (typeof value === 'string') return value;
  try {
    return `\`\`\`json\n${JSON.stringify(value, null, 2)}\n\`\`\``;
  } catch {
    return String(value);
  }
}
