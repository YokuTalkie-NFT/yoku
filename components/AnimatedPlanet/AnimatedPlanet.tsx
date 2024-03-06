'use client';

import { animated, useSpring } from '@react-spring/web';
import { Image } from '@mantine/core';
import { FC } from 'react';
import classes from './AnimatedPlanet.module.css';

interface AnimatedStarProps {
  mousePosition: { x: number; y: number };
}

export const AnimatedPlanet: FC<AnimatedStarProps> = ({ mousePosition }) => {
  const planetMove = useSpring({
    to: {
      transform: `translate(${-mousePosition.x / 100}px, ${mousePosition.y / 100}px)`,
    },
  });
  return (
    <animated.div style={planetMove}>
      <Image className={classes.animatedPlanet} src="/assets/images/home/planet.png" />
    </animated.div>
  );
};
