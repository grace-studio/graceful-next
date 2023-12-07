'use client';
import { useRouter } from 'next/router';
import type { PartialDeep } from 'type-fest';
import { Leaves } from '../types';

const getLeave = (obj: any, keys: string[]): string | null => {
  const [key] = keys;

  if (!obj) {
    return null;
  }

  if (typeof obj === 'string') {
    return obj;
  }

  if (typeof obj[key] === 'string') {
    return obj[key];
  }

  return getLeave(obj[key], keys.slice(1));
};

const getTranslation = <Translation, Paths extends string>(
  translation: Translation,
  path: Paths,
) => getLeave(translation, path.split('.'));

export const createUseTranslation =
  <
    Translation extends Record<string, any> = object,
    Locale extends string = string,
  >(
    defaultLocale: Translation,
    translations: Record<Locale, PartialDeep<Translation>>,
    router: 'app' | 'pages' = 'app',
    verbose?: boolean,
  ) =>
  (locale?: Locale | string) => {
    type Paths = Leaves<typeof defaultLocale>;

    let _locale = locale as Locale;
    if (router === 'pages') {
      _locale = useRouter().locale as Locale;
    }

    if (!_locale) {
      console.error('createUseTranslation: No locale provided');
    }

    if (_locale && translations && !translations[_locale]) {
      console.error(
        `createUseTranslation: No translations provided for locale: '${_locale}'`,
      );
    }

    const localeTranslation =
      _locale && translations ? translations[_locale] : {};

    return (path: Paths) => {
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
    };
  };
