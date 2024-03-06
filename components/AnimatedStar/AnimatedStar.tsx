'use client';

import { animated, useSpring } from '@react-spring/web';
import { Image } from '@mantine/core';
import { FC } from 'react';
import classes from './AnimatedStar.module.css';

interface AnimatedStarProps {
  mousePosition: { x: number; y: number };
}

export const AnimatedStar: FC<AnimatedStarProps> = ({ mousePosition }) => {
  const starMove = useSpring({
    to: {
      transform: `translate(${mousePosition.x / 50}px, ${-mousePosition.y / 50}px)`,
    },
  });

  return (
    <animated.div style={starMove}>
      <Image className={classes.animatedStar} src="/assets/images/home/star.png" />
    </animated.div>
  );
};
