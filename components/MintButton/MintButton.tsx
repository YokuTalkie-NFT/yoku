import React from 'react';
import { useAccount } from 'wagmi';
import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react';
import * as chains from 'wagmi/chains';
import toast from 'react-hot-toast';
import classes from './MintButton.module.css';
import { KeyCode } from '@/util/code.enum';

interface MintButtonProps {
  onMint: () => void;
  disabled?: boolean;
}

export const MintButton: React.FC<MintButtonProps> = ({ onMint, disabled = false }) => {
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { selectedNetworkId } = useWeb3ModalState();

  const handleMint = async () => {
    if (!isConnected) {
      await open();
    } else if (
      selectedNetworkId !== (chains as any)[process.env.NEXT_PUBLIC_APP_DEFAULT_CHAIN as string].id
    ) {
      toast(`Please switch to ${process.env.NEXT_PUBLIC_APP_DEFAULT_CHAIN} network`);
    } else {
      onMint();
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
