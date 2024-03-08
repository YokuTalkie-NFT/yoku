import React from 'react';
import Link from 'next/link';
import { Image } from '@mantine/core';

export const AppLogo: React.FC = () => (
  <>
    <Link href="home">
      <Image src="/assets/images/logo.png" height={28} alt="app logo" />
    </Link>
  </>
);
