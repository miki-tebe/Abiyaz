import React from 'react';
import Link from 'next/link';
import { Button, Flex, Spacer, useColorMode } from '@chakra-ui/react';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header className="body-font">
      <Flex>
        <Link href="/">
          <a className="flex title-font font-medium m-8 md:mb-0 hover:underline">
            Home
          </a>
        </Link>
        <Spacer />
        <Button onClick={toggleColorMode} className="m-4">
          {colorMode === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </Flex>
    </header>
  );
};

export default Header;
