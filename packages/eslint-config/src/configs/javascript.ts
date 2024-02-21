import globals from 'globals';
import { GLOB_SRC } from '../matchers';

export async function javascript() {
  const rules = {
    'array-callback-return': 'warn',
    'arrow-body-style': ['warn', 'as-needed'],
    camelcase: ['error', { ignoreDestructuring: true, properties: 'never' }],
    'dot-notation': 'warn',
    eqeqeq: ['warn', 'always', { null: 'ignore' }],
    'func-style': ['off', 'expression'],
    'id-length': 'off',
    'new-cap': [
      'error',
      {
        newIsCap: true,
        newIsCapExceptions: [],
        capIsNew: false,
        capIsNewExceptions: [
          'Immutable.Map',
          'Immutable.Set',
          'Immutable.List'
        ],
        properties: false
      }
    ],
    'no-array-constructor': ['error'],
    'no-case-declarations': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-const-assign': 'error',
    'no-dupe-class-members': 'error',
    'no-else-return': ['warn', { allowElseIf: false }],
    'no-eval': 'error',
    'no-iterator': 'warn',
    'no-loop-func': 'error',
    'no-multi-assign': 'error',
    'no-nested-ternary': 'warn',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-wrappers': 'warn',
    'no-param-reassign': [
      'warn',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'acc',
          'accumulator',
          'e',
          'ctx',
          'req',
          'request',
          'res',
          'response',
          '$scope',
          'staticContext',
          'state'
        ]
      }
    ],
    'no-plusplus': 'off',
    'no-prototype-builtins': 'error',
    'no-restricted-properties': [
      'warn',
      { object: 'Math', property: 'pow', message: 'Please use ** instead' },
      {
        message:
          'Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.',
        property: '__proto__'
      },
      {
        message: 'Use `Object.defineProperty` instead.',
        property: '__defineGetter__'
      },
      {
        message: 'Use `Object.defineProperty` instead.',
        property: '__defineSetter__'
      },
      {
        message: 'Use `Object.getOwnPropertyDescriptor` instead.',
        property: '__lookupGetter__'
      },
      {
        message: 'Use `Object.getOwnPropertyDescriptor` instead.',
        property: '__lookupSetter__'
      }
    ],
    'no-restricted-syntax': [
      'warn',
      'ForInStatement',
      'DebuggerStatement',
      'LabeledStatement',
      'WithStatement',
      'TSEnumDeclaration[const=true]',
      'TSExportAssignment'
    ],
    'no-undef': ['error'],
    'no-underscore-dangle': 'warn',
    'no-unneeded-ternary': 'warn',
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_.+',
        varsIgnorePattern: '^_.+'
      }
    ],
    'no-useless-constructor': 'warn',
    'no-useless-escape': 'error',
    'no-var': 'error',
    'object-shorthand': 'warn',
    'one-var': ['warn', 'never'],
    'prefer-arrow-callback': 'warn',
    'prefer-const': [
      'error',
      { destructuring: 'any', ignoreReadBeforeAssign: false }
    ],
    'prefer-destructuring': [
      'warn',
      {
        VariableDeclarator: { array: false, object: true },
        AssignmentExpression: { array: true, object: false }
      },
      { enforceForRenamedProperties: false }
    ],
    'prefer-rest-params': 'off',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    radix: 'warn',
    'spaced-comment': ['error', 'always', { markers: ['/'] }]
  };

  const stylisticRules = {
    'max-len': [
      'error',
      {
        code: 80,
        ignoreStrings: true,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true
      }
    ],
    'no-confusing-arrow': 'warn',
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['%', '**'],
          ['%', '+'],
          ['%', '-'],
          ['%', '*'],
          ['%', '/'],
          ['&', '|', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!=='],
          ['&&', '||']
        ],
        allowSamePrecedence: false
      }
    ],
    quotes: ['warn', 'single', { allowTemplateLiterals: false }]
  };

  const configs = [
    {
      languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        globals: {
          // There's no globals.es2022
          ...globals.es2021,
          ...globals.browser,
          ...globals.node,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly'
        }
      },
      linterOptions: {
        reportUnusedDisableDirectives: true
      },
      rules: {
        ...rules,
        ...stylisticRules
      }
    },
    // allow all types of output in scripts
    {
      files: [`scripts/${GLOB_SRC}`],
      rules: {
        'no-console': 'off'
      }
    }
  ];

  return configs;
}
