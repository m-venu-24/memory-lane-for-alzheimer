import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDaAW5hNZUqBasTKB3nmjsRXOU9DQth3tc',
  authDomain: 'memroy-lane.firebaseapp.com',
  projectId: 'memroy-lane',
  storageBucket: 'memroy-lane.firebasestorage.app',
  messagingSenderId: '682552655562',
  appId: '1:682552655562:web:ec369313d9b7f5b6c5fe33',
  measurementId: 'G-XKL8NYHKR3',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, analytics };