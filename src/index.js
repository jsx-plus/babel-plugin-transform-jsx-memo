let uidCount = 0;
const DIRECTIVE = 'x-memo';
const helperImportedFrom = 'babel-runtime-jsx-plus'
const helperImportedName = 'createJSXMemo'
const helperLocalName = '__create_jsx_memo__';

export default function({ types: t }) {
  const callee = t.identifier(helperLocalName);
  let rootPath;

  return {
    visitor: {
      Program(path) {
        rootPath = path;
        path.helperImported = false;
      },
      JSXElement: {
        exit(path) {
          const { node, parentPath } = path;
          if (node.__jsxmemo) {
            node.__jsxmemo = false;
            const replacer = t.callExpression(callee, [
              node,
              t.numericLiteral(uidCount++)
            ]);
            if (parentPath.isJSXElement()) {
              path.replaceWith(t.jsxExpressionContainer(replacer));
            } else {
              path.replaceWith(replacer);
            }
          }
        }
      },
      JSXAttribute(path) {
        const { node } = path;
        if (t.isJSXIdentifier(node.name, { name: DIRECTIVE })) {
          const parentJSXEl = path.findParent(path => path.isJSXElement());
          parentJSXEl.node.__jsxmemo = true;

          if (rootPath.helperImported === false) {
            const imported = t.identifier(helperImportedName);
            const local = t.identifier(helperLocalName);
            const importDeclaration = t.importDeclaration([
              t.importSpecifier(local, imported)
            ], t.stringLiteral(helperImportedFrom))
            rootPath.unshiftContainer('body', importDeclaration);
            rootPath.helperImported = true;
          }
          path.remove();
        }
      }
    }
  };
}
