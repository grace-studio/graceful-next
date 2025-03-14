import { Header } from '@/components/DemoBlock';
import {
  GTMInitialize,
  ThemeProvider,
} from '@grace-studio/graceful-next/components';
import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const locale = (await params).locale;

  return (
    <html lang="en">
      <GTMInitialize id={process.env.NEXT_PUBLIC_GTM_ID} />
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale}>
          <ThemeProvider>
            <Header />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
