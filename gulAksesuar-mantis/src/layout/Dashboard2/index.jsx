import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { KeyboardArrowUp } from '@mui/icons-material';

// project import

import Header from './Header';
import HeaderPage from './HeaderPage';
import FooterPage from './FooterPage';
import navigation from 'menu-items';
import Loader from 'components/Loader';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// ==============================|| MAIN LAYOUT ||============================== //

export default function Dashboard2Layout() {
  return (
    <Box>
      <HeaderPage />
      <Box>
        {/* <Breadcrumbs navigation={navigation} title /> */}
        <Outlet />
      </Box>
      <FooterPage />
    </Box>
  );
}
