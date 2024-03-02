'use client';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Button } from '@mantine/core';

export default function ConnectButton() {
  const { open } = useWeb3Modal();

  return (
    <>
      <Button onClick={() => open()}>Connect</Button>
    </>
  );
}
