import { type ParserOptions as TypescriptParserOptions } from '@typescript-eslint/parser';

type WithFilesOptions = {
  files?: string[];
};

export interface OptionsTampermonkey {
  matchers?: string[];
}

export interface OptionsSpellcheck {
  comments?: boolean;
  strings?: boolean;
  identifiers?: boolean;
  lang?: string;
  langDir?: string;
  skipWords?: string[];
  skipIfMatch?: string[];
  skipWordIfMatch?: string[];
  minLength?: number;
}

export interface OptionsTypescript extends WithFilesOptions {
  parserOptions?: Partial<TypescriptParserOptions>;
}

export interface UserConfig {
  spellcheck?: boolean | OptionsSpellcheck;
  prettier?: boolean;
  typescript?: boolean | OptionsTypescript;
  tampermonkey?: boolean | OptionsTampermonkey;
}
