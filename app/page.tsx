'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Image } from '@mantine/core';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { throttle } from 'lodash';
import { KukuIcon } from '@/components/Icons/KukuIcon';
import { YoyoIcon } from '@/components/Icons/YoyoIcon';
import { AppHeader } from '@/components/AppHeader/AppHeader';

import classes from './page.module.css';

const menuItems: ('wallet' | 'mint' | 'chat')[] = ['wallet', 'mint', 'chat'];

export default function HomePage() {
  const { open } = useWeb3Modal();

  const [activeMenu, setActiveMenu] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 创建一个ref数组，用于存储每个菜单项的ref
  const menuItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const fadeIn = useSpring({
    to: { opacity: 1, transform: 'translate(-50%, -50%)' },
    from: { opacity: 0, transform: 'translate(-50%, 0%)' },
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
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setMousePosition({ x, y });

      const foundMenuItem = menuItems.find((_, index) => {
        const menuItemElement = menuItemRefs.current[index];
        if (!menuItemElement) return false;

        const { left, top, right, bottom } = menuItemElement.getBoundingClientRect();
        return x >= left && x <= right && y >= top && y <= bottom;
      });

      if (foundMenuItem !== activeMenu) {
        setActiveMenu(foundMenuItem || '');
      }
    };

    const throttled = throttle(handleMouseMove, 100);

    window.addEventListener('mousemove', throttled);

    return () => {
      window.removeEventListener('mousemove', throttled);
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
            ref={(el) => (menuItemRefs.current[index] = el)} // 将元素存储到ref数组中
            onClick={() => handleMenuItemClick(item)}
          />
        ))}
      </div>
      <div className={classes.menuContainerBottom}>
        {menuItems.slice(2).map((item, index) => (
          <div
            key={index}
            className={classes.menuItem}
            ref={(el) => (menuItemRefs.current[index + 2] = el)} // 注意这里的index需要加2
            onClick={() => handleMenuItemClick(item)}
          />
        ))}
      </div>
      <animated.div style={fadeIn} className={classes.menuLabel}>
        {activeMenu && (
          <Image fit="contain" height={100} src={`/assets/images/${activeMenu}.png`} />
        )}
      </animated.div>
      <div className={classes.iconsContainer}>
        <YoyoIcon size={180} />
        <KukuIcon size={230} />
      </div>
    </div>
  );
}
