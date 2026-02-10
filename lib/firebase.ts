// Firebase Configuration
// Replace these with your Firebase project credentials from Firebase Console
import type { FirebaseOptions } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const missingEnv = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingEnv.length) {
  throw new Error(
    `Missing Firebase env vars: ${missingEnv.join(
      ', '
    )}. Please set NEXT_PUBLIC_FIREBASE_* values from your Firebase project settings.`
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

export default app;

/* 
  HOW TO SET UP FIREBASE:
  
  1. Go to https://console.firebase.google.com/
  2. Create a new Firebase project
  3. Go to Project Settings and copy your Web App config
  4. Add these environment variables to your Vercel project:
     - NEXT_PUBLIC_FIREBASE_API_KEY
     - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
     - NEXT_PUBLIC_FIREBASE_PROJECT_ID
     - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
     - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
     - NEXT_PUBLIC_FIREBASE_APP_ID
  
  5. Enable Google Sign-In in Firebase Authentication:
     - Go to Authentication > Sign-in method
     - Enable Google provider
  
  6. Create a Firestore database:
     - Go to Firestore Database
     - Create database in production mode
     - Set security rules to allow authenticated users to read/write their own data
*/
