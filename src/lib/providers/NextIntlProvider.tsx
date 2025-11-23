'use client';

import { IntlProvider } from 'next-intl';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  locale: string;
  messages: Record<string, unknown> | null | undefined;
};

const IntlClientProvider = ({ children, locale, messages }: Props) => {
  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
};

export default IntlClientProvider;
