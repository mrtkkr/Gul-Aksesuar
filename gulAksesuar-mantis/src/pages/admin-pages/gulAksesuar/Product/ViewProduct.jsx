import React, { useState, useContext, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Paper,
  Divider
} from '@mui/material';
import { ProductContext } from 'contexts/admin/gulAksesuar/ProductContext';
import { AuthContext } from 'contexts/auth/AuthContext';

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('tr-TR', options);
};

const formatNumber = (number) => {
  if (number === null || number === undefined || isNaN(number)) return '-';
  return `${Number(number).toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })} ₺`;
};

const ViewProduct = ({ open, onClose, productId }) => {
  const { getProductById } = useContext(ProductContext);
  const { fetchUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (open && productId) {
      fetchProductDetails();
      checkAdminStatus();
    }
  }, [open, productId]);

  const checkAdminStatus = async () => {
    try {
      const user = await fetchUser();
      if (user) {
        setIsAdmin(user.groups.includes('Admin') || user.is_superuser);
      }
    } catch (error) {
      console.error('Kullanıcı bilgileri alınırken hata:', error);
    }
  };

  const fetchProductDetails = async () => {
    setIsLoading(true);
    try {
      const result = await getProductById(productId);
      if (result.success) {
        setProduct(result.data);
      }
    } catch (error) {
      console.error('Ürün bilgisi alınırken hata:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const DetailItem = ({ label, value }) => (
    <Grid container spacing={2} sx={{ mb: 1 }}>
      <Grid item xs={4} md={3}>
        <Typography variant="subtitle2" color="text.secondary">
          {label}:
        </Typography>
      </Grid>
      <Grid item xs={8} md={9}>
        <Typography variant="body1">{value || '-'}</Typography>
      </Grid>
    </Grid>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Ürün Detayları</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : product ? (
          <Paper elevation={0} sx={{ p: 2 }}>
            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                Ürün Bilgileri
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <DetailItem label="Ürün Adı" value={product.product_name} />
              <DetailItem label="Açıklama" value={product.product_description} />
              <DetailItem label="Fiyat" value={formatNumber(product.product_price)} />
              <DetailItem label="Stok Miktarı" value={product.stock_quantity} />
              <DetailItem label="Kategori" value={product.category?.category_name} />
              <DetailItem label="Durum" value={product.is_active_product ? 'Aktif' : 'Pasif'} />
              <DetailItem label="Ana Sayfada Göster" value={product.show_home_page ? 'Evet' : 'Hayır'} />
              <DetailItem label="Oluşturan" value={product.created_by?.username} />
              <DetailItem label="Tarih" value={formatDate(product.date)} />
              <DetailItem
                label="Ürün Görseli"
                value={
                  product.product_image ? (
                    <img
                      src={product.product_image}
                      alt={product.product_name}
                      style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                    />
                  ) : (
                    'Görsel yok'
                  )
                }
              />
            </Box>
            {isAdmin && (
              <Box mt={3} p={2} bgcolor="info.light" borderRadius={1}>
                <Typography variant="body2">
                  Admin yetkisiyle görüntülüyorsunuz. Düzenlemek için ana sayfadaki düzenle butonunu kullanabilirsiniz.
                </Typography>
              </Box>
            )}
          </Paper>
        ) : (
          <Box p={2} textAlign="center">
            <Typography variant="body1" color="error">
              Ürün bilgisi bulunamadı veya yüklenirken bir hata oluştu.
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Kapat
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewProduct;
