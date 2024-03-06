import { Image } from '@mantine/core';
import { animated, useSpring } from '@react-spring/web';
import { FC, useEffect, useState } from 'react';
import classes from './MenuLabel.module.css';

export const MenuLabel: FC<{
  current: string;
}> = ({ current }) => {
  const [displayCurrent, setDisplayCurrent] = useState(current);

  const fadeIn = useSpring({
    to: { opacity: 1, transform: 'translate(-50%, -50%)' },
    from: { opacity: 0, transform: 'translate(-50%, 0%)' },
    reverse: !current,
    onRest: () => {
      if (!current) {
        setDisplayCurrent(current);
      }
    },
  });

  useEffect(() => {
    if (current) {
      setDisplayCurrent(current);
    }
  }, [current]);

  return (
    <animated.div style={fadeIn} className={classes.menuLabel}>
      {displayCurrent && (
        <Image fit="contain" height={100} src={`/assets/images/home/${displayCurrent}.png`} />
      )}
    </animated.div>
  );
};
