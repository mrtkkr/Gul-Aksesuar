import React, { useState, useEffect } from 'react';

// import { sendApiRequest, sendPublicApiRequest } from 'services/network_service';

const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Example API call
    // sendApiRequest('GET', '/api/home')
    //   .then(response => setData(response.data))
    //   .catch(error => console.error('Error fetching data:', error));

    // For demonstration, we'll use a static object
    setData({
      title: 'Welcome to Gul Aksesuar',
      description: 'Your one-stop shop for all accessories.'
    });
  }, []);

  return (
    <div className="bg-light">
      <header>
        <section className="top-bar">
          <div className="container">
            <div className="row gy-2 align-items-center">
              <div className="col-lg-2 col-sm-4 col-4">
                <a href="#HomePage" className="navbar-brand">
                  <i className="fa-solid fa-spa"></i> <span>GÜL AKSESUAR</span>
                </a>
              </div>
              <div className="col-lg-5 col-sm-8 col-8 order-lg-last">
                <div className="text-end">
                  <a href="#" className="btn btn-light">
                    <i className="fa fa-user"></i>
                    <span className="ms-1 d-none d-sm-inline-block">Hesabım</span>
                  </a>
                  <a href="#" className="btn btn-light">
                    <i className="fa fa-heart"></i>
                    <span className="ms-1 d-none d-sm-inline-block">Listem</span>
                  </a>
                  <a href="#" className="btn btn-light">
                    <i className="fa fa-shopping-cart"></i>
                    <span className="ms-1 d-none d-sm-inline-block">Sepetim</span>
                  </a>
                </div>
              </div>
              <div className="col-lg-5">
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
        <nav className="navbar navbar-dark background-primary navbar-expand-lg">
          <div className="container">
            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbar">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a href="#HomePage" className="nav-link active ps-0">
                    Elektronik
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#Products" className="nav-link">
                    Spor
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#AboutUs" className="nav-link">
                    Giyim
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#Contact" className="nav-link">
                    Market
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                    Diğer Kategoriler
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a href="#" className="dropdown-item">
                        Kategori 1
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Kategori 2
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Kategori 3
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <section className="pt-3 pb-3">
        <div className="container">
          <div className="card">
            <div className="row p-1 p-lg-2 gx-2">
              <div className="col-lg-3 d-none d-lg-block">
                {/* menu */}
                <nav className="nav nav-pills flex-column flex-nowrap overflow-auto slider_nav">
                  <a href="#" className="nav-link active">
                    Elektronik
                  </a>
                  <a href="#" className="nav-link">
                    Giyim
                  </a>
                  <a href="#" className="nav-link">
                    Spor
                  </a>
                  <a href="#" className="nav-link">
                    Kozmetik
                  </a>
                  <a href="#" className="nav-link">
                    Kitap
                  </a>
                  <a href="#" className="nav-link">
                    Anne/Bebek
                  </a>
                </nav>
              </div>
              <div className="col-lg-9">
                {/* slider */}
                <div id="slider" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-indicators">
                    <button type="button" data-bs-target="#slider" data-bs-slide-to="0" className="active"></button>
                    <button type="button" data-bs-target="#slider" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#slider" data-bs-slide-to="2"></button>
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src="http://localhost:8000/static/back_end/slider-1.jpeg" alt="slider-1" className="d-block w-100" />
                    </div>
                    <div className="carousel-item">
                      <img src="http://localhost:8000/static/back_end/slider-2.jpeg" alt="slider-2" className="d-block w-100" />
                    </div>
                    <div className="carousel-item">
                      <img src="http://localhost:8000/static/back_end/slider-3.jpeg" alt="slider-3" className="d-block w-100" />
                    </div>
                  </div>
                  <button type="button" className="carousel-control-prev" data-bs-target="#slider" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                  </button>
                  <button type="button" className="carousel-control-next" data-bs-target="#slider" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
