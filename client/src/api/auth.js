import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const authFirebaseAPI = getAuth();

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

export default {};
