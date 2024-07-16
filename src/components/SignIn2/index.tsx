import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import useSignInHook from './hooks/useSignInHook';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '../ui/input-otp';
import { signOut, useSession } from 'next-auth/react';

const SignIn = () => {
  const {
    phoneNumber,
    verificationId,
    otp,
    phoneNumberChange,
    generateOTP,
    otpChange,
    confirmOtp,
  } = useSignInHook();
  const session = useSession();
  if (session.data?.user)
    return (
      <div className='flex flex-col gap-6'>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    );
  return (
    <div className='flex flex-col gap-6'>
      <div id='recaptcha-container'></div>
      {verificationId ? (
        <>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='picture'>Phone Number</Label>
            <InputOTP maxLength={6} value={otp} onChange={otpChange}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Button size='lg' type='button' onClick={confirmOtp}>
              Confrim OTP
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='picture'>Phone Number</Label>
            <Input
              className='min-w-96 text-gray-500'
              name='phone'
              id='phone'
              value={phoneNumber}
              onChange={phoneNumberChange}
            />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Button size='lg' type='button' onClick={generateOTP}>
              Generate OTP
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SignIn;
