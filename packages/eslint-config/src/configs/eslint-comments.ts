import pluginEslintComments from 'eslint-plugin-eslint-comments';

export function eslintComments() {
  return [
    {
      plugins: {
        'eslint-comments': pluginEslintComments
      },
      rules: {
        'eslint-comments/disable-enable-pair': 'error',
        'eslint-comments/no-aggregating-enable': 'error',
        'eslint-comments/no-duplicate-disable': 'error',
        'eslint-comments/no-unlimited-disable': 'error',
        'eslint-comments/no-unused-enable': 'error'
      }
    }
  ];
}
