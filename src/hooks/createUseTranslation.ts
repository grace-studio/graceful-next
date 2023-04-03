import { useRouter } from 'next/router';

const getLeave = (obj: any, keys: string[]): any => {
  const [key] = keys;

  if (!obj) {
    return '';
  }

  if (typeof obj === 'string') {
    return obj;
  }

  if (typeof obj[key] === 'string') {
    return obj[key];
  }

  return getLeave(obj[key], keys.slice(1));
};

const getTranslation = <T, P extends string>(translation: T, path: P) =>
  getLeave(translation, path.split('.')) as string;

export const createUseTranslation =
  <
    P extends string,
    T extends Record<string, any> = object,
    L extends string = string
  >(
    translations: Record<L, T>
  ) =>
  () => {
    const { locale } = useRouter();
    const translation = translations[locale as L];

    const get = (path: P) => getTranslation<T, P>(translation, path);

    return {
      get,
    };
  };
