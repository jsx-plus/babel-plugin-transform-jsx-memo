let uidCount = 0;
const DIRECTIVE = 'x-memo';
const helperImportedFrom = 'babel-plugin-transform-jsx-memo/lib/runtime'
const helperImportedName = 'createJSXMemo'
const helperLocalName = '__create_jsx_memo__';

export default function({types: t }) {
  let rootPath;
  let helperImported = false;
  return {
    visitor: {
      Program(path) {
        rootPath = path;
      },
      JSXAttribute(path) {
        const { node } = path;
        if (t.isJSXIdentifier(node.name, { name: DIRECTIVE })) {
          const parentJSXEl = path.findParent(path => path.isJSXElement());
          const callee = t.identifier('__create_jsx_memo__');
          parentJSXEl.replaceWith(t.jsxExpressionContainer(t.callExpression(callee, [
            parentJSXEl.node,
            t.numericLiteral(uidCount++)
          ])));
          if (helperImported === false) {
            const imported = t.identifier(helperImportedName);
            const local = t.identifier(helperLocalName);
            const importDeclaration = t.importDeclaration([
              t.importSpecifier(local, imported)
            ], t.stringLiteral(helperImportedFrom))
            rootPath.node.body.unshift(importDeclaration);
            helperImported = true;
          }
          path.remove();
        }
      }
    }
  };
}
