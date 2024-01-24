'use client';
import { useRouter } from 'next/router';
import type { PartialDeep } from 'type-fest';
import { Leaves } from '../types';

const getLeaf = (obj: any, keys: string[]): string | null => {
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

  return getLeaf(obj[key], keys.slice(1));
};

type TreeLeaf = {
  [key: string]: string | TreeLeaf;
};

const getLeafPaths = (
  treeObject: TreeLeaf,
  currentPath: string[] = [],
): string[] => {
  const leafPaths: string[] = [];

  const traverse = (node: TreeLeaf, path: string[]): void => {
    if (typeof node === 'string') {
      leafPaths.push(path.join('.'));

      return;
    }

    if (typeof node === 'object' && node !== null) {
      for (const key in node) {
        if (node.hasOwnProperty(key)) {
          traverse(node[key] as TreeLeaf, [...path, key]);
        }
      }
    }
  };

  traverse(treeObject, currentPath);

  return leafPaths;
};

const getTranslation = <Translation, Paths extends string>(
  translation: Translation,
  path: Paths,
) => getLeaf(translation, path.split('.'));

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
