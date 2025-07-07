import React, { useState } from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const initialUsers = [
  { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', role: 'Admin' },
  { id: 2, name: 'Ayşe Demir', email: 'ayse@example.com', role: 'Kullanıcı' }
];

const UsersPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingUser, setEditingUser] = useState({ name: '', email: '', role: '' });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) return;

    setUsers([...users, { id: Date.now(), ...newUser }]);
    setNewUser({ name: '', email: '', role: '' });
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditingUser(user);
  };

  const handleSave = () => {
    setUsers(users.map((u) => (u.id === editingId ? editingUser : u)));
    setEditingId(null);
    setEditingUser({ name: '', email: '', role: '' });
  };

  return (
    <Box sx={{ maxWidth: 900, margin: '40px auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Kullanıcı Yönetimi
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField label="Ad Soyad" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
        <TextField label="E-posta" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
        <TextField label="Rol" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} />
        <Button variant="contained" onClick={handleAddUser}>
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
                <strong>Ad Soyad</strong>
              </TableCell>
              <TableCell>
                <strong>E-posta</strong>
              </TableCell>
              <TableCell>
                <strong>Rol</strong>
              </TableCell>
              <TableCell align="right">
                <strong>İşlemler</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    {editingId === user.id ? (
                      <TextField
                        variant="standard"
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                      />
                    ) : (
                      user.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === user.id ? (
                      <TextField
                        variant="standard"
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                      />
                    ) : (
                      user.email
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === user.id ? (
                      <TextField
                        variant="standard"
                        value={editingUser.role}
                        onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                      />
                    ) : (
                      user.role
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editingId === user.id ? (
                      <IconButton color="success" onClick={handleSave}>
                        <SaveIcon />
                      </IconButton>
                    ) : (
                      <IconButton color="primary" onClick={() => handleEdit(user)}>
                        <EditIcon />
                      </IconButton>
                    )}
                    <IconButton color="error" onClick={() => handleDelete(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Kullanıcı bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersPage;
