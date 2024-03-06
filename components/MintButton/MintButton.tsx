import React from 'react';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';

import classes from './MintButton.module.css';
import { KeyCode } from '@/util/code.enum';

interface MintButtonProps {
  onMint: () => void;
}

export const MintButton: React.FC<MintButtonProps> = ({ onMint }) => {
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();

  const handleMint = async () => {
    if (isConnected) {
      onMint();
    } else {
      await open();
    }
  };

  const handleEnterPress = async (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === KeyCode.Enter) {
      await handleMint();
    }
  };

  return (
    <button
      type="submit"
      className={classes.mintButton}
      onClick={handleMint}
      onKeyDown={handleEnterPress}
    >
      {isConnected ? 'Mint NFT' : 'Connect Wallet'}
    </button>
  );
};
