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

// Dummy ürün verisi
const initialProducts = [
  { id: 1, name: 'Bileklik', category: 'Takı', stock: 25 },
  { id: 2, name: 'Kolye', category: 'Takı', stock: 10 },
  { id: 3, name: 'Saat', category: 'Aksesuar', stock: 7 }
];

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', stock: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingProduct, setEditingProduct] = useState({ name: '', category: '', stock: '' });

  useEffect(() => {
    setProducts(initialProducts);
  }, []);

  const handleAddProduct = () => {
    if (!newProduct.name.trim() || !newProduct.category.trim() || !newProduct.stock) return;

    const newId = Date.now();
    setProducts([...products, { id: newId, ...newProduct }]);
    setNewProduct({ name: '', category: '', stock: '' });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditingProduct(product);
  };

  const handleSaveEdit = (id) => {
    setProducts(products.map((product) => (product.id === id ? editingProduct : product)));
    setEditingId(null);
    setEditingProduct({ name: '', category: '', stock: '' });
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '40px auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Ürün Yönetimi
      </Typography>

      {/* Yeni ürün ekleme alanı */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField label="Ürün Adı" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        <TextField
          label="Kategori"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <TextField
          label="Stok Adedi"
          type="number"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
        />
        <Button variant="contained" onClick={handleAddProduct}>
          Ekle
        </Button>
      </Box>

      {/* Ürün tablosu */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Ürün Adı</strong>
              </TableCell>
              <TableCell>
                <strong>Kategori</strong>
              </TableCell>
              <TableCell>
                <strong>Stok</strong>
              </TableCell>
              <TableCell align="right">
                <strong>İşlemler</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    {editingId === product.id ? (
                      <TextField
                        variant="standard"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      />
                    ) : (
                      product.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === product.id ? (
                      <TextField
                        variant="standard"
                        value={editingProduct.category}
                        onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      />
                    ) : (
                      product.category
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === product.id ? (
                      <TextField
                        variant="standard"
                        type="number"
                        value={editingProduct.stock}
                        onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                      />
                    ) : (
                      product.stock
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editingId === product.id ? (
                      <IconButton color="success" onClick={() => handleSaveEdit(product.id)}>
                        <SaveIcon />
                      </IconButton>
                    ) : (
                      <IconButton color="primary" onClick={() => handleEdit(product)}>
                        <EditIcon />
                      </IconButton>
                    )}
                    <IconButton color="error" onClick={() => handleDelete(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Ürün bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductPage;
