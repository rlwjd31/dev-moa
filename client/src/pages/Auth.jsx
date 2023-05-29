/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SyncLoader from 'react-spinners/SyncLoader';
import Swal from 'sweetalert2';

import { GithubIcon, GoogleIcon, KakaoIcon } from '../components/Icons';
import { login, signUp } from '../api/auth';
import { getUserInfoAction } from '../store/userSlice';

function Auth() {
  const location = useLocation();
  const navigator = useNavigate();
  const isLoginPage = location.pathname === '/user/login';
  const isSignUpPage = location.pathname === '/user/signup';
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();
  console.log('redux from user🚀', user);

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const [signUpInfo, setSignUpInfo] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const onSubmitHandler = async e => {
    e.preventDefault();
    setIsLoading(prev => true);
    // ! with Firebase
    if (isLoginPage) {
      // dispatch(getUserInfoAction(loginInfo));

      const userId = await login(loginInfo.email, loginInfo.password);
      // console.log(`loginResponse`, userId);
      dispatch(getUserInfoAction(userId));
      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'login success ✅\n\nwill be redirect to Home',
        showConfirmButton: false,
        timer: 2000,
        willClose: () => {
          // loading은 page벗어나고 다시 돌아오는 시점에 false로 될 텐데 해 줄 필요가 있나...?
          setIsLoading(prev => false);
          navigator('/');
        },
      });
    } else if (isSignUpPage) {
      await signUp(signUpInfo.userName, signUpInfo.email, signUpInfo.password);
      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'create account success ✅\n\nwill be redirect to Home',
        showConfirmButton: false,
        timer: 2000,
        willClose: () => {
          // loading은 page벗어나고 다시 돌아오는 시점에 false로 될 텐데 해 줄 필요가 있나...?
          setIsLoading(prev => false);
          navigator('/');
        },
      });
    }
  };

  const onEmailChangeHandler = e => {
    if (isLoginPage) {
      setLoginInfo(prev => ({ ...prev, email: e.target.value }));
    } else {
      setSignUpInfo(prev => ({ ...prev, email: e.target.value }));
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

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[80vh] w-full bg-gray1">
          <SyncLoader color="#465955" />
        </div>
      ) : (
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
                  <GoogleIcon className="w-[1.6rem] h-[1.6rem]" />
                </button>
                <button
                  type="button"
                  className="w-[2.6rem] h-[2.6rem] rounded-full bg-kakaoYellow flex justify-center items-center"
                >
                  {/* <KakaoIcon className="w-[2rem] h-[2rem]" /> */}
                  <KakaoIcon className="w-[1.6rem] h-[1.6rem]" />
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
                <Link to="/user/signup">
                  <p className="text-activeBlue text-[12px] font-bold">회원가입</p>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Auth;
