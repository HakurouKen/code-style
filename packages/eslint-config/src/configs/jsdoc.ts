import pluginJsdoc from 'eslint-plugin-jsdoc';
import { GLOB_TS, GLOB_TSX } from '../matchers';

export async function jsdoc() {
  return [
    pluginJsdoc.configs['flat/recommended'],
    {
      rules: { 'jsdoc/require-jsdoc': 'off' }
    },
    {
      files: [GLOB_TS, GLOB_TSX],
      rules: {
        'jsdoc/check-tag-names': ['warn', { typed: true }],
        'jsdoc/no-types': 'warn',
        'jsdoc/no-undefined-types': 'off',
        'jsdoc/require-param-type': 'off',
        'jsdoc/require-property-type': 'off',
        'jsdoc/require-returns-type': 'off'
      }
    }
  ];
}
