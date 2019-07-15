import { createJSXMemo as __create_jsx_memo__ } from "babel-plugin-transform-jsx-memo/lib/runtime";
import { createElement } from 'react';
export default function Foo(props) {
  const {
    message
  } = props;
  return <div>
      Demo:
      {__create_jsx_memo__(<p>hello {message}</p>, 0)}
    </div>;
}
