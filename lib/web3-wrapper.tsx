import React, { ReactNode } from 'react';

import { State, WagmiProvider, cookieStorage, createStorage } from 'wagmi';
import * as chains from 'wagmi/chains';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID) {
  throw new Error('Project ID is not defined');
}

if (!process.env.NEXT_PUBLIC_APP_URL) {
  throw new Error('App URL is not defined');
}

const metadata = {
  name: process.env.NEXT_PUBLIC_APP_NAME as string,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION as string,
  url: process.env.NEXT_PUBLIC_APP_URL,
  icons: [process.env.NEXT_PUBLIC_APP_ICON_URL as string],
};

export const config = defaultWagmiConfig({
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  chains: [
    chains.optimism,
    chains.mainnet,
    chains.polygon,
    chains.linea,
    chains.arbitrum,
    chains.goerli,
    chains.sepolia,
    chains.optimismSepolia,
  ],
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
  metadata,
  enableCoinbase: true,
});

const queryClient = new QueryClient();

if (!config) throw new Error('Project ID is not defined');

createWeb3Modal({
  wagmiConfig: config,
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
  enableAnalytics: true,
  defaultChain: (chains as any)[process.env.NEXT_PUBLIC_APP_DEFAULT_CHAIN as string],
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
