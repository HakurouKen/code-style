import { type Awaitable } from './utils';
import type { UserConfig } from './types';

import { javascript } from './configs/javascript';
import { eslintComments } from './configs/eslint-comments';
import { node } from './configs/node';
import { imports } from './configs/imports';
import { jsdoc } from './configs/jsdoc';
import { prettier } from './configs/prettier';
import { spellcheck } from './configs/spellcheck';
import { typescript } from './configs/typescript';
import { ignores } from './configs/ignores';
import { tampermonkey } from './configs/tampermonkey';
import { type Linter } from 'eslint';

async function resolveConfigs(
  ...configs: Awaitable<UserConfig | UserConfig[]>[]
): Promise<Linter.FlatConfig[]> {
  const resolved: any = await Promise.all(configs);
  return resolved.flat();
}

export type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>;

function resolveChildOptions<K extends keyof UserConfig>(
  options: UserConfig,
  key: K
): ResolvedOptions<UserConfig[K]> {
  return typeof options[key] === 'boolean' ? ({} as any) : options[key] || {};
}

export default function buildEslintConfig(
  options: UserConfig = {},
  ...userCustomConfigs: Awaitable<Linter.FlatConfig>[]
) {
  const configs: any[] = [];

  configs.push(
    ignores(),
    javascript(),
    eslintComments(),
    node(),
    imports(),
    jsdoc()
  );

  if (options.spellcheck ?? false) {
    configs.push(spellcheck(resolveChildOptions(options, 'spellcheck')));
  }

  if (options.prettier ?? true) {
    configs.push(prettier());
  }

  if (options.typescript ?? true) {
    configs.push(typescript(resolveChildOptions(options, 'typescript')));
  }

  if (options.tampermonkey) {
    configs.push(tampermonkey(resolveChildOptions(options, 'tampermonkey')));
  }

  configs.push(userCustomConfigs);

  return resolveConfigs(...configs);
}
