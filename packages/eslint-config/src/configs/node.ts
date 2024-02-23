import pluginNode from 'eslint-plugin-n';

export function node() {
  return [
    pluginNode.configs['flat/recommended'],
    {
      // Disable all require/import rules, cause these features should be handle by build tools.
      rules: {
        'n/no-extraneous-import': 'off',
        'n/no-extraneous-require': 'off',
        'n/no-missing-import': 'off',
        'n/no-missing-require': 'off',
        'n/no-unpublished-bin': 'off',
        'n/no-unpublished-import': 'off',
        'n/no-unpublished-require': 'off'
      }
    }
  ];
}
