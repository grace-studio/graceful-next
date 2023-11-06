const locales = ['en', 'sv'];

export const i18n = {
  defaultLocale: 'sv',
  localeDetection: false,
  locales: locales,
};

export type LocaleType = (typeof i18n)['locales'][number];

export const getStaticLocaleParams = () => {
  return locales.map((locale) => ({
    lang: locale,
  }));
};
