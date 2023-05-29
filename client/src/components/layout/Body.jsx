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
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    handleUserIsLogin(setIsLogin, userId => dispatch(getUserInfoAction(userId)));
  }, [isLogin, dispatch]);

  console.log(`isLogin 👉🏻 ${isLogin}`);

  return (
    <div className="w-screen flex flex-col items-center bg-gray1 font-noto-kr">
      <Header isLogin={isLogin} />
      {isMainContentWidthScreen && children}

      {!isMainContentWidthScreen && (
        <main className="max-w-limit w-full pt-36 flex justify-center">{children}</main>
      )}
      <Footer />
    </div>
  );
}

export default Body;
