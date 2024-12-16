import { rm } from 'fs/promises';
console.log('开始清理...');
await rm('node_modules', { recursive: true, force: true });
await rm('dist', { recursive: true, force: true });
await rm('package-lock.json', { recursive: true, force: true });
await rm('pnpm-lock.yaml', { recursive: true, force: true });
console.log('开始完成！');