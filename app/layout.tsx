import '@mantine/core/styles.css';
import React from 'react';
import { ColorSchemeScript } from '@mantine/core';
import { cookieToInitialState } from 'wagmi';
import { headers } from 'next/headers';
import { Amatic_SC } from 'next/font/google';
import { Providers } from '@/app/providers';
import { config } from '@/util/constants';

export const metadata = {
  title: 'YokuTalkie NFT',
  description: 'Mint and meet',
};

const amaticSC = Amatic_SC({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({ children }: { children: any }) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));

  return (
    <html lang="en" className={amaticSC.className}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  );
}
