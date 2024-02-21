import { GLOB_IGNORES } from '../matchers';

export async function ignores() {
  return [
    {
      ignores: GLOB_IGNORES
    }
  ];
}
