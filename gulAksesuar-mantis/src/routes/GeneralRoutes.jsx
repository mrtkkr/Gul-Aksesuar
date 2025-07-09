import { lazy } from 'react';

// project import
// import Dashboard2 from 'layout/Dashboard2';
// import Dashboard from 'layout/Dashboard';
import LoginCheck from 'LoginCheck';
import HomePage from 'pages/general-pages/homePage';
import DetailsPage from 'pages/general-pages/detailsPage';
import MyCartPage from 'pages/general-pages/myCartPage';

const GeneralRoutes = {
  path: '/',

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
    }
  ]
};

export default GeneralRoutes;
