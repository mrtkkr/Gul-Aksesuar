// project import
import Dashboard from 'layout/Dashboard';
import LoginCheck from 'LoginCheck';
import { Navigate } from 'react-router-dom';

import PanelPage from 'pages/admin-pages/hantools/Panel/PanelPage';
import CreateSnippetPage from 'pages/admin-pages/Snippet/CreateSnippetPage';

import PanelProvider from 'contexts/admin/PanelContext';
import SnippetProvider from 'contexts/admin/SnippetContext';

const AdminRoutes = {
  path: '/panel',
  element: (
    <LoginCheck>
      <PanelProvider>
        <SnippetProvider>
          <Dashboard />
        </SnippetProvider>
      </PanelProvider>
    </LoginCheck>
  ),
  children: [
    {
      path: 'adminpanel',
      element: <PanelPage />
    },
    {
      path: 'snippet',
      element: <CreateSnippetPage />
    }
  ]
};

export default AdminRoutes;
