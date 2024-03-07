import { animated, useSpring } from '@react-spring/web';
import { Image } from '@mantine/core';
import React, { FC } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import classes from './AnimatedMintedNFT.module.css';
import { Nft } from '@/graphql/generated/client-types/graphql';

interface AnimatedMintedNFTProps {
  NFT: Nft;
  onMouseOver: () => void;
  onMouseLeave: () => void;
}

export const AnimatedMintedNFT: FC<AnimatedMintedNFTProps> = ({
  NFT,
  onMouseOver,
  onMouseLeave,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

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
      <div className={classes.animatedMintedNFTContainer} />
      <Image
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        className={classes.animatedMintedNFT}
        src={NFT.imageUrl.replace('ipfs.io', 'cloudflare-ipfs.com')}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
        }}
      >
        {isMobile && <div className={classes.nftLabel}>Click to view NFT</div>}
      </div>
    </animated.div>
  );
};
