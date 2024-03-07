'use client';

import { animated, useSpring } from '@react-spring/web';
import { Image } from '@mantine/core';
import { FC } from 'react';
import classes from './AnimatedBox.module.css';

interface AnimatedBoxProps {
  loading: boolean;
}

export const AnimatedBox: FC<AnimatedBoxProps> = ({ loading = false }) => {
  const boxAnimation = useSpring({
    from: { transform: loading ? 'translateX(0px)' : 'translateY(0px)' },
    to: async (next) => {
      if (loading) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          // eslint-disable-next-line no-await-in-loop
          await next({ transform: 'translateX(-12px)' });
          // eslint-disable-next-line no-await-in-loop
          await next({ transform: 'translateX(12px)' });
          // eslint-disable-next-line no-await-in-loop
          await next({ transform: 'translateX(-12px)' });
          // eslint-disable-next-line no-await-in-loop
          await next({ transform: 'translateX(0px)' });
          // eslint-disable-next-line no-await-in-loop
          await new Promise((resolve) => {
            setTimeout(resolve, 500);
          });
        }
      } else {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          // eslint-disable-next-line no-await-in-loop
          await next({ transform: 'translateY(-5px)' });
          // eslint-disable-next-line no-await-in-loop
          await next({ transform: 'translateY(0px)' });
        }
      }
    },
    config: loading ? { duration: 100 } : { duration: 500 },
  });

  return (
    <animated.div style={boxAnimation}>
      <Image className={classes.animatedBox} src="/assets/images/mint/box.png" />
    </animated.div>
  );
};
