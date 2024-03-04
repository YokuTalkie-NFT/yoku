'use client';

import React, { ReactNode } from 'react';
import { createWeb3Modal } from '@web3modal/wagmi/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { State, WagmiProvider } from 'wagmi';
import { config, WALLET_CONNECT_PROJECT_ID } from '@/util/constants';

// Setup queryClient
const queryClient = new QueryClient();

if (!config) throw new Error('Project ID is not defined');

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId: WALLET_CONNECT_PROJECT_ID,
  enableAnalytics: false,
});

export function Web3Wrapper({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
