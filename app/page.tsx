'use client';

import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { KukuIcon } from '@/components/Icons/KukuIcon';
import { YoyoIcon } from '@/components/Icons/YoyoIcon';
import { AppHeader } from '@/components/AppHeader/AppHeader';

import classes from './page.module.css';

const menuItems = ['Connect Wallet', 'Mint NFT', 'Chat Gallery'];

export default function HomePage() {
  const [activeMenu, setActiveMenu] = useState('');

  const fadeIn = useSpring({
    to: { opacity: 1, transform: 'translate(-50%, -50%)' },
    from: { opacity: 0, transform: 'translate(-50%, 0%)' },
    reset: true,
    reverse: activeMenu === '',
  });

  return (
    <div className={classes.container}>
      <AppHeader />
      <div className={classes.menuContainer}>
        {menuItems.slice(0, 1).map((item, index) => (
          <div
            key={index}
            className={classes.menuItem}
            onMouseEnter={() => setActiveMenu(item)}
            onMouseLeave={() => setActiveMenu('')}
          />
        ))}
      </div>
      <div className={classes.menuContainer}>
        {menuItems.slice(1).map((item, index) => (
          <div
            key={index}
            className={classes.menuItem}
            onMouseEnter={() => setActiveMenu(item)}
            onMouseLeave={() => setActiveMenu('')}
          />
        ))}
      </div>
      <animated.div style={fadeIn} className={classes.menuLabel}>
        {activeMenu}
      </animated.div>
      <div className={classes.iconsContainer}>
        <YoyoIcon size={180} />
        <KukuIcon size={230} />
      </div>
    </div>
  );
}
