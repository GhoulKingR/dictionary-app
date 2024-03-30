interface License {
  name: string;
  url: string;
};

interface Phonetic {
  text?: string;
  audio?: string;
  license?: License
};

interface Definition {
  definition: string;
  example: string;
  synonyms: string[];
  antonyms: string[];
};

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
};

export interface SearchResult {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  license: License;
  sourceUrls: string;
};

export interface Error {
  happened: boolean;
  title?: string;
  resolution?: string;
  message?: string;
}

export interface State {
  searchResults: SearchResult[];
  looking: boolean;
  looked: boolean;
  error: Error;
  lightMode: boolean;
  font: Font;
};

export interface Action {
  type: DispatchAction;
  data?: any;
};

export enum DispatchAction {
  SearchResult,
  ChangeLooking,
  ChangeLooked,
  ChangeError,
  ToggleLightMode,
  ChangeFont,
};

export enum Font {
  SansSerif,
  Serif,
  Mono,
};

export const toClass: any = {};
toClass[Font.SansSerif] = "SansSerif";
toClass[Font.Serif] = "Serif";
toClass[Font.Mono] = "Mono";