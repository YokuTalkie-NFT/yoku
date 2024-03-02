'use client';

import * as React from 'react';
import { MantineProvider } from '@mantine/core';
import { State } from 'wagmi';
import { ApolloWrapper } from '@/lib/apollo-wrapper';
import { theme } from '@/theme';
import { Web3Wrapper } from '@/lib/web3-wrapper';

export const Providers: React.FC<
  React.PropsWithChildren<{
    initialState?: State;
  }>
> = ({ children, initialState }) => (
  <ApolloWrapper>
    <Web3Wrapper initialState={initialState}>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </Web3Wrapper>
  </ApolloWrapper>
);
