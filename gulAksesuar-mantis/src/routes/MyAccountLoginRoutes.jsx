import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const MyAccountAuthLogin = Loadable(lazy(() => import('pages/authentication/myAccountLoginPage')));
const MyAccountAuthRegister = Loadable(lazy(() => import('pages/authentication/myAccountRegisterPage')));

// ==============================|| AUTH ROUTING ||============================== //

const myAccountLoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/myAccountLoginPage',
      element: <MyAccountAuthLogin />
    },
    {
      path: '/myAccountRegisterPage',
      element: <MyAccountAuthRegister />
    }
  ]
};

export default myAccountLoginRoutes;
