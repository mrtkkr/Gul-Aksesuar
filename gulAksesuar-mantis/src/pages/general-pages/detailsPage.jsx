import React, { useState, useEffect } from 'react';
import FsLightbox from 'fslightbox-react';

// import { sendApiRequest, sendPublicApiRequest } from 'services/network_service';

const DetailsPage = () => {
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
      <header>
        <section className="background-primary text-white height-100 py-3">
          <div className="container">
            <nav>
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a href="#HomePage" className="text-white">
                    Anasayfa
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#" className="text-white">
                    Elektronik
                  </a>
                </li>
                <li className="breadcrumb-item text-truncate" style={{ maxWidth: '200px' }}>
                  Apple Watch Yıldız Işığı Alüminyum Kasa ve Spor Kordom
                </li>
              </ol>
            </nav>
          </div>
        </section>
      </header>

      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="gallery-wrap">
                {/* Büyük resim */}
                <div className="img-big-wrap img-thumbnail mb-3">
                  <img
                    src="/images/1.jpeg"
                    alt="Ürün görseli"
                    style={{ width: '100%', cursor: 'pointer' }}
                    onClick={() => handleOpenLightbox(0)}
                  />
                </div>

                {/* Küçük resimler */}
                <div className="thumbs-wrap d-flex justify-content-center flex-wrap gap-2">
                  {images.map((src, index) => (
                    <img
                      key={index}
                      src={src.replace('-big', '')}
                      alt={`Ürün görseli ${index + 1}`}
                      height="60"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleOpenLightbox(index)}
                    />
                  ))}
                </div>

                {/* Lightbox */}
                <FsLightbox toggler={toggler} sources={images} slide={slide} />
              </div>
            </div>
            <div className="col-lg-7">
              <article>
                <h4 className="title text-dark"> Apple Watch Yıldız Işığı Alüminyum Kasa ve Spor Kordom</h4>
                <div className="rating-wrap">
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star "></span>
                </div>
                <p className="text-success">Stokta</p>
                <div className="mb-3">
                  <b className="price h5">45.999 ₺</b>
                  <del className="price-discount h6 ms-2">45.999 ₺</del>
                </div>
                <div className="product-description mb-3">
                  Apple Watch Yıldız Işığı Alüminyum Kasa ve Spor Kordom, günlük aktivitelerinizi takip etmenize yardımcı olur. Gelişmiş
                  sağlık ve fitness özellikleri ile donatılmıştır. Suya dayanıklı tasarımı sayesinde her türlü aktivitede yanınızdadır.
                  Ayrıca, yüksek çözünürlüklü ekranı ile bildirimlerinizi ve uygulamalarınızı kolayca görüntüleyebilirsiniz. Uzun pil ömrü
                  sayesinde gün boyu kesintisiz kullanım sunar. Farklı kayış ve kadran seçenekleriyle tarzınıza uygun kişiselleştirme imkanı
                  sağlar. iOS cihazlarınızla tam uyumlu çalışır ve hayatınızı kolaylaştıran akıllı özellikler sunar.
                </div>
                <dl className="row border-bottom">
                  <dt className="col-3">Renk</dt>
                  <dd className="col-9">Yıldız Işığı</dd>
                  <dt className="col-3">Bağlantı Özellikleri</dt>
                  <dd className="col-9">GPS</dd>
                  <dt className="col-3">Suya Dayanıklılık</dt>
                  <dd className="col-9">Var</dd>
                  <dt className="col-3">Pil Ömrü</dt>
                  <dd className="col-9">21 Saat</dd>
                </dl>
                <div className="row mb-3">
                  <div className="col-md-4 col-6 ">
                    <label className="form-label">Kasa Boyutu</label>
                    <select className="form-select">
                      <option value="">41 mm</option>
                      <option value="">45 mm</option>
                    </select>
                  </div>
                </div>
                <div className="buttons d-flex gap-2">
                  <a href="#" className="btn btn-warning">
                    <i className="fa fa-shopping-basket me-1"></i> Sepete Ekle
                  </a>
                  <a href="#" className="btn btn-light">
                    <i className="fa-regular fa-heart basket me-1"></i> Listeye Ekle
                  </a>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-3">
        <div className="container">
          <h4 className="mb-3">Benzer Ürünler</h4>
          <div className="row gy-3">
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="card shadow">
                <div className="img-wrap">
                  <span className="fa fa-regular fa-heart"></span>
                  <img src="/images/2.jpeg" alt="Ürün 1" className="card-img-top" />
                </div>

                <div className="border-top info-wrap">
                  <a href="DetailsPage" className="title text-truncate">
                    Apple Watch Yıldız Işığı Alüminyum Kasa ve Spor Kordom{' '}
                  </a>
                  <div className="price-wrap mb-3">
                    <span className="price-discount">45.999 ₺</span>
                    <del className="price">49.999 ₺</del>
                  </div>
                  <a href="" className="btn btn-light w-100">
                    <i className="fa fa-shopping-basket me-1"></i> Sepete Ekle
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="card shadow">
                <div className="img-wrap">
                  <span className="fa fa-regular fa-heart"></span>
                  <img src="/images/5.jpeg" alt="Ürün 1" className="card-img-top" />
                </div>

                <div className="border-top info-wrap">
                  <a href="DetailsPage" className="title text-truncate">
                    Apple Watch Yıldız Işığı Alüminyum Kasa ve Spor Kordom{' '}
                  </a>
                  <div className="price-wrap mb-3">
                    <span className="price-discount">45.999 ₺</span>
                    <del className="price">49.999 ₺</del>
                  </div>
                  <a href="" className="btn btn-light w-100">
                    <i className="fa fa-shopping-basket me-1"></i> Sepete Ekle
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="card shadow">
                <div className="img-wrap">
                  <span className="fa fa-regular fa-heart"></span>
                  <img src="/images/3.jpeg" alt="Ürün 1" className="card-img-top" />
                </div>

                <div className="border-top info-wrap">
                  <a href="DetailsPage" className="title text-truncate">
                    Apple Watch Yıldız Işığı Alüminyum Kasa ve Spor Kordom{' '}
                  </a>
                  <div className="price-wrap mb-3">
                    <span className="price-discount">45.999 ₺</span>
                    <del className="price">49.999 ₺</del>
                  </div>
                  <a href="" className="btn btn-light w-100">
                    <i className="fa fa-shopping-basket me-1"></i> Sepete Ekle
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="card shadow">
                <div className="img-wrap">
                  <span className="fa fa-regular fa-heart"></span>
                  <img src="/images/8.jpeg" alt="Ürün 1" className="card-img-top" />
                </div>

                <div className="border-top info-wrap">
                  <a href="DetailsPage" className="title text-truncate">
                    Apple Watch Yıldız Işığı Alüminyum Kasa ve Spor Kordom{' '}
                  </a>
                  <div className="price-wrap mb-3">
                    <span className="price-discount">45.999 ₺</span>
                    <del className="price">49.999 ₺</del>
                  </div>
                  <a href="" className="btn btn-light w-100">
                    <i className="fa fa-shopping-basket me-1"></i> Sepete Ekle
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailsPage;
