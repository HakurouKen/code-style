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

export interface UserConfig {
  spellcheck?: boolean | OptionsSpellcheck;
  prettier?: boolean;
}
