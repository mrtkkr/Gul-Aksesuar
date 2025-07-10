import { Link } from 'react-router-dom';
import { useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

export default function Footer() {
  return (
    <>
      <footer className="mt-3 py-4 background-primary text-white">
        <div className="container">
          <div className="row gy-3">
            <div className="col-md-6 col-lg-4">
              <form>
                <div className="input-group">
                  <input type="email" className="form-control" placeholder="Email Giriniz." />
                  <button type="button" className="btn btn-outline-warning">
                    Abone Ol
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-6 col-lg-8 text-end">
              <nav className="text-center text-md-end">
                <a href="#" className="btn btn-icon btn-outline-warning">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="btn btn-icon btn-outline-warning">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="btn btn-icon btn-outline-warning">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="#" className="btn btn-icon btn-outline-warning">
                  <i className="fab fa-x"></i>
                </a>
              </nav>
            </div>
            <div className="col-12">
              <p className="text-center text-white-100 mb-0">© 2025 Tüm hakları saklıdır</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
