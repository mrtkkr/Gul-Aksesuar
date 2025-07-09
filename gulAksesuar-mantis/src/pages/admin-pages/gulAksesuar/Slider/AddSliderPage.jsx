import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, FormControlLabel, Checkbox } from '@mui/material';
import { toast } from 'react-toastify';

const AddSlider = ({ open, onClose, addSlider, fetchSliders }) => {
  const [formData, setFormData] = useState({
    title: '',
    isActive: true,
    index: '',
    imageFile: null
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const validateForm = () => {
    const formErrors = {};
    if (!formData.title.trim()) formErrors.title = 'Slider başlığı zorunludur.';
    if (!formData.index || isNaN(formData.index)) formErrors.index = 'Geçerli index numarası girin.';
    if (!formData.imageFile) formErrors.imageFile = 'Slider görseli zorunludur.';

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

      // Dosya seçildiğinde hata mesajını temizle
      setErrors((prev) => ({ ...prev, imageFile: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const sliderData = new FormData();
    sliderData.append('title', formData.title);
    sliderData.append('isActive', formData.isActive);
    sliderData.append('index', formData.index);

    if (formData.imageFile) {
      sliderData.append('image', formData.imageFile);
    }

    const res = await addSlider(sliderData); // sunucu 'multipart/form-data' desteklemeli

    if (res?.error) {
      toast.error('Slider eklenemedi!');
    } else {
      toast.success('Slider başarıyla eklendi!');
      onClose();
      setFormData({
        title: '',
        isActive: true,
        index: '',
        imageFile: null
      });
      setImagePreview(null);
      fetchSliders?.();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Yeni Slider Ekle</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Slider Başlığı"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Index (Sıra Numarası)"
              name="index"
              type="number"
              value={formData.index}
              onChange={handleChange}
              error={!!errors.index}
              helperText={errors.index}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" component="label" fullWidth>
              Slider Görseli Seç
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>
            {errors.imageFile && <div style={{ marginTop: 8, color: '#d32f2f', fontSize: '0.75rem' }}>{errors.imageFile}</div>}
            {formData.imageFile && (
              <div style={{ marginTop: 8 }}>
                <small>Seçilen dosya: {formData.imageFile.name}</small>
                {imagePreview && (
                  <div style={{ marginTop: 8, textAlign: 'center' }}>
                    <img
                      src={imagePreview}
                      alt="Seçilen slider görseli önizlemesi"
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
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={formData.isActive} onChange={handleCheckbox} name="isActive" color="primary" />}
              label="Aktif"
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

export default AddSlider;
