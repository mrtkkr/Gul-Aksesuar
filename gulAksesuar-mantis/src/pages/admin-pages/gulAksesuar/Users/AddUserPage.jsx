import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  MenuItem
} from '@mui/material';
import { toast } from 'react-toastify';

const AddUser = ({ open, onClose, addUser, fetchUsers, roles = [] }) => {
  const initialState = {
    username: '',
    name: '',
    surname: '',
    email: '',
    approved: false,
    roleId: '' // dropdown için tekli seçim
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!formData.username.trim()) formErrors.username = 'Kullanıcı adı zorunludur.';
    if (!formData.name.trim()) formErrors.name = 'Ad zorunludur.';
    if (!formData.surname.trim()) formErrors.surname = 'Soyad zorunludur.';
    if (!formData.email.trim()) formErrors.email = 'Email zorunludur.';
    if (!formData.roleId) formErrors.roleId = 'Rol seçimi zorunludur.';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const newUser = new FormData();
    newUser.append('username', formData.username.trim());
    newUser.append('name', formData.name.trim());
    newUser.append('surname', formData.surname.trim());
    newUser.append('email', formData.email.trim());
    newUser.append('approved', formData.approved);
    newUser.append('roleId', formData.roleId);

    const res = await addUser(newUser);

    if (res?.error) {
      toast.error('Kullanıcı eklenemedi!');
    } else {
      toast.success('Kullanıcı başarıyla eklendi!');
      resetForm();
      onClose();
      fetchUsers?.();
    }
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Yeni Kullanıcı Ekle</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Kullanıcı Adı"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Ad"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Soyad"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              error={!!errors.surname}
              helperText={errors.surname}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox name="approved" checked={formData.approved} onChange={handleChange} />}
              label="Onaylı Kullanıcı"
            />
          </Grid>

          {/* 🔽 ROL SEÇİMİ */}
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Rol Seç"
              name="roleId"
              value={formData.roleId}
              onChange={handleChange}
              error={!!errors.roleId}
              helperText={errors.roleId}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          İptal
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUser;
