import { mainnet } from 'wagmi/chains';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

export const WALLET_CONNECT_PROJECT_ID = '9057656e0d2c91bc145c546e622194c3';

// todo put config in next env file and specify envs
// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'http://127.0.0.1:3000', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const chains = [mainnet] as const;
export const config = defaultWagmiConfig({
  chains, // required
  projectId: WALLET_CONNECT_PROJECT_ID, // required
  metadata, // required
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: false, // Optional - true by default
});
