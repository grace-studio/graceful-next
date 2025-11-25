import type { PartialDeep } from 'type-fest';
import { Leaves } from '../types';
import { getLeaf } from './utils';

const getTranslation = <Translation, Paths extends string>(
  translation: Translation,
  path: Paths,
) => getLeaf(translation, path.split('.'));

export const createGetTranslations =
  <
    Translation extends Record<string, any> = object,
    Locale extends string = string,
  >(
    defaultLocale: Translation,
    translations: Record<Locale, PartialDeep<Translation>>,
    verbose?: boolean,
  ) =>
  (locale: Locale | string) => {
    type Paths = Leaves<typeof defaultLocale>;

    if (!locale) {
      console.error('createUseTranslation: No locale provided');
    }

    const _locale = locale as Locale;

    if (_locale && translations && !translations[_locale]) {
      console.error(
        `createUseTranslation: No translations provided for locale: '${_locale}'`,
      );
    }

    const localeTranslation =
      _locale && translations ? translations[_locale] : {};

    function getT(path: Paths) {
      const str = getTranslation<Translation, Paths>(
        localeTranslation as Translation,
        path,
      );

      if (typeof str === 'string') {
        return str;
      }

      verbose &&
        console.warn(
          `getTranslation: No translation string found for path: '${path}', locale: '${_locale}'`,
        );

      const defaultStr = getTranslation<Translation, Paths>(
        defaultLocale as Translation,
        path,
      );

      if (typeof defaultStr === 'string') {
        return defaultStr;
      }

      verbose &&
        console.warn(
          `getTranslation: No translation string found for path: '${path}', locale: 'default'`,
        );

      return path;
    }

    return getT;
  };
