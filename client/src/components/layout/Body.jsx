import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../utils/axios';

import Footer from './Footer';
import Header from './Header';
import { handleUserIsLogin } from '../../api/auth';

function Body({ children, layoutInfo }) {
  // const { isLogin } = useSelector(state => state.user);
  const { isMainContentWidthScreen } = layoutInfo;
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    handleUserIsLogin(setIsLogin);
  }, [isLogin]);

  console.log('isLogin value in Body 🚀', isLogin);

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
