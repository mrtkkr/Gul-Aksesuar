import { lazy } from 'react';

// project import
import Dashboard2 from 'layout/Dashboard2';
import MyPanelProvider from 'contexts/admin/gulAksesuar/myPanelContext';
// import Dashboard from 'layout/Dashboard';
import LoginCheck from 'LoginCheck';
import HomePage from 'pages/general-pages/homePage';
import DetailsPage from 'pages/general-pages/detailsPage';
import MyCartPage from 'pages/general-pages/myCartPage';
import myAccountPage from 'pages/general-pages/myAccountPage';
import MyAccountLoginCheck from 'myAccountLoginCheck';

const GeneralRoutes = {
  path: '/',
  element: (
    <MyPanelProvider>
      <Dashboard2 />
    </MyPanelProvider>
  ),
  children: [
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/detailsPage',
      element: <DetailsPage />
    },
    {
      path: '/myCartPage',
      element: <MyCartPage />
    },
    {
      path: '/myAccountPage',
      element: (
        <MyAccountLoginCheck>
          <myAccountPage />
        </MyAccountLoginCheck>
      )
    }
  ]
};

export default GeneralRoutes;
