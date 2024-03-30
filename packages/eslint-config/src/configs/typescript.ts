import { compatExtends } from '../utils';
import type { OptionsTypescript } from '../types';

const GLOB_SRC = '**/*.?([cm])[jt]s?(x)';

export async function typescript(options: OptionsTypescript) {
  const configs = compatExtends('plugin:@typescript-eslint/recommended');
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
