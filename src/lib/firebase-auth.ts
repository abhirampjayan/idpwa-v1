import { cert } from 'firebase-admin/app';
import * as admin from 'firebase-admin';

// Ensure all required environment variables are set
const requiredEnvVars = [
  'AUTH_FIREBASE_PROJECT_ID',
  'AUTH_FIREBASE_CLIENT_EMAIL',
  'AUTH_FIREBASE_PRIVATE_KEY',
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Environment variable ${varName} is not set`);
  }
});

const privateKey = process.env.AUTH_FIREBASE_PRIVATE_KEY
  ? process.env.AUTH_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: cert({
        projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
        clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
    });
    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Firebase admin initialization error', error);
    throw error; // Re-throw the error to prevent the app from starting with incorrect Firebase setup
  }
}

export const db = admin.firestore();
export const auth = admin.auth();

export default admin;