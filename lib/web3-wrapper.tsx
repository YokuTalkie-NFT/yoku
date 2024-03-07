import React, { ReactNode } from 'react';

import { State, WagmiProvider } from 'wagmi';
import { sepolia, optimism } from 'wagmi/chains';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const chains = [process.env.NODE_ENV === 'production' ? sepolia : sepolia] as const;

if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID) {
  throw new Error('Project ID is not defined');
}

if (!process.env.NEXT_PUBLIC_APP_URL) {
  throw new Error('App URL is not defined');
}

const metadata = {
  name: '',
  description: 'Web3Modal Example',
  url: process.env.NEXT_PUBLIC_APP_URL,
  icons: [process.env.NEXT_PUBLIC_WAGMI_ICON_URL as string],
};

export const config = defaultWagmiConfig({
  chains,
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
  metadata,
  enableCoinbase: false,
});

const queryClient = new QueryClient();

if (!config) throw new Error('Project ID is not defined');

createWeb3Modal({
  wagmiConfig: config,
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
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
