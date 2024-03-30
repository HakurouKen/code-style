import path from 'node:path';
import url from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

export type Awaitable<T> = T | Promise<T>;

export async function interopDefault<T>(
  m: Awaitable<T>
): Promise<T extends { default: infer U } ? U : T> {
  const resolved: any = await m;
  return resolved.default ?? resolved;
}

export function compatExtends(name: string) {
  const compat = new FlatCompat({
    resolvePluginsRelativeTo:
      typeof __dirname === 'undefined'
        ? path.dirname(url.fileURLToPath(import.meta.url))
        : __dirname
  });

  return compat.extends(name);
}
