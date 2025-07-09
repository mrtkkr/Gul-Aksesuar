import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';

const AddRole = ({ open, onClose, addRole, fetchRoles }) => {
  const [formData, setFormData] = useState({
    roleName: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!formData.roleName.trim()) {
      formErrors.roleName = 'Rol adı zorunludur.';
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

    const newRole = {
      roleName: formData.roleName.trim()
    };

    const res = await addRole(newRole);

    if (res?.error) {
      toast.error('Rol eklenemedi!');
    } else {
      toast.success('Rol başarıyla eklendi!');
      setFormData({ roleName: '' });
      onClose();
      fetchRoles?.();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Yeni Rol Ekle</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Rol Adı"
              name="roleName"
              value={formData.roleName}
              onChange={handleChange}
              error={!!errors.roleName}
              helperText={errors.roleName}
              placeholder="Örn: Admin, Moderator, User"
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

export default AddRole;
