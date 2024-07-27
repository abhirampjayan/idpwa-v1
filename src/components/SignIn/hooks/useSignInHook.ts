import { useEffect, useState } from 'react';
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

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
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [validatingPhone, setValidatingPhone] = useState(false);

  const router = useRouter();

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
      setValidatingPhone(true);
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
        setValidatingPhone(false);
      } catch (error) {
        setValidatingPhone(false);
      }
    } else {
      setError('Invalid phone number');
    }
  };

  const confirmOtp = async () => {
    if (!verificationId) return;
    try {
      if (otp && otp.length === 6) {
        setIsVerifyingOtp(true);
        const credential = await confirmationResult?.confirm(otp);
        const idToken = await credential?.user.getIdToken();
        const response = await signIn('firebase-phone', {
          idToken,
          redirect: false,
        });
        if (response?.ok) {
          const isNewUser = response.url?.includes('isNewUser=true');
          if (isNewUser) router.push('/register');
          else router.push('/dashboard'); // or wherever you want to redirect existing users
        }
        if (response?.error) setError("User doesn't exist");
        setIsVerifyingOtp(false);
      }
    } catch (error) {
      setIsVerifyingOtp(false);
    }
  };

  return {
    phoneNumber,
    error,
    verificationId,
    otp,
    validatingPhone,
    isVerifyingOtp,
    phoneNumberChange,
    generateOTP,
    otpChange,
    confirmOtp,
  };
};

export default useSignInHook;
