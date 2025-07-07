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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const initialRoles = [
  { id: 1, name: 'Yönetici', description: 'Tüm yetkilere sahip kullanıcı' },
  { id: 2, name: 'Editör', description: 'İçerikleri düzenleyebilir' },
  { id: 3, name: 'Üye', description: 'Sadece içerik görüntüleyebilir' }
];

const RolePage = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [newRole, setNewRole] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingRole, setEditingRole] = useState({ name: '', description: '' });

  const handleAddRole = () => {
    if (!newRole.name.trim() || !newRole.description.trim()) return;

    setRoles([...roles, { id: Date.now(), ...newRole }]);
    setNewRole({ name: '', description: '' });
  };

  const handleDelete = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const handleEdit = (role) => {
    setEditingId(role.id);
    setEditingRole(role);
  };

  const handleSave = () => {
    setRoles(roles.map((role) => (role.id === editingId ? editingRole : role)));
    setEditingId(null);
    setEditingRole({ name: '', description: '' });
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '40px auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Rol Yönetimi
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField label="Rol Adı" value={newRole.name} onChange={(e) => setNewRole({ ...newRole, name: e.target.value })} />
        <TextField label="Açıklama" value={newRole.description} onChange={(e) => setNewRole({ ...newRole, description: e.target.value })} />
        <Button variant="contained" onClick={handleAddRole}>
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
                <strong>Rol Adı</strong>
              </TableCell>
              <TableCell>
                <strong>Açıklama</strong>
              </TableCell>
              <TableCell align="right">
                <strong>İşlemler</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.length > 0 ? (
              roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.id}</TableCell>
                  <TableCell>
                    {editingId === role.id ? (
                      <TextField
                        variant="standard"
                        value={editingRole.name}
                        onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                      />
                    ) : (
                      role.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === role.id ? (
                      <TextField
                        variant="standard"
                        value={editingRole.description}
                        onChange={(e) => setEditingRole({ ...editingRole, description: e.target.value })}
                      />
                    ) : (
                      role.description
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editingId === role.id ? (
                      <IconButton color="success" onClick={handleSave}>
                        <SaveIcon />
                      </IconButton>
                    ) : (
                      <IconButton color="primary" onClick={() => handleEdit(role)}>
                        <EditIcon />
                      </IconButton>
                    )}
                    <IconButton color="error" onClick={() => handleDelete(role.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Rol bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RolePage;
