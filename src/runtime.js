const sharedElements = {};

/**
 * Memorize a JSXElement.
 */
export function createJSXMemo(el, uid) {
  return sharedElements.hasOwnProperty(uid)
    ? sharedElements[uid]
    : sharedElements[uid] = el;
}
