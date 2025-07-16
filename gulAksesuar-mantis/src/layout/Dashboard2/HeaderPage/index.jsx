import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React, { useContext } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { AuthContext } from 'contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { sendApiRequest } from 'services/network_service.js';
import { logout } from 'services/auth.js';

export default function Header() {
  const { isAuthenticated, clearUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await logout();
    if (res.success) {
      clearUser();
      navigate('/');
    }
  };

  return (
    <>
      <header>
        <section className="top-bar">
          <div className="container">
            <div className="row gy-2 align-items-center">
              <div className="col-lg-3 col-sm-4 col-4">
                <a href="#HomePage" className="navbar-brand">
                  <i className="fa-solid fa-spa"></i> <span>YEŞİLKENT PEYNİRCİLİK</span>
                </a>
              </div>

              <div className="col-lg-6 col-sm-8 col-8 order-lg-last">
                <div className="text-end">
                  {isAuthenticated ? (
                    <div className="btn-group">
                      <Link to="/myAccountPage" className="btn btn-light">
                        <i className="fa fa-user"></i>
                        <span className="ms-1 d-none d-md-inline-block">Hesabım</span>
                      </Link>
                      <button onClick={handleLogout} className="btn btn-light">
                        <i className="fa fa-sign-out-alt"></i>
                        <span className="ms-1 d-none d-md-inline-block">Çıkış Yap</span>
                      </button>
                    </div>
                  ) : (
                    <Link to="/myAccountLoginPage" className="btn btn-light">
                      <i className="fa fa-sign-in-alt"></i>
                      <span className="ms-1 d-none d-md-inline-block">Giriş Yap</span>
                    </Link>
                  )}

                  <a href="#" className="btn btn-light">
                    <i className="fa fa-heart"></i>
                    <span className="ms-1 d-none d-md-inline-block">Listem</span>
                  </a>
                  <Link to="/myCartPage" className="btn btn-light">
                    <i className="fa fa-shopping-cart"></i>
                    <span className="ms-1 d-none d-md-inline-block">Sepetim</span>
                  </Link>
                </div>
              </div>
              <div className="col-lg-3">
                <form>
                  <div className="input-group">
                    <input type="text" placeholder="Anahtar Kelime" className="form-control" />
                    <button className="btn btn-primary">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </header>
    </>
  );
}
