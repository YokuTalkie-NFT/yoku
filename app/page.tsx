'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Image } from '@mantine/core';
import debounce from 'lodash/debounce';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { KukuIcon } from '@/components/Icons/KukuIcon';
import { YoyoIcon } from '@/components/Icons/YoyoIcon';
import { AppHeader } from '@/components/AppHeader/AppHeader';

import classes from './page.module.css';

const menuItems: ('wallet' | 'mint' | 'chat')[] = ['wallet', 'mint', 'chat'];

export default function HomePage() {
  const { open } = useWeb3Modal();

  const [activeMenu, setActiveMenu] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const setActiveMenuDebounced = useCallback(debounce(setActiveMenu, 100, { leading: false }), []);

  const fadeIn = useSpring({
    to: { opacity: 1, transform: 'translate(-50%, -50%)' },
    from: { opacity: 0, transform: 'translate(-50%, 0%)' },
    reset: true,
    reverse: activeMenu === '',
  });

  const planetMove = useSpring({
    to: {
      transform: `translate(${-mousePosition.x / 100}px, ${mousePosition.y / 100}px)`,
    },
  });

  const starMove = useSpring({
    to: {
      transform: `translate(${mousePosition.x / 50}px, ${-mousePosition.y / 50}px)`,
    },
  });

  const handleMenuItemClick = (item: (typeof menuItems)[0]) => {
    switch (item) {
      case 'wallet':
        open();
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={classes.container}>
      <AppHeader />
      <animated.div style={planetMove}>
        <Image className={classes.planetImage} src="/assets/images/planet.png" />
      </animated.div>
      <animated.div style={starMove}>
        <Image className={classes.starImage} src="/assets/images/star.png" />
      </animated.div>
      <div className={classes.menuContainerTop}>
        {menuItems.slice(0, 2).map((item, index) => (
          <div
            key={index}
            className={classes.menuItem}
            onMouseEnter={() => setActiveMenuDebounced(item)}
            onMouseLeave={() => setActiveMenu('')}
            onClick={() => handleMenuItemClick(item)} // 添加点击事件
          />
        ))}
      </div>
      <div className={classes.menuContainerBottom}>
        {menuItems.slice(2).map((item, index) => (
          <div
            key={index}
            className={classes.menuItem}
            onMouseEnter={() => setActiveMenuDebounced(item)}
            onMouseLeave={() => setActiveMenu('')}
            onClick={() => handleMenuItemClick(item)} // 添加点击事件
          />
        ))}
      </div>
      {activeMenu && (
        <animated.div style={fadeIn} className={classes.menuLabel}>
          <Image fit="contain" height={100} src={`/assets/images/${activeMenu}.png`} />
        </animated.div>
      )}
      <div className={classes.iconsContainer}>
        <YoyoIcon size={180} />
        <KukuIcon size={230} />
      </div>
      <audio src="/assets/audios/background.mp3" autoPlay loop />
    </div>
  );
}
