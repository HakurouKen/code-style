import path from 'node:path';
import url from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import type { OptionsTypescript } from '../types';

const GLOB_SRC = '**/*.?([cm])[jt]s?(x)';
const compat = new FlatCompat({
  resolvePluginsRelativeTo:
    typeof __dirname === 'undefined'
      ? path.dirname(url.fileURLToPath(import.meta.url))
      : __dirname
});

export async function typescript(options: OptionsTypescript) {
  const configs = compat.extends('plugin:@typescript-eslint/recommended');
  const files = options.files ?? [GLOB_SRC];

  configs.push({
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  });

  configs.forEach((config) => {
    config.files = files;
  });

  return [...configs];
}
