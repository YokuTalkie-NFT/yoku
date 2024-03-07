'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { animated } from '@react-spring/web';
import { useAudioPlayer } from '@/lib/use-audio';
import useMousePosition from '@/lib/use-mouse-position';
import useSwitchPageAnimation from '@/lib/use-switch-page-animation';
import classes from './page.module.css';
import { AnimatedDiamond } from '@/components/AnimatedDiamond/AnimatedDiamond';
import { DiamondHoverLabel } from '@/components/DiamondHoverLabel/DiamondHoverLabel';
import { KeyCode } from '@/util/code.enum';

export default function EntryPage() {
  const { replace } = useRouter();
  const { animatedProps, switchTo } = useSwitchPageAnimation();

  const { toggle, playing, setUrl } = useAudioPlayer();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setUrl('/assets/audios/background.mp3');

    if (!playing) {
      toggle();
    }

    switchTo(() => {
      replace('/home');
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === KeyCode.Enter) {
      handleClick();
    }
  };

  return (
    <animated.div style={animatedProps}>
      <div
        tabIndex={0}
        role="button"
        aria-label="Go to home page"
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        className={classes.entryContainer}
      >
        <AnimatedDiamond
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        <DiamondHoverLabel isHovered={isHovered} />
      </div>
    </animated.div>
  );
}
