import { javascript } from './configs/javascript';
import { eslintComments } from './configs/eslint-comments';
import { node } from './configs/node';
import { imports } from './configs/imports';
import { jsdoc } from './configs/jsdoc';

import { prettier } from './configs/prettier';
import { spellcheck } from './configs/spellcheck';
import { resolveConfigs } from './utils';

export default function buildEslintConfig(
  options: {
    spellcheck?: boolean;
    prettier?: boolean;
  } = {}
) {
  const { spellcheck: useSpellcheck = true, prettier: usePrettier = true } =
    options;

  const configs: any[] = [];

  configs.push(
    javascript(),
    eslintComments(),
    node(),
    imports(),
    jsdoc()
  );

  if (useSpellcheck) {
    configs.push(spellcheck());
  }

  if (usePrettier) {
    configs.push(prettier());
  }

  return resolveConfigs(...configs);
}
