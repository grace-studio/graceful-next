'use client';

import { createUseTranslation } from '@grace-studio/graceful-next/hooks';
import * as translations from '../translations';

export const useTranslation = createUseTranslation(
  translations.defaultLocale,
  translations,
);
