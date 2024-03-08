'use client';

import React, { useEffect, useState } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useRouter } from 'next/navigation';
import { animated } from '@react-spring/web';
import toast from 'react-hot-toast';
import classes from './page.module.css';
import { AppHeader } from '@/components/AppHeader/AppHeader';
import MenuItem, { MenuItems } from '@/components/MenuItem/MenuItem';

import useMousePosition from '@/lib/use-mouse-position';
import { KeyCode } from '@/util/code.enum';
import { AnimatedStar } from '@/components/AnimatedStar/AnimatedStar';
import { AnimatedPlanet } from '@/components/AnimatedPlanet/AnimatedPlanet';
import { AnimatedCharacterKuku } from '@/components/AnimatedCharacterKuku/AnimatedCharacterKuku';
import { AnimatedCharacterYoyo } from '@/components/AnimatedCharacterYoyo/AnimatedCharacterYoyo';
import { MenuLabel } from '@/components/MenuLabel/MenuLabel';
import useSwitchPageAnimation from '@/lib/use-switch-page-animation';

export default function HomePage() {
  const { push } = useRouter();
  const { open } = useWeb3Modal();
  const mousePosition = useMousePosition();
  const [activeMenu, setActiveMenu] = useState('');
  const { animatedProps, switchTo } = useSwitchPageAnimation();

  const handleMenuItemClick = (item: MenuItems) => {
    switch (item) {
      case 'wallet':
        open();
        break;
      case 'mint':
        switchTo(() => push('mint'));
        break;
      default:
        // todo: remove this
        toast('Coming soon!');
    }
  };

  const handleMouseHovering = (item: MenuItems) => setActiveMenu(item);

  const handleMouseLeaving = () => setActiveMenu('');

  return (
    <animated.div style={animatedProps}>
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
        <MenuLabel current={activeMenu} />
        <div className={classes.characterContainer}>
          <AnimatedCharacterYoyo active={Boolean(activeMenu)} mousePosition={mousePosition} />
          <AnimatedCharacterKuku active={Boolean(activeMenu)} mousePosition={mousePosition} />
        </div>
      </div>
    </animated.div>
  );
}
