import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, Button, Typography, Chip } from '@mui/material';
import { width } from '@mui/system';

const DetailOrder = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Sipariş Detayları</DialogTitle>
      <DialogContent>
        <main className="container my-3">
          <div className="row">
            <div className="col">
              <div className="card shadow">
                <div className="card-header py-1 d-flex justify-content-between align-items-center">
                  <h5 className="card-title">Sipariş No:#5</h5>
                  <span className="badge bg-success p-2">Teslim Edildi</span>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover table-striped mb-2">
                      <thead className="table-secondary">
                        <tr>
                          <th style={{ width: '150px' }} scope="col">
                            Product Id
                          </th>
                          <th scope="col" style={{ width: '80px' }}>
                            Image
                          </th>
                          <th scope="col">Product Name</th>
                          <th scope="col">Price</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Total</th>
                          {/* Total = Price * Quantity */}
                          {/* Quantity=Adet */}
                          {/* <th scope="col">İşlemler</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            <img src="/images/1.jpeg" className="img-fluid" alt="First Product Image" />
                          </td>

                          <td>Apple Watch Series 10</td>
                          <td>10.000 ₺</td>
                          <td>2</td>
                          <td>20.000 ₺</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>
                            <img src="/images/2.jpeg" className="img-fluid" alt="First Product Image" />
                          </td>

                          <td>Apple Watch Series 11</td>
                          <td>10.000 ₺</td>
                          <td>2</td>
                          <td>20.000 ₺</td>
                        </tr>
                        <tr className="fw-bold">
                          <td colSpan={4}></td>
                          <td>Ara Toplam:</td>
                          <td>40.000 ₺</td>
                        </tr>
                        <tr className="fw-bold">
                          <td colSpan={4}></td>
                          <td>Vergi (%20) :</td>
                          <td>8.000 ₺</td>
                        </tr>
                        <tr className="fw-bold">
                          <td colSpan={4}></td>
                          <td>Kargo:</td>
                          <td className="text-primary">Ücretsiz</td>
                        </tr>
                        <tr className="fw-bold">
                          <td colSpan={4}></td>
                          <td>Toplam:</td>
                          <td>48.000 ₺</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table table-bordered table-hover table-striped mb-2">
                      <tbody>
                        <tr>
                          <td style={{ width: '150px' }} className="fw-bold">
                            Teslim Tarihi
                          </td>
                          <td>10/10/2026</td>
                        </tr>
                        <tr>
                          <td style={{ width: '150px' }} className="fw-bold">
                            Ad Soyad
                          </td>
                          <td>Furkan Kocaman</td>
                        </tr>
                        <tr>
                          <td style={{ width: '150px' }} className="fw-bold">
                            Teslimat Adresi
                          </td>
                          <td>Yahya Kaptan Mahallesi Atatürk Caddesi No:123 İzmit/Kocaeli</td>
                        </tr>
                        <tr>
                          <td style={{ width: '150px' }} className="fw-bold">
                            Fatura Adresi
                          </td>
                          <td>Yahya Kaptan Mahallesi Atatürk Caddesi No:123 İzmit/Kocaeli</td>
                        </tr>
                        <tr>
                          <td style={{ width: '150px' }} className="fw-bold">
                            Ödeme Yöntemi
                          </td>
                          <td>
                            <Chip label="Kredi Kartı" color="primary" variant="outlined" />
                          </td>
                        </tr>
                        <tr>
                          <td style={{ width: '150px' }} className="fw-bold">
                            Ödeme Bilgileri
                          </td>
                          <td>
                            1234-56**-****-**** (Yapı Kredi Bankası - 3 Taksit)
                            <br />
                            <strong>Son Kullanma Tarihi:</strong>12/26 <br />
                          </td>
                        </tr>

                        <tr>
                          <td style={{ width: '150px' }} className="fw-bold">
                            Telefon
                          </td>
                          <td>0532 123 45 67</td>
                        </tr>
                        <tr>
                          <td style={{ width: '150px' }} className="fw-bold">
                            E-posta
                          </td>
                          <td>furkankocaman61@gmail.com</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Kapat
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailOrder;
