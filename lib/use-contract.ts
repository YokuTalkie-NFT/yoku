import { useAccount, useWriteContract } from 'wagmi';
import { useCallback } from 'react';
import YokuTalkieABI from '../contracts/YokuTalkie.json';

export const useYokuTalkieContract = () => {
  const { address } = useAccount();
  const { writeContract, isSuccess, isError, isPending } = useWriteContract();

  const mint = useCallback(() => {
    writeContract({
      address: process.env.NEXT_APP_CONTRACT_ADDRESS as `0x${string}`,
      abi: YokuTalkieABI.abi,
      functionName: 'mintNFT',
      args: [address],
      value: BigInt('5000000000000000'),
    });

    return {
      done: isSuccess,
      pending: isPending,
      error: isError,
    };
  }, [address]);

  return { mint };
};
