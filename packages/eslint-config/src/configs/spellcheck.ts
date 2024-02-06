import type { OptionsSpellcheck } from '../types';

import pluginSpellcheck from 'eslint-plugin-spellcheck';

export async function spellcheck(options: OptionsSpellcheck = {}) {
  return {
    plugins: { spellcheck: pluginSpellcheck },
    rules: {
      'spellcheck/spell-checker': [
        'warn',
        {
          comments: true,
          strings: true,
          identifiers: true,
          lang: 'en_US',
          minLength: 3,
          ...options
        }
      ]
    }
  };
}
