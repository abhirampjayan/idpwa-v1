import Navbar from '@/components/common/Navbar';
import UserRegForm from '@/components/UserRegForm';
import React from 'react';

const SignUp = () => {
  return (
    <div className='flex flex-col bg-slate-50 min-h-screen '>
      <Navbar />
      <div className='flex grow'>
        <div className='container mt-12 gap-6 flex flex-col'>
          <h1 className='text-3xl font-bold capitalize'>
            Membership registration form
          </h1>
          <UserRegForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
