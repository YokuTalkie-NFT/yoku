'use client';

import { animated, useSpring } from '@react-spring/web';
import { Image } from '@mantine/core';
import React, { FC } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import classes from './AnimatedDiamond.module.css';

interface AnimatedMintedNFTProps {
  onMouseOver: () => void;
  onMouseLeave: () => void;
}

export const AnimatedDiamond: FC<AnimatedMintedNFTProps> = ({ onMouseOver, onMouseLeave }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const diamondAnimation = useSpring({
    from: { transform: 'translateY(0px)' },
    to: async (next) => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        // eslint-disable-next-line no-await-in-loop
        await next({ transform: 'translateY(-5px)' });
        // eslint-disable-next-line no-await-in-loop
        await next({ transform: 'translateY(0px)' });
      }
    },
    config: { duration: 500 },
  });

  return (
    <animated.div style={diamondAnimation}>
      <Image
        fit="contain"
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        className={classes.animatedDiamond}
        src="/assets/images/diamond.png"
      />
      {isMobile && <div className={classes.diamondLabel}>Touch Me</div>}
    </animated.div>
  );
};
