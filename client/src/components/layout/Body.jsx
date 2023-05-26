import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import firebaseApp from '../../utils/firebaseApp';
import axios from '../../utils/axios';

import Footer from './Footer';
import Header from './Header';

function Body({ children, layoutInfo }) {
  const { isLogin } = useSelector(state => state.user);
  const { isMainContentWidthScreen } = layoutInfo;

  console.log('firebase 🔥🔥🔥🔥🔥');
  console.log(firebaseApp);

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
