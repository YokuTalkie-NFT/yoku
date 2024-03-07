import React from 'react';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';

import classes from './MintButton.module.css';
import { KeyCode } from '@/util/code.enum';

interface MintButtonProps {
  onMint: () => void;
  disabled?: boolean;
}

export const MintButton: React.FC<MintButtonProps> = ({ onMint, disabled = false }) => {
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
      className={disabled ? classes.mintButtonDisabled : classes.mintButton}
      onClick={handleMint}
      onKeyDown={handleEnterPress}
    >
      Mint NFT
    </button>
  );
};
