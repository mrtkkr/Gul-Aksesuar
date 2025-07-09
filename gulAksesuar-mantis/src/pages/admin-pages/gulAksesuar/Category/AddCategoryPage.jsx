import React, { useState, useContext } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';
// import { CategoryContext } from 'contexts/admin/CategoryContext'; // kendi context dosyana göre düzelt

const AddCategory = ({ open, onClose }) => {
  //   const { addCategory, fetchCategories } = useContext(CategoryContext);

  const [formData, setFormData] = useState({
    name: '',
    slug: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!formData.name.trim()) {
      formErrors.name = 'Kategori adı zorunludur.';
    }
    if (!formData.slug.trim()) {
      formErrors.slug = 'URL (slug) zorunludur.';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const newCategory = {
      name: formData.name.trim(),
      slug: formData.slug.trim()
    };

    const res = await addCategory(newCategory);

    if (res?.error) {
      toast.error('Kategori eklenemedi!');
    } else {
      toast.success('Kategori başarıyla eklendi!');
      setFormData({ name: '', slug: '' });
      onClose();
      fetchCategories();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Yeni Kategori Ekle</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Kategori Adı"
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
              label="URL (slug)"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              error={!!errors.slug}
              helperText={errors.slug}
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

export default AddCategory;
