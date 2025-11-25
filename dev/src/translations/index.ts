import { createGetTranslations } from '@grace-studio/graceful-next/translations';
import * as translations from './lang';

export const getTranslation = createGetTranslations(
  translations.defaultLocale,
  translations,
);

export type Translations = ReturnType<typeof getTranslation>;
