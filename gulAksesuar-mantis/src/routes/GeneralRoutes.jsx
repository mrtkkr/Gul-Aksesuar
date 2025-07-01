import { lazy } from 'react';

// project import
// import Dashboard2 from 'layout/Dashboard2';
// import Dashboard from 'layout/Dashboard';
import LoginCheck from 'LoginCheck';
import HomePage from 'pages/general-pages/homepages';

const GeneralRoutes = {
  path: '/',

  children: [
    {
      path: '/',
      element: <HomePage />
    }
  ]
};

export default GeneralRoutes;
