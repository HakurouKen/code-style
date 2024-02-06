import * as pluginImport from 'eslint-plugin-import';
import pluginUnusedImports from 'eslint-plugin-unused-imports';

export async function imports() {
  return [
    {
      plugins: {
        import: pluginImport,
        'unused-imports': pluginUnusedImports
      },
      rules: {
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-webpack-loader-syntax': 'warn',
        'import/prefer-default-export': 'off',
        'import/no-self-import': 'error',
        'import/newline-after-import': [
          'error',
          { considerComments: true, count: 1 }
        ],

        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            vars: 'all',
            varsIgnorePattern: '^_'
          }
        ]
      }
    }
  ];
}
