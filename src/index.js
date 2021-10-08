import crc32 from './crc32';

const DIRECTIVE = 'x-memo';
const helperImportedFrom = 'babel-runtime-jsx-plus'
const helperImportedName = 'createJSXMemo'
const helperLocalName = '__create_jsx_memo__';

export default function({ types: t }) {
  const callee = t.identifier(helperLocalName);

  return {
    visitor: {
      Program(path) {
        path.__memoHelperImported = false;
      },
      JSXElement: {
        exit(path, state) {
          const { node, parentPath } = path;
          if (node.__jsxmemo) {
            node.__jsxmemo = false;
            const replacer = t.callExpression(callee, [
              t.arrowFunctionExpression([], node),
              t.stringLiteral(getUniqueIdentifier(state))
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
          const rootPath = path.findParent(p => p.isProgram());
          const parentJSXEl = path.findParent(p => p.isJSXElement());
          parentJSXEl.node.__jsxmemo = true;

          if (rootPath.__memoHelperImported === false) {
            const imported = t.identifier(helperImportedName);
            const local = t.identifier(helperLocalName);
            const importDeclaration = t.importDeclaration([
              t.importSpecifier(local, imported)
            ], t.stringLiteral(helperImportedFrom))
            rootPath.unshiftContainer('body', importDeclaration);
            rootPath.__memoHelperImported = true;
          }
          path.remove();
        }
      }
    }
  };
}

// Generate unique identifier, avoid id conflicts.
// https://github.com/jsx-plus/babel-plugin-transform-jsx-memo/issues/3
let uidCount = 0;
function getUniqueIdentifier(state) {
  return crc32(state.filename) + '@' + uidCount++;
}
