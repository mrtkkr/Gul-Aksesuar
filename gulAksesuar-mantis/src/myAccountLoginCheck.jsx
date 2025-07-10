import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'contexts/auth/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const MyAccountLoginCheck = ({ children }) => {
  const { user, isAuthenticated, fetchUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        await fetchUser();
      }
      setLoading(false);
    };

    checkAuth();
  }, [isAuthenticated, fetchUser]);

  useEffect(() => {
    if (!loading && (!isAuthenticated || !user)) {
      toast.info('Lütfen giriş yapınız!');
      setRedirect(true);
    }
  }, [loading, isAuthenticated, user]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (redirect) {
    return <Navigate to="/myAccountLoginPage" />;
  }

  return children;
};

MyAccountLoginCheck.propTypes = { children: PropTypes.element };

export default MyAccountLoginCheck;
