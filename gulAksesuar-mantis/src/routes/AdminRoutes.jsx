// project import
import Dashboard from 'layout/Dashboard';
import LoginCheck from 'LoginCheck';
import { Navigate } from 'react-router-dom';

import PanelPage from 'pages/admin-pages/gulAksesuar/Panel/PanelPage';
import CreateSnippetPage from 'pages/admin-pages/Snippet/CreateSnippetPage';
import CategoryPage from 'pages/admin-pages/gulAksesuar/CategoryPage';
import OrderPage from 'pages/admin-pages/gulAksesuar/OrderPage';
import ProductPage from 'pages/admin-pages/gulAksesuar/ProductPage';
import SliderPage from 'pages/admin-pages/gulAksesuar/SliderPage';
import RolePage from 'pages/admin-pages/gulAksesuar/RolePage';
import UsersPage from 'pages/admin-pages/gulAksesuar/UsersPage';

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
      path: 'category',
      element: <CategoryPage />
    },
    {
      path: 'order',
      element: <OrderPage />
    },
    {
      path: 'product',
      element: <ProductPage />
    },
    {
      path: 'slider',
      element: <SliderPage />
    },
    {
      path: 'role',
      element: <RolePage />
    },
    {
      path: 'users',
      element: <UsersPage />
    },
    {
      path: 'snippet',
      element: <CreateSnippetPage />
    }
  ]
};

export default AdminRoutes;
