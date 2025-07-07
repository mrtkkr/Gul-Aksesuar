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

// Dummy sipariş verisi
const initialOrders = [
  { id: 1, customer: 'Ahmet Yılmaz', product: 'Bileklik', quantity: 2 },
  { id: 2, customer: 'Ayşe Demir', product: 'Kolye', quantity: 1 },
  { id: 3, customer: 'Mehmet Kaya', product: 'Küpe', quantity: 3 }
];

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ customer: '', product: '', quantity: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingOrder, setEditingOrder] = useState({ customer: '', product: '', quantity: '' });

  useEffect(() => {
    setOrders(initialOrders);
  }, []);

  const handleAddOrder = () => {
    if (!newOrder.customer.trim() || !newOrder.product.trim() || !newOrder.quantity) return;

    const newId = Date.now();
    setOrders([...orders, { id: newId, ...newOrder }]);
    setNewOrder({ customer: '', product: '', quantity: '' });
  };

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const handleEdit = (order) => {
    setEditingId(order.id);
    setEditingOrder(order);
  };

  const handleSaveEdit = (id) => {
    setOrders(orders.map((order) => (order.id === id ? editingOrder : order)));
    setEditingId(null);
    setEditingOrder({ customer: '', product: '', quantity: '' });
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '40px auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Sipariş Yönetimi
      </Typography>

      {/* Yeni sipariş ekleme */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField label="Müşteri Adı" value={newOrder.customer} onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })} />
        <TextField label="Ürün" value={newOrder.product} onChange={(e) => setNewOrder({ ...newOrder, product: e.target.value })} />
        <TextField
          label="Adet"
          type="number"
          value={newOrder.quantity}
          onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
        />
        <Button variant="contained" onClick={handleAddOrder}>
          Ekle
        </Button>
      </Box>

      {/* Sipariş tablosu */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Müşteri</strong>
              </TableCell>
              <TableCell>
                <strong>Ürün</strong>
              </TableCell>
              <TableCell>
                <strong>Adet</strong>
              </TableCell>
              <TableCell align="right">
                <strong>İşlemler</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {editingId === order.id ? (
                      <TextField
                        variant="standard"
                        value={editingOrder.customer}
                        onChange={(e) => setEditingOrder({ ...editingOrder, customer: e.target.value })}
                      />
                    ) : (
                      order.customer
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === order.id ? (
                      <TextField
                        variant="standard"
                        value={editingOrder.product}
                        onChange={(e) => setEditingOrder({ ...editingOrder, product: e.target.value })}
                      />
                    ) : (
                      order.product
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === order.id ? (
                      <TextField
                        variant="standard"
                        type="number"
                        value={editingOrder.quantity}
                        onChange={(e) => setEditingOrder({ ...editingOrder, quantity: e.target.value })}
                      />
                    ) : (
                      order.quantity
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editingId === order.id ? (
                      <IconButton color="success" onClick={() => handleSaveEdit(order.id)}>
                        <SaveIcon />
                      </IconButton>
                    ) : (
                      <IconButton color="primary" onClick={() => handleEdit(order)}>
                        <EditIcon />
                      </IconButton>
                    )}
                    <IconButton color="error" onClick={() => handleDelete(order.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Sipariş bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderPage;
