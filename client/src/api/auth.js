import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { current } from '@reduxjs/toolkit';
import firebaseApp from '../utils/firebaseApp';

export const authFirebaseAPI = getAuth();

export const signUp = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      authFirebaseAPI,
      email,
      password,
    );
    console.log('create user ->', user);
  } catch (err) {
    console.log(
      `firebase 사용자 추가 에러 ❌ 👉🏻 code: ${err.code}\tmessage: ${err.message}`,
    );
  }

  return null;
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(authFirebaseAPI, email, password);
    console.log('login userInfo ->', user);
  } catch (err) {
    console.log(`firebase 로그인 에러 ❌ 👉🏻 code: ${err.code}\tmessage: ${err.message}`);
  }
};

export const handleUserIsLogin = callback => {
  onAuthStateChanged(authFirebaseAPI, user => {
    if (user) {
      callback(true);
      console.log('still login status!!🔥🔥🔥');
      return;
    }

    console.log('no login now...🥲🥲🥲');
    callback(false);
  });
};

export const logout = () => {
  signOut(authFirebaseAPI);
};

export default {};
