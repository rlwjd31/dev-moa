import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { collection, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';

import firebaseApp, { firebaseDB } from '../utils/firebaseApp';
import getRandomProfileNum from '../utils/randomNum';

export const authFirebaseAPI = getAuth();

export const signUp = async (name, email, password) => {
  try {
    // 회원가입 인증절차
    const { user } = await createUserWithEmailAndPassword(
      authFirebaseAPI,
      email,
      password,
    );
    console.log('create user 👉🏻', user);

    // db에 사용자 추가
    const createdUserInfo = await setDoc(doc(firebaseDB, 'user', user.uid), {
      name,
      createdAt: new Date(),
      modifiedAt: new Date(),
      email,
      id: user.uid,
      profileImage: getRandomProfileNum(),
    });
    console.log('user added to db 👉🏻', createdUserInfo);
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
    // user.uid를 redux-toolkit의 userId로 넣어야하므로 return해 줌.
    return user.uid;
  } catch (err) {
    console.log(`firebase 로그인 에러 ❌ 👉🏻 code: ${err.code}\tmessage: ${err.message}`);
  }

  return null;
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

export const getUserInfo = async userId => {
  const userRef = doc(firebaseDB, 'user', userId);
  try {
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const userInfo = {
        ...userSnap.data(),
        createdAt: userData.createdAt.toDate().toString(),
        modifiedAt: userData.modifiedAt.toDate().toString(),
      };

      console.log(`success to getUserInfo userInfo ✅ ->`, userInfo);
      // userSnap.data() will be exist in this case
      return { userInfo }; // will be store in payload as object by redux-toolkit
    }
  } catch (err) {
    console.log(`can't get userInfo from server❌`, err.message, err.code);
  }

  return null;
};

export default {};
