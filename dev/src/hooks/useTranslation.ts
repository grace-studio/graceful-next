'use client';

import {
  Leaves,
  createUseTranslation,
} from '@grace-studio/graceful-next/hooks';
import * as translations from '../translations';

type TLeaves = Leaves<translations.Translation>;
export const useTranslation = createUseTranslation<TLeaves>(
  translations.defaultLocale,
  translations,
);
