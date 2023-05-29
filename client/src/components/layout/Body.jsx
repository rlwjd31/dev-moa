import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../utils/axios';

import Footer from './Footer';
import Header from './Header';
import { handleUserIsLogin } from '../../api/auth';
import { getUserInfoAction } from '../../store/userSlice';

function Body({ children, layoutInfo }) {
  // const { isLogin } = useSelector(state => state.user);
  const { isMainContentWidthScreen } = layoutInfo;
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    // 매 페이지마다 login을 확인
    handleUserIsLogin(userId => dispatch(getUserInfoAction(userId)));
  }, [dispatch]);

  console.log(`user.isLogin 👉🏻 ${user.isLogin}`);

  return (
    <div className="w-screen flex flex-col items-center bg-gray1 font-noto-kr">
      <Header isLogin={user.isLogin} />
      {isMainContentWidthScreen && children}

      {!isMainContentWidthScreen && (
        <main className="max-w-limit w-full pt-36 flex justify-center">{children}</main>
      )}
      <Footer />
    </div>
  );
}

export default Body;
