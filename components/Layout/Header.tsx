import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
        <Link href="/">
          <a className="flex title-font font-medium text-grey-900 mb-4 md:mb-0 hover:underline">
            Home
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
