import { PartialDeep } from 'type-fest';
import { getLeafPaths } from './utils';

export const printTranslationMissingLeaves = <
  Translation extends Record<string, any> = object,
  Locale extends string = string,
>(
  defaultLocale: Translation,
  translations: Record<Locale, PartialDeep<Translation>>,
) => {
  const defaultLeaves = getLeafPaths(defaultLocale);
  Object.entries(translations).forEach(([key, lang]: [string, any]) => {
    const leaves = new Set(getLeafPaths(lang));
    const result = new Set(defaultLeaves);
    leaves.forEach((leaf) => {
      result.delete(leaf);
    });
    const resultArray = Array.from(result);

    if (resultArray.length) {
      console.warn(
        `Missing translations for language: \n\n ${key.toUpperCase()}
        \n${resultArray.join('\n')}`,
      );
    }
  });
};
