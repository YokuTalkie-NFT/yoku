'use client';

import React, { useEffect } from 'react';
import { animated } from '@react-spring/web';
import toast from 'react-hot-toast';
import { useAccount } from 'wagmi';
import useSwitchPageAnimation from '@/lib/use-switch-page-animation';
import { AppHeader } from '@/components/AppHeader/AppHeader';
import classes from './page.module.css';
import { AnimatedMountain } from '@/components/AnimatedMountain/AnimatedMountain';
import useMousePosition from '@/lib/use-mouse-position';
import { AnimatedEarth } from '@/components/AnimatedEarth/AnimatedEarth';
import { AnimatedBubbles } from '@/components/AnimatedBubbles/AnimatedBubbles';
import { AnimatedBox } from '@/components/AnimatedBox/AnimatedBox';
import { MintButton } from '@/components/MintButton/MintButton';
import { useYokuTalkieContract } from '@/lib/use-contract';
import { useNFTs } from '@/lib/use-NFTs';

export default function MintPage() {
  const mousePosition = useMousePosition();
  const { animatedProps } = useSwitchPageAnimation();

  const { address } = useAccount();
  const { NFTs, loading, refreshNFTs } = useNFTs(address!);

  useEffect(() => {
    console.log(NFTs);
  }, [NFTs]);

  const { mint, pending } = useYokuTalkieContract({
    onError: () => {
      toast('Minting NFT failed', { icon: '❌' });
    },
    onSuccess: async () => {
      await refreshNFTs();
    },
  });

  return (
    <animated.div style={animatedProps}>
      <div className={classes.mintContainer}>
        <AppHeader />
        <AnimatedEarth mousePosition={mousePosition} />
        <AnimatedMountain mousePosition={mousePosition} />
        <AnimatedBubbles mousePosition={mousePosition} />
        <AnimatedBox loading={loading || pending} />
        <MintButton disabled={pending || loading} onMint={() => mint()} />
      </div>
    </animated.div>
  );
}
