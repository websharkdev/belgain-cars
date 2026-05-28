import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { ELanguage, SUPPORTED_LANGUAGES } from '@/i18n/locales';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: SUPPORTED_LANGUAGES,

  // Used when no locale matches
  defaultLocale: ELanguage.EN,
  
  // Don't use a locale prefix in the URL
  localePrefix: 'never'
});

// Lightweight wrappers around Next.js' navigation APIs
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
