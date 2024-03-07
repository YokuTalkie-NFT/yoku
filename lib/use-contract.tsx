import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { useCallback, useEffect } from 'react';
import YokuTalkieABI from '../contracts/YokuTalkie.json';

interface YokuTalkieContractEvents {
  onStart?: () => void;
  onError?: (error: Error) => void;
  onSuccess?: (identifier: string) => void;
}

export const useYokuTalkieContract = ({
  onError,
  onSuccess,
  onStart,
}: YokuTalkieContractEvents) => {
  const { address } = useAccount();
  const { writeContract, isSuccess, isError, isPending, data } = useWriteContract();

  useReadContract({
    address: process.env.NEXT_PUBLIC_APP_CONTRACT_ADDRESS as `0x${string}`,
    abi: YokuTalkieABI.abi,
    functionName: 'mint',
    args: [],
  });

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      onSuccess?.('');
    }
    if (isError) {
      onError?.(new Error('Failed to mint NFT'));
    }
  }, [isSuccess, isError]);

  const mint = useCallback(() => {
    onStart?.();
    writeContract({
      address: process.env.NEXT_PUBLIC_APP_CONTRACT_ADDRESS as `0x${string}`,
      abi: YokuTalkieABI.abi,
      functionName: 'mintNFT',
      args: [address],
      value: BigInt('5000000000000000'),
    });
  }, [address]);

  return { mint, done: isSuccess, pending: isPending, error: isError };
};
