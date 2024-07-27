import { useEffect, useState } from 'react';
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
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
  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier>();

  useEffect(() => {
    const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: (response: any) => {
        console.log('response', response);
      },
      'expired-callback': () => {
        console.log('expired-callback');
      },
    });
    setRecaptchaVerifier(appVerifier);
  }, []);

  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  const phoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (/^\+\d{2,12}$/.test(text)) setPhoneNumber(text);
  };

  const otpChange = (value: string) => setOtp(value);

  const generateOTP = async () => {
    setError('');
    if (/^\+\d{12}$/.test(phoneNumber)) {
      try {
        if (!recaptchaVerifier) return;
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          recaptchaVerifier
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
    try {
      if (otp && otp.length === 6) {
        const credential = await confirmationResult?.confirm(otp);

        const idToken = await credential?.user.getIdToken();
        console.log('idToken', idToken);

        const result = await signIn('firebase-phone', {
          idToken,
          redirect: false,
        });
        if (result?.error) {
          console.log('error', result.error);
          setError("User doesn't exist");
        }
      }
    } catch (error) {}
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
