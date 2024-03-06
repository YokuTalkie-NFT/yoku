'use client';

import { animated, useSpring } from '@react-spring/web';
import { Image } from '@mantine/core';
import { FC } from 'react';
import classes from './AnimatedEarth.module.css';

interface AnimatedStarProps {
  mousePosition: { x: number; y: number };
}

export const AnimatedEarth: FC<AnimatedStarProps> = ({ mousePosition }) => {
  const move = useSpring({
    to: {
      transform: `translate(-${mousePosition.x / 50}px, ${mousePosition.y / 50}px)`,
    },
  });

  return (
    <animated.div style={move}>
      <Image className={classes.animatedEarth} src="/assets/images/mint/earth.png" />
    </animated.div>
  );
};
