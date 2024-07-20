import Link from 'next/link';
import React from 'react';
import IDPWALogo from './IDPWALogo';
import { Button } from '../ui/button';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className='bg-slate-800 flex'>
      <div className='container flex justify-between items-center'>
        <div className='p-4'>
          <Link href='/'>
            <div className='flex items-center gap-4'>
              <IDPWALogo />
              <h1 className='text-4xl font-semibold text-gray-100'>IDPWA</h1>
            </div>
          </Link>
        </div>
        <div className='flex'>
          <Link href='/'>
            <Button className='bg-red-600 hover:bg-red-500'>Sign Out</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
