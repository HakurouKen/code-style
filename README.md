# hakurouken's code-style config

## Usage

### @hakurouken/prettier-config

In `package.json`

```json
{
  "prettier": "@hakurouken/prettier-config"
}
```

### @hakurouken/eslint-config

With `type: module` in `package.json` (esm):

```javascript
// eslint.config.js
import buildEslintConfig from '@hakurouken/eslint-config';

export default buildEslintConfig();
```

Or with cjs:

```javascript
// eslint.config.js
const { default: buildEslintConfig } = require('@hakurouken/eslint-config');

module.exports = buildEslintConfig();
```
