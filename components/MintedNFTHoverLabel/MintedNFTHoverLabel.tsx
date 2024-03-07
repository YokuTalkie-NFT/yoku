import { Image } from '@mantine/core';
import { animated, useSpring } from '@react-spring/web';
import { FC, useEffect, useState } from 'react';
import classes from './MintedNFTHoverLabel.module.css';

export const MintedNFTHoverLabel: FC<{
  isHovered: boolean;
}> = ({ isHovered }) => {
  const [display, setDisplay] = useState(isHovered);

  const fadeIn = useSpring({
    to: { opacity: 1, transform: 'translate(-50%, -50%)' },
    from: { opacity: 0, transform: 'translate(-50%, 0%)' },
    reverse: !isHovered,
    onRest: () => {
      if (!isHovered) {
        setDisplay(false);
      }
    },
  });

  useEffect(() => {
    if (isHovered) {
      setDisplay(true);
    }
  }, [isHovered]);

  return (
    <animated.div style={fadeIn} className={classes.mintedNFTHoverLabel}>
      {display && <Image fit="contain" height={100} src="/assets/images/mint/hover-nft.png" />}
    </animated.div>
  );
};
