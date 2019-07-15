import { createElement } from 'react';

export default function Foo(props) {
  const { message } = props;
  return (
    <div>
      Demo:
      <p x-memo>hello {message}</p>
    </div>
  );
}
