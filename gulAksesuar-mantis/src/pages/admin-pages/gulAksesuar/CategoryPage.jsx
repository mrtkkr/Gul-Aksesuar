import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

// Dummy data
const initialCategories = [
  { id: 1, name: 'Bileklik' },
  { id: 2, name: 'Kolye' },
  { id: 3, name: 'Küpe' }
];

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  useEffect(() => {
    setCategories(initialCategories);
  }, []);

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    setCategories([...categories, { id: Date.now(), name: newCategory.trim() }]);
    setNewCategory('');
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleSaveEdit = (id) => {
    setCategories(categories.map((cat) => (cat.id === id ? { ...cat, name: editingName } : cat)));
    setEditingId(null);
    setEditingName('');
  };

  return (
    <Box sx={{ maxWidth: 700, margin: '40px auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Kategori Yönetimi
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="Yeni kategori adı"
          variant="outlined"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddCategory}>
          Ekle
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Kategori Adı</strong>
              </TableCell>
              <TableCell align="right">
                <strong>İşlemler</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell>{cat.id}</TableCell>
                  <TableCell>
                    {editingId === cat.id ? (
                      <TextField variant="standard" value={editingName} onChange={(e) => setEditingName(e.target.value)} />
                    ) : (
                      cat.name
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editingId === cat.id ? (
                      <IconButton color="success" onClick={() => handleSaveEdit(cat.id)}>
                        <SaveIcon />
                      </IconButton>
                    ) : (
                      <IconButton color="primary" onClick={() => handleEdit(cat.id, cat.name)}>
                        <EditIcon />
                      </IconButton>
                    )}
                    <IconButton color="error" onClick={() => handleDelete(cat.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Kategori bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CategoryPage;
