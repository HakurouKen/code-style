import pluginSpellcheck from 'eslint-plugin-spellcheck';

export async function spellcheck() {
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
          minLength: 3
        }
      ]
    }
  };
}
