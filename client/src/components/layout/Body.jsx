import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDevelopmentsAction } from '../../store/allDevelopmentSlice';

import Footer from './Footer';
import Header from './Header';
import { handleUserIsLogin } from '../../api/auth';
import { getUserInfoAction } from '../../store/userSlice';

function Body({ children, layoutInfo }) {
  const { isMainContentWidthScreen } = layoutInfo;
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    // 매 페이지마다 login을 확인
    handleUserIsLogin(userId => dispatch(getUserInfoAction(userId)));
    dispatch(getAllDevelopmentsAction());
  }, [dispatch]);

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
