'use client';

import { Group, Box } from '@mantine/core';
import classes from './AppHeader.module.css';
import { AppLogo } from '@/components/AppLogo/AppLogo';

export function AppHeader() {
  return (
    <header className={classes.header}>
      <Group justify="space-between" h="100%">
        <AppLogo />
      </Group>
    </header>
  );
}
