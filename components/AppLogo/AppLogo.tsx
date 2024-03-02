import React from 'react';
import Link from 'next/link';
import { Image } from '@mantine/core';

export const AppLogo: React.FC = () => (
  <>
    <Link href="/">
      <Image src="/logo.png" height={30} alt="app logo" />
    </Link>
  </>
);
