import React, { FC, KeyboardEvent } from 'react';
import classes from './MenuItem.module.css';
import { KeyCode } from '@/util/code.enum';

export type MenuItems = 'wallet' | 'mint' | 'gallery';

interface MenuItemProps {
  item: MenuItems;
  onClick: (item: MenuItems) => void;
  onMouseHovering: (item: MenuItems) => void;
  onMouseLeaving: (item: MenuItems) => void;
  keyCode: KeyCode;
  index: number;
}

const MenuItem: FC<MenuItemProps> = ({
  item,
  onClick,
  keyCode,
  index,
  onMouseHovering,
  onMouseLeaving,
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === keyCode) {
      onClick(item);
    }
  };

  return (
    <div
      className={classes.menuItem}
      onClick={() => onClick(item)}
      onKeyDown={handleKeyDown}
      tabIndex={index}
      role="button"
      aria-label={`Activate ${item}`}
      onMouseEnter={() => onMouseHovering(item)}
      onMouseLeave={() => onMouseLeaving(item)}
    />
  );
};

export default MenuItem;
