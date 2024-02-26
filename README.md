# Leroy's code-style config

## Usage

### @leroy/prettier-config

In `package.json`

```json
{
  "prettier": "@leroy/prettier-config"
}
```

### @leroy/eslint-config

With `type: module` in `pacakge.json` (esm):

```javascript
// eslint.config.js
import buildEslintConfig from '@leroy/eslint-config';

export default buildEslintConfig();
```

Or with cjs:

```javascript
// eslint.config.js
const { default: buildEslintConfig } = require('@leroy/eslint-config');

module.exports = buildEslintConfig();
```
