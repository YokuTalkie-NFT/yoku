'use client';

import React, { useState } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { AppHeader } from '@/components/AppHeader/AppHeader';
import MenuItem, { MenuItems } from '@/components/MenuItem/MenuItem';

import classes from './page.module.css';
import useMousePosition from '@/lib/use-mouse-position';
import { KeyCode } from '@/util/code.enum';
import { AnimatedStar } from '@/components/AnimatedStar/AnimatedStar';
import { AnimatedPlanet } from '@/components/AnimatedPlanet/AnimatedPlanet';
import { AnimatedCharacterKuku } from '@/components/AnimatedCharacterKuku/AnimatedCharacterKuku';
import { AnimatedCharacterYoyo } from '@/components/AnimatedCharacterYoyo/AnimatedCharacterYoyo';
import { MenuLabel } from '@/components/MenuLabel/MenuLabel';

export default function HomePage() {
  const { open } = useWeb3Modal();
  const mousePosition = useMousePosition();

  const [activeMenu, setActiveMenu] = useState('');

  const handleMenuItemClick = (item: (typeof menuItems)[0]) => {
    switch (item) {
      case 'wallet':
        open();
    }
  };

  const handleMouseHovering = (item: MenuItems) => setActiveMenu(item);

  const handleMouseLeaving = () => setActiveMenu('');

  return (
    <div className={classes.container}>
      <AppHeader />
      <AnimatedPlanet mousePosition={mousePosition} />
      <AnimatedStar mousePosition={mousePosition} />
      <div className={classes.menuContainerTop}>
        <MenuItem
          item="wallet"
          onClick={handleMenuItemClick}
          onMouseHovering={handleMouseHovering}
          onMouseLeaving={handleMouseLeaving}
          keyCode={KeyCode.KeyA}
          index={0}
        />
        <MenuItem
          item="mint"
          onClick={handleMenuItemClick}
          onMouseHovering={handleMouseHovering}
          onMouseLeaving={handleMouseLeaving}
          keyCode={KeyCode.KeyS}
          index={0}
        />
      </div>
      <div className={classes.menuContainerBottom}>
        <MenuItem
          item="gallery"
          onClick={handleMenuItemClick}
          onMouseHovering={handleMouseHovering}
          onMouseLeaving={handleMouseLeaving}
          keyCode={KeyCode.KeyD}
          index={0}
        />
      </div>
      <MenuLabel visible={Boolean(activeMenu)} current={activeMenu} />
      <div className={classes.iconsContainer}>
        <AnimatedCharacterYoyo mousePosition={mousePosition} />
        <AnimatedCharacterKuku mousePosition={mousePosition} />
      </div>
    </div>
  );
}
