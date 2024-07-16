import { initFirestore } from '@auth/firebase-adapter';
import { cert, getApp } from 'firebase-admin/app';
import * as admin from 'firebase-admin';

const privateKey = process.env.AUTH_FIREBASE_PRIVATE_KEY
  ? process.env.AUTH_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;
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

if (admin.apps.length) {
  try {
    admin.initializeApp({
      credential: cert({
        projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
        clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error);
  }
}

export const firestore = initFirestore({
  credential: cert({
    projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
    clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
    privateKey,
  }),
});

export default admin;
