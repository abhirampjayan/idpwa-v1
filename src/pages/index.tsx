import Image from 'next/image';
import { Inter } from 'next/font/google';
import SignIn from '@/components/SignIn';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <div className='grid grid-cols-2 w-screen grow'>
        <div className='relative'>
          <Image
            src='/idpwa.png'
            alt='IDPWA'
            fill={true}
            className='object-cover'
          />
        </div>
        <div className='flex flex-col justify-center items-center gap-6'>
          <h1 className='text-4xl capitalize font-bold'>Sign In</h1>
          <SignIn />
        </div>
      </div>
    </main>
  );
}
