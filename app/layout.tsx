import '@mantine/core/styles.css';
import React from 'react';
import { ColorSchemeScript } from '@mantine/core';
import { cookieToInitialState } from 'wagmi';
import { headers } from 'next/headers';
import { Providers } from '@/app/providers';
import { config } from '@/util/constants';

export const metadata = {
  title: 'YokuTalkie NFT',
  description: 'Mint and meet',
};

export default function RootLayout({ children }: { children: any }) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));

  return (
    <html lang="en">
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
