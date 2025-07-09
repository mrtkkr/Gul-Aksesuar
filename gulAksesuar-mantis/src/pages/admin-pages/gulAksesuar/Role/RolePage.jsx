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
import AddRole from './AddRolePage';

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

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const handleOpen = () => setOpenAddDialog(true);
  const handleClose = () => setOpenAddDialog(false);

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
    <main className="container my-3">
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header py-1 d-flex justify-content-between align-items-center">
              <h5 className="card-title">Roller</h5>
              {/* Kategori Ekle Butonu */}
              <button onClick={handleOpen} className="btn btn-sm btn-primary">
                <i className="fa-solid fa-plus"></i> Yeni Rol
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped mb-0">
                  <thead className="table-secondary">
                    <tr>
                      <th scope="col">Role Id</th>
                      <th scope="col">Role Name</th>
                      <th scope="col">Users of Role</th>
                      <th style={{ width: '150px' }}></th>

                      {/* <th scope="col">İşlemler</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Admin</td>
                      <td>2</td>
                      <td>
                        <a href="#duzenle" className="btn btn-warning btn-sm me-1">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </a>
                        <a href="#sil" className="btn btn-danger btn-sm me-1">
                          <i className="fa-solid fa-trash-can"></i>
                        </a>
                        <a href="#urun" className="btn btn-primary btn-sm">
                          <i className="fa-solid fa-right-long"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Supplier</td>
                      <td>5</td>
                      <td>
                        <a href="#duzenle" className="btn btn-warning btn-sm me-1">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </a>
                        <a href="#sil" className="btn btn-danger btn-sm me-1">
                          <i className="fa-solid fa-trash-can"></i>
                        </a>
                        <a href="#urun" className="btn btn-primary btn-sm">
                          <i className="fa-solid fa-right-long"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Customer</td>
                      <td>134</td>
                      <td>
                        <a href="#duzenle" className="btn btn-warning btn-sm me-1">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </a>
                        <a href="#sil" className="btn btn-danger btn-sm me-1">
                          <i className="fa-solid fa-trash-can"></i>
                        </a>
                        <a href="#kullanıcılaragit" className="btn btn-primary btn-sm">
                          <i className="fa-solid fa-right-long"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* AddCategory Dialog'u buraya eklenir */}
      <AddRole open={openAddDialog} onClose={handleClose} />
    </main>

    // <Box sx={{ maxWidth: 800, margin: '40px auto', p: 2 }}>
    //   <Typography variant="h4" gutterBottom>
    //     Rol Yönetimi
    //   </Typography>

    //   <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
    //     <TextField label="Rol Adı" value={newRole.name} onChange={(e) => setNewRole({ ...newRole, name: e.target.value })} />
    //     <TextField label="Açıklama" value={newRole.description} onChange={(e) => setNewRole({ ...newRole, description: e.target.value })} />
    //     <Button variant="contained" onClick={handleAddRole}>
    //       Ekle
    //     </Button>
    //   </Box>

    //   <TableContainer component={Paper}>
    //     <Table>
    //       <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
    //         <TableRow>
    //           <TableCell>
    //             <strong>ID</strong>
    //           </TableCell>
    //           <TableCell>
    //             <strong>Rol Adı</strong>
    //           </TableCell>
    //           <TableCell>
    //             <strong>Açıklama</strong>
    //           </TableCell>
    //           <TableCell align="right">
    //             <strong>İşlemler</strong>
    //           </TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {roles.length > 0 ? (
    //           roles.map((role) => (
    //             <TableRow key={role.id}>
    //               <TableCell>{role.id}</TableCell>
    //               <TableCell>
    //                 {editingId === role.id ? (
    //                   <TextField
    //                     variant="standard"
    //                     value={editingRole.name}
    //                     onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
    //                   />
    //                 ) : (
    //                   role.name
    //                 )}
    //               </TableCell>
    //               <TableCell>
    //                 {editingId === role.id ? (
    //                   <TextField
    //                     variant="standard"
    //                     value={editingRole.description}
    //                     onChange={(e) => setEditingRole({ ...editingRole, description: e.target.value })}
    //                   />
    //                 ) : (
    //                   role.description
    //                 )}
    //               </TableCell>
    //               <TableCell align="right">
    //                 {editingId === role.id ? (
    //                   <IconButton color="success" onClick={handleSave}>
    //                     <SaveIcon />
    //                   </IconButton>
    //                 ) : (
    //                   <IconButton color="primary" onClick={() => handleEdit(role)}>
    //                     <EditIcon />
    //                   </IconButton>
    //                 )}
    //                 <IconButton color="error" onClick={() => handleDelete(role.id)}>
    //                   <DeleteIcon />
    //                 </IconButton>
    //               </TableCell>
    //             </TableRow>
    //           ))
    //         ) : (
    //           <TableRow>
    //             <TableCell colSpan={4} align="center">
    //               Rol bulunamadı.
    //             </TableCell>
    //           </TableRow>
    //         )}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    // </Box>
  );
};

export default RolePage;
