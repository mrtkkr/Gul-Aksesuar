import React, { useState, useEffect } from 'react';
import FsLightbox from 'fslightbox-react';
import { width } from '@mui/system';

// import { sendApiRequest, sendPublicApiRequest } from 'services/network_service';

const MyCartPage = () => {
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

  const [toggler, setToggler] = useState(false);
  const [slide, setSlide] = useState(1);

  const images = ['/images/1-big.jpeg', '/images/2-big.jpeg', '/images/3-big.jpeg', '/images/5-big.jpeg'];

  const handleOpenLightbox = (index) => {
    setSlide(index + 1); // 1-based index
    setToggler(!toggler); // Lightbox'ı tetiklemek için değiştiriyoruz
  };

  return (
    <div className="bg-light ">
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="alert alert-warning p-2">Ücretsiz Kargo</div>
              <div className="py-3">
                <ul className="list-group">
                  <li className="py-3 mb-2 border-top list-group-item">
                    <div className="row align-items-center">
                      <div className="col-8">
                        <div className="d-flex align-items-center">
                          <img src="/images/1.jpeg" style={{ width: '100px' }} alt="1.resim" />
                          <div className="ms-3">
                            <a href="#" className="text-decoration-none">
                              <h6 className="mb-0">Apple Watch Yıldız Işığı</h6>
                            </a>
                            <i className="fa-solid fa-trash-can"></i> Sil
                          </div>
                        </div>
                      </div>
                      <div className="col-2">
                        <select className="form-select">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </select>
                      </div>
                      <div className="col-2 text-center">
                        <span className="fw-bold">1000 ₺</span>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 mb-2 border-top list-group-item">
                    <div className="row align-items-center">
                      <div className="col-8">
                        <div className="d-flex align-items-center">
                          <img src="/images/1.jpeg" style={{ width: '100px' }} alt="1.resim" />
                          <div className="ms-3">
                            <a href="#" className="text-decoration-none">
                              <h6 className="mb-0">Apple Watch Yıldız Işığı</h6>
                            </a>
                            <i className="fa-solid fa-trash-can"></i> Sil
                          </div>
                        </div>
                      </div>
                      <div className="col-2">
                        <select className="form-select">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </select>
                      </div>
                      <div className="col-2 text-center">
                        <span className="fw-bold">1000 ₺</span>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 mb-2 border-top list-group-item">
                    <div className="row align-items-center">
                      <div className="col-8">
                        <div className="d-flex align-items-center">
                          <img src="/images/1.jpeg" style={{ width: '100px' }} alt="1.resim" />
                          <div className="ms-3">
                            <a href="#" className="text-decoration-none">
                              <h6 className="mb-0">Apple Watch Yıldız Işığı</h6>
                            </a>
                            <i className="fa-solid fa-trash-can"></i> Sil
                          </div>
                        </div>
                      </div>
                      <div className="col-2">
                        <select className="form-select">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </select>
                      </div>
                      <div className="col-2 text-center">
                        <span className="fw-bold">1000 ₺</span>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 mb-2 border-top list-group-item">
                    <div className="row align-items-center">
                      <div className="col-8">
                        <div className="d-flex align-items-center">
                          <img src="/images/1.jpeg" style={{ width: '100px' }} alt="1.resim" />
                          <div className="ms-3">
                            <a href="#" className="text-decoration-none">
                              <h6 className="mb-0">Apple Watch Yıldız Işığı</h6>
                            </a>
                            <i className="fa-solid fa-trash-can"></i> Sil
                          </div>
                        </div>
                      </div>
                      <div className="col-2">
                        <select className="form-select">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </select>
                      </div>
                      <div className="col-2 text-center">
                        <span className="fw-bold">1000 ₺</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card">
                <div className="p-3 card-body">
                  <h2 className="h5 mb-4">Sipariş Özeti</h2>
                  <div className="card mb-2">
                    <div className="list-group list-group-flush">
                      <div className="d-flex justify-content-center align-items-center list-group-item">
                        <div className="me-auto">
                          <div>Sipariş Toplamı</div>
                        </div>
                        <span>1000 ₺</span>
                      </div>
                      <div className="d-flex justify-content-center align-items-center list-group-item">
                        <div className="me-auto">
                          <div>Kargo Ücreti</div>
                        </div>
                        <span>Ücretsiz</span>
                      </div>
                      <div className="d-flex justify-content-center align-items-center list-group-item">
                        <div className="me-auto">
                          <div>Vergi (%20)</div>
                        </div>
                        <span>200 ₺</span>
                      </div>
                      <div className="d-flex justify-content-center align-items-center list-group-item">
                        <div className="me-auto">
                          <div>Toplam</div>
                        </div>
                        <span>1200 ₺</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-grid ">
                    <a href="#" className="btn btn-primary btn-lg">
                      Siparişi Tamamla
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyCartPage;
