'use client';

import { animated, useSpring } from '@react-spring/web';
import { Image } from '@mantine/core';
import { FC } from 'react';
import classes from './AnimatedMountain.module.css';

interface AnimatedStarProps {
  mousePosition: { x: number; y: number };
}

export const AnimatedMountain: FC<AnimatedStarProps> = ({ mousePosition }) => {
  const move = useSpring({
    to: {
      transform: `translateY(-${mousePosition.y / 50}px)`,
    },
  });
  return (
    <animated.div style={move}>
      <Image className={classes.animatedMountain} src="/assets/images/mint/mountain.png" />
    </animated.div>
  );
};
