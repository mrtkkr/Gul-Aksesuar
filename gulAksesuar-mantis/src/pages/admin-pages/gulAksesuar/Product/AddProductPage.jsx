import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  MenuItem
} from '@mui/material';
import { toast } from 'react-toastify';

const AddProduct = ({ open, onClose, categories = [], addProduct, fetchProducts }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    isActive: true,
    showHomePage: false,
    categoryId: '',
    imageFile: null
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const validateForm = () => {
    const formErrors = {};
    if (!formData.name.trim()) formErrors.name = 'Ürün adı zorunludur.';
    if (!formData.price || isNaN(formData.price)) formErrors.price = 'Geçerli fiyat girin.';
    if (!formData.categoryId) formErrors.categoryId = 'Kategori seçin.';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file
      }));

      // Resim önizlemesi oluştur
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const productData = new FormData();
    productData.append('name', formData.name);
    productData.append('description', formData.description);
    productData.append('price', formData.price);
    productData.append('isActive', formData.isActive);
    productData.append('showHomePage', formData.showHomePage);
    productData.append('categoryId', formData.categoryId);

    if (formData.imageFile) {
      productData.append('image', formData.imageFile);
    }

    const res = await addProduct(productData); // sunucu 'multipart/form-data' desteklemeli

    if (res?.error) {
      toast.error('Ürün eklenemedi!');
    } else {
      toast.success('Ürün başarıyla eklendi!');
      onClose();
      setFormData({
        name: '',
        description: '',
        price: '',
        isActive: true,
        showHomePage: false,
        categoryId: '',
        imageFile: null
      });
      setImagePreview(null);
      fetchProducts?.();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Yeni Ürün Ekle</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ürün Adı"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Ürün Açıklaması"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Fiyat"
              name="price"
              value={formData.price}
              onChange={handleChange}
              error={!!errors.price}
              helperText={errors.price}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Kategori"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              error={!!errors.categoryId}
              helperText={errors.categoryId}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" component="label" fullWidth>
              Görsel Seç
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>
            {formData.imageFile && (
              <div style={{ marginTop: 8 }}>
                <small>Seçilen dosya: {formData.imageFile.name}</small>
                {imagePreview && (
                  <div style={{ marginTop: 8, textAlign: 'center' }}>
                    <img
                      src={imagePreview}
                      alt="Seçilen resim önizlemesi"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '200px',
                        borderRadius: '8px',
                        border: '1px solid #ddd'
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox checked={formData.isActive} onChange={handleCheckbox} name="isActive" color="primary" />}
              label="Aktif"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox checked={formData.showHomePage} onChange={handleCheckbox} name="showHomePage" color="primary" />}
              label="Ana Sayfada Göster"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          İptal
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProduct;
