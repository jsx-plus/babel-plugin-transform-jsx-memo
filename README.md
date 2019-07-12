# babel-plugin-transform-jsx-memo



## Example

**In**

```js
// input code
```

**Out**

```js
"use strict";

// output code
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
