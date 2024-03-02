'use client';

import { Group, Divider, Box, Burger, Drawer, ScrollArea, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import classes from './HeaderMenu.module.css';
import { AppLogo } from '@/components/AppLogo/AppLogo';
import ConnectButton from '@/components/ConnectButton/ConnectButton';

const links = [
  { title: 'mint NFT', href: '/mint' },
  { title: 'Chat Gallery', href: '/chat-gallery' },
];

export function HeaderMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group h="100%" visibleFrom="sm">
            <AppLogo />
            {links.map((link) => (
              <Link href={link.href} className={classes.link}>
                {link.title}
              </Link>
            ))}
          </Group>

          <Group visibleFrom="sm">
            <ConnectButton />
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="90%"
        padding="md"
        title="YokuTalkie NFT"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          {links.map((link) => (
            <Link href={link.href} className={classes.link}>
              {link.title}
            </Link>
          ))}

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <ConnectButton />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
