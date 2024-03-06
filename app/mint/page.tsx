'use client';

import React, { useState } from 'react';
import { animated } from '@react-spring/web';
import toast from 'react-hot-toast';
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

export default function MintPage() {
  const [loading, setLoading] = useState(false);
  const mousePosition = useMousePosition();
  const { animatedProps } = useSwitchPageAnimation();

  const { mint, pending } = useYokuTalkieContract({
    onStart: () => setLoading(true),
    onError: () => toast('Minting NFT failed', { icon: '❌' }),
    onSuccess: () => {
      // 能不能帮我轮询问contract的状态获得mint的结果
    },
  });

  return (
    <animated.div style={animatedProps}>
      <div className={classes.mintContainer}>
        <AppHeader />
        <AnimatedEarth mousePosition={mousePosition} />
        <AnimatedMountain mousePosition={mousePosition} />
        <AnimatedBubbles mousePosition={mousePosition} />
        <AnimatedBox loading={pending} />
        <MintButton onMint={() => mint()} />
      </div>
    </animated.div>
  );
}
