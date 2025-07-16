import React, { useState, useEffect, useContext } from 'react';
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
  CircularProgress,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { toast } from 'react-toastify';
import { ProductContext } from 'contexts/admin/gulAksesuar/ProductContext';

const CreateProduct = ({ open, onClose }) => {
  const { createProduct, loading, fetchProducts } = useContext(ProductContext);
  const [categories, setCategories] = useState(['Kategori 1', 'Kategori 2', 'Kategori 3']); // Dummy categories, replace with actual fetch
  const [formData, setFormData] = useState({
    product_name: '',
    product_description: '',
    product_price: '',
    stock_quantity: '',
    category: '',
    product_image: null,
    is_active_product: true,
    show_home_page: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.product_name) newErrors.product_name = 'Ürün adı gereklidir';
    if (!formData.product_description) newErrors.product_description = 'Açıklama gereklidir';
    if (!formData.product_price || formData.product_price <= 0) newErrors.product_price = 'Geçerli fiyat girin';
    if (!formData.stock_quantity || formData.stock_quantity <= 0) newErrors.stock_quantity = 'Geçerli stok girin';
    if (!formData.category) newErrors.category = 'Kategori seçiniz';
    if (!formData.product_image) newErrors.product_image = 'Ürün resmi ekleyiniz';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);

    const productData = new FormData();
    Object.keys(formData).forEach((key) => {
      productData.append(key, formData[key]);
    });

    const result = await createProduct(productData);
    if (result.success) {
      toast.success('Ürün başarıyla eklendi');
      fetchProducts();
      handleClose();
    } else {
      toast.error('Ürün eklenemedi');
    }
    setIsSubmitting(false);
  };

  const handleClose = () => {
    setFormData({
      product_name: '',
      product_description: '',
      product_price: '',
      stock_quantity: '',
      category: '',
      product_image: null,
      is_active_product: true,
      show_home_page: false
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Yeni Ürün Ekle</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Ürün Adı"
              name="product_name"
              fullWidth
              value={formData.product_name}
              onChange={handleChange}
              error={!!errors.product_name}
              helperText={errors.product_name}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Açıklama"
              name="product_description"
              multiline
              rows={3}
              fullWidth
              value={formData.product_description}
              onChange={handleChange}
              error={!!errors.product_description}
              helperText={errors.product_description}
            />
          </Grid>

          <Grid item xs={6} md={3}>
            <TextField
              label="Fiyat"
              name="product_price"
              type="number"
              fullWidth
              value={formData.product_price}
              onChange={handleChange}
              error={!!errors.product_price}
              helperText={errors.product_price}
            />
          </Grid>

          <Grid item xs={6} md={3}>
            <TextField
              label="Stok"
              name="stock_quantity"
              type="number"
              fullWidth
              value={formData.stock_quantity}
              onChange={handleChange}
              error={!!errors.stock_quantity}
              helperText={errors.stock_quantity}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.category}>
              <InputLabel>Kategori</InputLabel>
              <Select name="category" value={formData.category} onChange={handleChange} label="Kategori">
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button variant="outlined" component="label" fullWidth color={errors.product_image ? 'error' : 'primary'}>
              Resim Yükle
              <input type="file" hidden name="product_image" accept="image/*" onChange={handleChange} />
            </Button>
            {errors.product_image && <span style={{ color: 'red', fontSize: 12 }}>{errors.product_image}</span>}
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox checked={formData.is_active_product} onChange={handleChange} name="is_active_product" />}
              label="Aktif"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox checked={formData.show_home_page} onChange={handleChange} name="show_home_page" />}
              label="Ana Sayfada Göster"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isSubmitting}>
          İptal
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={isSubmitting}>
          {isSubmitting || loading ? <CircularProgress size={24} /> : 'Kaydet'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProduct;
