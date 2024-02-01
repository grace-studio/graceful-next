export const locales = ['sv', 'en'];

export const getStaticLocaleParams = () => {
  return locales.map((locale) => ({
    lang: locale,
  }));
};
