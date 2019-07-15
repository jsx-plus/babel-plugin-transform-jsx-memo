# babel-plugin-transform-jsx-memo

## Example

**In**

```jsx
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
```

**Out**

```jsx
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

```

## Installation

```sh
$ npm install babel-plugin-transform-jsx-memo
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-jsx-memo"]
}
```

### Via CLI

```sh
$ babel --plugins transform-jsx-memo script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-jsx-memo"]
});
```
