# @hakurouken/eslint-config

`@hakurouken/eslint-config` uses [ESlint Flat Config System](https://eslint.org/docs/latest/use/configure/configuration-files-new).

## Usage

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

## For Vscode

Install the [VsCode Eslint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), an make sure the ESLint flat config support is on:

```json
{
  "eslint.experimental.useFlatConfig": true
}
```
