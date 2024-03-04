import { Image } from '@mantine/core';
import { animated, useSpring } from '@react-spring/web';
import { FC, useEffect, useState } from 'react';
import classes from './MenuLabel.module.css';

export const MenuLabel: FC<{
  visible: boolean;
  current: string;
}> = ({ visible, current }) => {
  const [displayCurrent, setDisplayCurrent] = useState(current);

  const fadeIn = useSpring({
    to: { opacity: 1, transform: 'translate(-50%, -50%)' },
    from: { opacity: 0, transform: 'translate(-50%, 0%)' },
    reverse: !visible,
    onRest: () => {
      if (!visible) {
        setDisplayCurrent(current);
      }
    },
  });

  useEffect(() => {
    if (visible) {
      setDisplayCurrent(current);
    }
  }, [visible, current]);

  return (
    <animated.div style={fadeIn} className={classes.menuLabel}>
      <Image fit="contain" height={100} src={`/assets/images/${displayCurrent}.png`} />
    </animated.div>
  );
};
