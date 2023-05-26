// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'dev-moa-da7b5.firebaseapp.com',
  projectId: 'dev-moa-da7b5',
  storageBucket: 'dev-moa-da7b5.appspot.com',
  messagingSenderId: '840916781922',
  appId: '1:840916781922:web:ec07142d7394dbfdc6ba3b',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
