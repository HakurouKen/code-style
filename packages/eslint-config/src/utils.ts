export type Awaitable<T> = T | Promise<T>;

export async function interopDefault<T extends any>(
  m: Awaitable<T>
): Promise<T extends { default: infer U } ? U : T> {
  const resolved: any = await m;
  return resolved.default ?? resolved;
}
