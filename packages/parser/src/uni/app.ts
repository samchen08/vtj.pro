import { parseSFC, parseScript, traverseAST, generateCode } from '../shared';

export function parseUniApp(source: string) {
  const sfc = parseSFC(source);
  const ast = parseScript(sfc.script);
  const uniConfig: Record<string, any> = {};
  if (sfc.styles) {
    uniConfig.css = sfc.styles[0] || '';
  }
  traverseAST(ast, {
    CallExpression(path) {
      const calleeName = (path.node.callee as any)?.name;
      if (calleeName) {
        const code = generateCode(path.node.arguments[0]);
        if (code) {
          uniConfig[calleeName] = {
            type: 'JSFunction',
            value: code
          };
        }
      }
    }
  });
  return uniConfig;
}
