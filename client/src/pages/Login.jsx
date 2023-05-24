import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { GithubIcon, GoogleIcon, KakaoIcon } from '../components/Icons';

const instanceAxios = axios.create({
  withCredentials: true,
});

const fetchLogin = async loginInfo => {
  const URL = 'http://localhost:4000/login';
  const body = loginInfo;
  console.log('body', body);
  try {
    const response = await instanceAxios.post(URL, body);
    return response.data;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }

  return null;
};

const fetchSignUp = async signUpInfo => {
  const path = 'user/signup';

  const generateRandomNum = () => {
    const num = Math.floor(Math.random() * 10);
    setProfileImgNum(num);
  } 

  const body = signUpInfo;
  
  try {
    const rep = await instanceAxios.post(path, body)
  }
}

function Login() {
  const [profileImgNum, setProfileImgNum] = useState(null);
  const location = useLocation();
  const isLoginPage = location.pathname === '/user/login';
  const isSignUpPage = location.pathname === '/user/signup';

  

  const [loginInfo, setLoginInfo] = useState({
    userId: '',
    password: '',
  });

  const [signUpInfo, setSignUpInfo] = useState({
    userName: '',
    userId: '',
    password: '',
    profileImgNum: generateRandomNum(),
  });

  const onSubmitHandler = e => {
    e.preventDefault();
    if (isLoginPage) {
      const userData = fetchLogin(loginInfo);
      console.log('response.data ->', userData);
    } else if (isSignUpPage) {

    }
  };

  const onEmailChangeHandler = e => {
    if (isLoginPage) {
      setLoginInfo(prev => ({ ...prev, userId: e.target.value }));
    } else {
      setSignUpInfo(prev => ({ ...prev, userId: e.target.value }));
    }
  };

  const onPasswordChangeHandler = e => {
    if (isLoginPage) {
      setLoginInfo(prev => ({ ...prev, password: e.target.value }));
    } else {
      setSignUpInfo(prev => ({ ...prev, password: e.target.value }));
    }
  };

  const onNameChangeHandler = e =>
    setSignUpInfo(prev => ({ ...prev, userName: e.target.value }));

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <div className="my-[9.6rem] flex justify-center items-center pt-[180px]">
      <div className="w-[33.5rem] h-[31.5rem] px-[3rem] flex flex-col">
        <p className="text-[30px] text-black3 font-bold text-center">
          {isLoginPage ? '로그인' : '회원가입'}
        </p>
        <form onSubmit={onSubmitHandler} className="mt-[3.75rem] py-[15px] flex-col">
          {isSignUpPage && (
            <input
              onChange={onNameChangeHandler}
              type="text"
              name="userName"
              className="bg-white w-full h-[3.5rem] px-[1.3rem] py-[0.5rem] mb-[15px]"
              placeholder="이름"
            />
          )}
          <input
            onChange={onEmailChangeHandler}
            type="text"
            className="bg-white w-full h-[3.5rem] px-[1.3rem] py-[0.5rem]"
            placeholder="이메일"
            required
          />
          <input
            onChange={onPasswordChangeHandler}
            type="password"
            className="mt-[15px] bg-white w-full h-[3.5rem] px-[1.3rem] py-[0.5rem]"
            placeholder="비밀번호"
            required
          />
          <button
            type="submit"
            className="mt-[32px] w-full h-[3.5rem] bg-black3 text-gray1 text-[14px] font-bold text-center"
          >
            {isLoginPage ? '로그인하기' : '회원가입하기'}
          </button>
        </form>
        {isLoginPage && (
          <p className="text-right font-bold text-[12px] text-gray11 cursor-pointer">
            비밀번호 찾기
          </p>
        )}
        {isLoginPage && (
          <div className="w-full flex justify-between mt-[2.7rem] px-[8.5rem] ">
            <button
              type="button"
              className="w-[2.6rem] h-[2.6rem] rounded-full bg-black flex justify-center items-center"
            >
              <GithubIcon className="w-[2rem] h-[2rem]" />
            </button>
            <button
              type="button"
              className="w-[2.6rem] h-[2.6rem] rounded-full bg-white flex justify-center items-center"
            >
              <GoogleIcon className="w-[2rem] h-[2rem]" />
            </button>
            <button
              type="button"
              className="w-[2.6rem] h-[2.6rem] rounded-full bg-kakaoYellow flex justify-center items-center"
            >
              <KakaoIcon className="w-[2rem] h-[2rem]" />
            </button>
          </div>
        )}
        {isLoginPage && (
          <div className="my-[26px] mx-[12.5rem] border-t-[1px] border-solid border-gray8" />
        )}
        {isLoginPage && (
          <div className="flex justify-center">
            <p className="text-black3 text-[12px] font-bold pr-[5px]">
              아직 계정이 없으신가요?
            </p>
            <p className="text-activeBlue text-[12px] font-bold">회원가입</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
