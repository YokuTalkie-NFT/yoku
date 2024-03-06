'use client';

import { animated, useSpring } from '@react-spring/web';
import { Image } from '@mantine/core';
import { FC } from 'react';
import classes from './AnimatedBubbles.module.css';

interface AnimatedStarProps {
  mousePosition: { x: number; y: number };
}

export const AnimatedBubbles: FC<AnimatedStarProps> = ({ mousePosition }) => {
  const move = useSpring({
    to: {
      transform: `translate(${mousePosition.x / 100}px, -${mousePosition.y / 80}px)`,
    },
  });

  return (
    <animated.div style={move}>
      <Image className={classes.animatedBubbles} src="/assets/images/mint/bubbles.png" />
    </animated.div>
  );
};
