import React, { useState, useContext, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Checkbox,
  FormControlLabel,
  CircularProgress
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { tr } from 'date-fns/locale';
import { toast } from 'react-toastify';
import { ProductContext } from 'contexts/admin/gulAksesuar/ProductContext';

const EditProduct = ({ open, onClose, productId }) => {
  const { updateProduct, getProductById, fetchProducts, loading } = useContext(ProductContext);
  const [categories, setCategories] = useState(['Kategori 1', 'Kategori 2', 'Kategori 3']); // Dummy categories, replace with actual fetch
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [showHomePage, setShowHomePage] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const loadProduct = async () => {
    try {
      const data = await getProductById(productId);
      if (data) {
        setProductName(data.product_name);
        setProductDescription(data.product_description);
        setProductPrice(data.product_price);
        setStockQuantity(data.stock_quantity);
        setCategoryId(data.category?.id);
        setIsActive(data.is_active_product);
        setShowHomePage(data.show_home_page);
        setDate(new Date(data.date));
      }
    } catch (error) {
      toast.error('Ürün bilgisi yüklenemedi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('product_name', productName);
    formData.append('product_description', productDescription);
    formData.append('product_price', productPrice);
    formData.append('stock_quantity', stockQuantity);
    formData.append('category', categoryId);
    formData.append('is_active_product', isActive);
    formData.append('show_home_page', showHomePage);
    formData.append('date', date.toISOString());
    if (productImage) formData.append('product_image', productImage);

    try {
      const result = await updateProduct(productId, formData);
      if (result.success) {
        toast.success('Ürün başarıyla güncellendi.');
        fetchProducts();
        onClose();
      } else {
        toast.error(result.error || 'Ürün güncellenemedi.');
      }
    } catch (error) {
      toast.error('Güncelleme sırasında hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Ürünü Düzenle</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField label="Ürün Adı" fullWidth value={productName} onChange={(e) => setProductName(e.target.value)} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField label="Fiyat" type="number" fullWidth value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Açıklama"
                fullWidth
                multiline
                minRows={3}
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Stok Miktarı"
                type="number"
                fullWidth
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Kategori</InputLabel>
                <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} label="Kategori">
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={<Checkbox checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />}
                label="Aktif mi?"
              />
              <FormControlLabel
                control={<Checkbox checked={showHomePage} onChange={(e) => setShowHomePage(e.target.checked)} />}
                label="Ana sayfada göster"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <input type="file" accept="image/*" onChange={(e) => setProductImage(e.target.files[0])} />
            </Grid>

            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={tr}>
                <DatePicker
                  label="Tarih"
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isSubmitting || loading}>
          İptal
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" disabled={isSubmitting || loading}>
          {isSubmitting || loading ? <CircularProgress size={24} /> : 'Güncelle'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProduct;
