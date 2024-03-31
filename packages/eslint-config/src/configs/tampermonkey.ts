import globals from 'globals';
import userscripts from 'eslint-plugin-userscripts';
import { GLOB_SRC_EXT } from '../matchers';
import { OptionsTampermonkey } from '../types';

export async function tampermonkey(options: OptionsTampermonkey = {}) {
  const files = options.matchers || [`**/*.user.${GLOB_SRC_EXT}`];
  return [
    {
      languageOptions: {
        globals: {
          ...globals.greasemonkey
        }
      }
    },
    {
      files,
      plugins: { userscripts },
      rules: {
        'userscripts/filename-user': 'off',
        'userscripts/no-invalid-grant': 'error',
        'userscripts/no-invalid-metadata': 'error',
        'userscripts/require-name': 'error',
        'userscripts/require-description': 'error',
        'userscripts/require-version': 'error',
        'userscripts/use-homepage-and-url': 'error',
        'userscripts/require-download-url': 'error',
        'userscripts/align-attributes': 'off',
        'userscripts/require-attribute-space-prefix': 'error',
        'userscripts/metadata-spacing': 'error',
        'userscripts/no-invalid-headers': 'error',
        'userscripts/compat-grant': 'off',
        'userscripts/compat-headers': 'off',
        'userscripts/better-use-match': 'error'
      }
    }
  ];
}
