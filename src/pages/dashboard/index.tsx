import React from 'react';

type Props = {};

import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Your server-side logic here
  // ...
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session?.expires);
  console.log(session?.user);
  return {
    props: {
      // Pass any data you want to the component as props
      // ...
    },
  };
};

const index = (props: Props) => {
  return <div>index</div>;
};

export default index;
