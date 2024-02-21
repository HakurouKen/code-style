import pluginJsdoc from 'eslint-plugin-jsdoc';

export async function jsdoc() {
  return [
    pluginJsdoc.configs['flat/recommended'],
    {
      rules: { 'jsdoc/require-jsdoc': 'off' }
    }
  ];
}
