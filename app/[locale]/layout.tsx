import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { routing } from '../../i18n/routing';
import { ThemeProvider } from '../context/ThemeContext';
import { SiteConfigProvider } from '../context/SiteConfigContext';
import { getSiteConfig } from '../../lib/supabase/queries';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const [messages, siteConfig] = await Promise.all([
    getMessages(),
    getSiteConfig(),
  ]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <SiteConfigProvider config={siteConfig}>
          {children}
        </SiteConfigProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
