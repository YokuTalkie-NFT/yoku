'use client';

import { animated, useSpring } from '@react-spring/web';
import { Image } from '@mantine/core';
import { FC } from 'react';
import classes from './AnimatedMintedNFT.module.css';
import { Nft } from '@/graphql/generated/client-types/graphql';

interface AnimatedMintedNFTProps {
  NFT: Nft;
}

export const AnimatedMintedNFT: FC<AnimatedMintedNFTProps> = ({ NFT }) => {
  const boxAnimation = useSpring({
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
    <animated.div style={boxAnimation}>
      <div className={classes.animatedMintedNFTContainer}>
        <Image
          className={classes.animatedMintedNFT}
          src={NFT.imageUrl.replace('ipfs.io', 'cloudflare-ipfs.com')}
        />
      </div>
    </animated.div>
  );
};
