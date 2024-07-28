import React from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';

type Props = {
  // Define any props you want to pass to the component
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    // If there's no session, redirect to the home page
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // Check if the user is new
  if (session.user?.isNewUser) {
    // If the user is new, redirect to the register page
    return {
      redirect: {
        destination: '/register',
        permanent: false,
      },
    };
  }

  console.log(session.expires);
  console.log(session.user);

  return {
    props: {
      // Pass any data you want to the component as props
      // For example, you might want to pass some session data
      user: session.user,
    },
  };
};

const ProtectedPage = (props: Props) => {
  return <div>Protected Page Content</div>;
};

export default ProtectedPage;