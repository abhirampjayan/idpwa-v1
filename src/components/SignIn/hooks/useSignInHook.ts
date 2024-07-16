import { useState } from 'react';
import {
  ConfirmationResult,
  getAuth,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { app, firebaseConfig } from '@/lib/firebase';
import { signIn } from 'next-auth/react';

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

const useSignInHook = () => {
  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [error, setError] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [otp, setOtp] = useState<string>();

  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  const phoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (/^\+\d{2,12}$/.test(text)) setPhoneNumber(text);
  };

  const otpChange = (value: string) => setOtp(value);

  const generateOTP = async () => {
    console.log('firebaseConfig', firebaseConfig);

    if (/^\+\d{12}$/.test(phoneNumber)) {
      const auth = getAuth();
      const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response: any) => {
          console.log('response', response);
        },
      });

      try {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          appVerifier
        );
        if (confirmationResult.verificationId) {
          setVerificationId(confirmationResult.verificationId);
          setConfirmationResult(confirmationResult);
        }
      } catch (error) {
        console.log('error', error);
      }
    } else {
      setError('Invalid phone number');
    }
  };

  const confirmOtp = async () => {
    if (!verificationId) return;
    if (otp && otp.length === 6) {
      const credential = await confirmationResult?.confirm(otp);

      const idToken = await credential?.user.getIdToken();
      console.log('idToken', idToken);

      const result = await signIn('firebase-phone', {
        idToken,
        redirect: false,
      });

      console.log('result', result);

      console.log('credential', credential);
    }
  };

  return {
    phoneNumber,
    error,
    verificationId,
    otp,
    phoneNumberChange,
    generateOTP,
    otpChange,
    confirmOtp,
  };
};

export default useSignInHook;
