import Image from 'next/image';
import { Inter } from 'next/font/google';
import SignIn from '@/components/SignIn';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

const inter = Inter({ subsets: ['latin'] });

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session)
    return {
      props: {},
    };

  if (!session.user?.isNewUser)
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  else
    return {
      redirect: {
        destination: '/register',
        permanent: false,
      },
    };
};

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <div className='grid md:grid-cols-2 w-screen grow'>
        <div className='hidden md:flex relative'>
          <Image
            src='/idpwa.png'
            alt='IDPWA'
            fill={true}
            className='object-cover'
          />
        </div>
        <div className='flex flex-col justify-center items-center gap-8 p-8'>
          <h1 className='text-4xl capitalize font-bold'>Sign In</h1>
          <SignIn />
        </div>
      </div>
    </main>
  );
}
