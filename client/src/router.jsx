import { createBrowserRouter } from 'react-router-dom';

import Body from './components/layout/Body';
import Home from './pages/Home';
import Auth from './pages/Auth';
import PageNotFound from './pages/PageNotFound';
import UserProfile from './pages/UserProfile';
import UserActivity from './pages/UserActivity';
import AllDevelopment from './pages/AllDevelopments';
import DetailDevelopment from './pages/DetailDevelopment';
import NewPost from './pages/NewPost';

// const RouterPath = {
//   HOME: '/home',
//   DEVELOPMENTS: '/developments'
// }
// human error
// SSOT 지키면 -> human error decrease
// enum

// layoutInfo -> grouping으로 해결
// 추상화를 좋은 구조를 통해 좀이라도 의도가 보이게끔?
const routerData = [
  {
    path: '/',
    element: <Home />,
    errorElement: <PageNotFound />,
    layoutInfo: {
      isHeader: true,
      isMainContentWidthScreen: true,
      isFooter: true,
    },
  },
  {
    path: '/developments',
    element: <AllDevelopment />,
    layoutInfo: {
      isHeader: true,
      isMainContentWidthScreen: false,
      isFooter: true,
    },
  },
  {
    path: '/developments/:postId',
    element: <DetailDevelopment />,
    layoutInfo: {
      isHeader: true,
      isMainContentWidthScreen: false,
      isFooter: true,
    },
  },
  {
    path: '/developments/new',
    element: <NewPost />,
    layoutInfo: {
      isHeader: true,
      isMainContentWidthScreen: false,
      isFooter: true,
    },
  },
  {
    path: '/user/login',
    element: <Auth />,
    layoutInfo: {
      isHeader: true,
      isMainContentWidthScreen: true,
      isFooter: true,
    },
  },
  {
    path: '/user/signup',
    element: <Auth />,
    layoutInfo: {
      isHeader: true,
      isMainContentWidthScreen: true,
      isFooter: true,
    },
  },
  {
    path: '/user/profile',
    element: <UserProfile />,
    layoutInfo: {
      isHeader: true,
      isMainContentWidthScreen: false,
      isFooter: true,
    },
  },
  {
    path: '/user/activities',
    element: <UserActivity />,
    layoutInfo: {
      isHeader: true,
      isMainContentWidthScreen: false,
      isFooter: true,
    },
  },
];

const routers = createBrowserRouter(
  routerData.reduce((accRouterArr, currentRouterInfo) => {
    const parsedRouter = {
      ...currentRouterInfo,
      element: (
        <Body layoutInfo={currentRouterInfo?.layoutInfo}>
          {currentRouterInfo.element}
        </Body>
      ),
    };

    delete parsedRouter.layoutInfo;

    return [...accRouterArr, parsedRouter];
  }, []),
);

export default routers;
