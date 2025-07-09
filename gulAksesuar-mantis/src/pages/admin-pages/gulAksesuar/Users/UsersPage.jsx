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
import AddUser from './AddUserPage';

const initialUsers = [
  { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', role: 'Admin' },
  { id: 2, name: 'Ayşe Demir', email: 'ayse@example.com', role: 'Kullanıcı' }
];

const UsersPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingUser, setEditingUser] = useState({ name: '', email: '', role: '' });

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const handleOpen = () => setOpenAddDialog(true);
  const handleClose = () => setOpenAddDialog(false);

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
    <main className="container my-3">
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header py-1 d-flex justify-content-between align-items-center">
              <h5 className="card-title">Kullanıcılar</h5>
              {/* Kategori Ekle Butonu */}
              <button onClick={handleOpen} className="btn btn-sm btn-primary">
                <i className="fa-solid fa-plus"></i> Yeni Kullanıcı
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-hover table-striped mb-0">
                  <thead className="table-secondary">
                    <tr>
                      <th scope="col" style={{ fontSize: '18px' }}>
                        User Id
                      </th>
                      <th scope="col" style={{ fontSize: '18px' }}>
                        Image
                      </th>
                      <th scope="col" style={{ fontSize: '18px' }}>
                        Username
                      </th>
                      <th scope="col">Name</th>
                      <th scope="col">Surname</th>
                      <th scope="col">Email</th>
                      <th scope="col">Role</th>

                      <th scope="col">Approved</th>

                      <th style={{ width: '150px' }}></th>
                      {/* <th scope="col">İşlemler</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <img
                          src="/images/user.png"
                          className="img-fluid"
                          style={{ maxWidth: '50px', height: 'auto', borderRadius: '8px', objectFit: 'cover' }}
                          alt="First Product Image"
                        />
                      </td>
                      <td>
                        <a href="#">mrtkkr01</a>
                      </td>
                      <td>Mert</td>
                      <td>Köker</td>
                      <td>mrtkkr01@gmail.com</td>
                      <td>Admin</td>
                      <td>
                        <i className="fa-solid fa-circle-check text-success"></i>
                      </td>

                      <td>
                        <a href="#duzenle" className="btn btn-warning btn-sm me-1 my-1">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </a>
                        <a href="#sil" className="btn btn-danger btn-sm me-1 my-1">
                          <i className="fa-solid fa-trash-can"></i>
                        </a>
                        <a href="#urun" className="btn btn-primary btn-sm">
                          <i className="fa-solid fa-right-long"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        <img
                          src="/images/user.png"
                          className="img-fluid"
                          style={{ maxWidth: '50px', height: 'auto', borderRadius: '8px', objectFit: 'cover' }}
                          alt="First Product Image"
                        />
                      </td>
                      <td>
                        <a href="#">drykzlyr</a>
                      </td>
                      <td>Derya</td>
                      <td>Kızılyar</td>
                      <td>drykzlyr25@gmail.com</td>
                      <td>Supplier</td>
                      <td>
                        <i className="fa-solid fa-circle-check text-danger"></i>
                      </td>

                      <td>
                        <a href="#duzenle" className="btn btn-warning btn-sm me-1 my-1">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </a>
                        <a href="#sil" className="btn btn-danger btn-sm me-1 my-1">
                          <i className="fa-solid fa-trash-can"></i>
                        </a>
                        <a href="#urun" className="btn btn-primary btn-sm">
                          <i className="fa-solid fa-right-long"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>
                        <img
                          src="/images/user.png"
                          className="img-fluid"
                          style={{ maxWidth: '50px', height: 'auto', borderRadius: '8px', objectFit: 'cover' }}
                          alt="First Product Image"
                        />
                      </td>
                      <td>
                        <a href="#">loser1</a>
                      </td>
                      <td>Taha</td>
                      <td>Yeşilkent</td>
                      <td>tahayesikent07@gmail.com</td>
                      <td>Customer</td>
                      <td>
                        <i className="fa-solid fa-circle-check text-danger"></i>
                      </td>

                      <td>
                        <a href="#duzenle" className="btn btn-warning btn-sm me-1 my-1">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </a>
                        <a href="#sil" className="btn btn-danger btn-sm me-1 my-1">
                          <i className="fa-solid fa-trash-can"></i>
                        </a>
                        <a href="#urun" className="btn btn-primary btn-sm">
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
      <AddUser open={openAddDialog} onClose={handleClose} />
    </main>
    // <Box sx={{ maxWidth: 900, margin: '40px auto', p: 2 }}>
    //   <Typography variant="h4" gutterBottom>
    //     Kullanıcı Yönetimi
    //   </Typography>

    //   <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
    //     <TextField label="Ad Soyad" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
    //     <TextField label="E-posta" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
    //     <TextField label="Rol" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} />
    //     <Button variant="contained" onClick={handleAddUser}>
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
    //             <strong>Ad Soyad</strong>
    //           </TableCell>
    //           <TableCell>
    //             <strong>E-posta</strong>
    //           </TableCell>
    //           <TableCell>
    //             <strong>Rol</strong>
    //           </TableCell>
    //           <TableCell align="right">
    //             <strong>İşlemler</strong>
    //           </TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {users.length > 0 ? (
    //           users.map((user) => (
    //             <TableRow key={user.id}>
    //               <TableCell>{user.id}</TableCell>
    //               <TableCell>
    //                 {editingId === user.id ? (
    //                   <TextField
    //                     variant="standard"
    //                     value={editingUser.name}
    //                     onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
    //                   />
    //                 ) : (
    //                   user.name
    //                 )}
    //               </TableCell>
    //               <TableCell>
    //                 {editingId === user.id ? (
    //                   <TextField
    //                     variant="standard"
    //                     value={editingUser.email}
    //                     onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
    //                   />
    //                 ) : (
    //                   user.email
    //                 )}
    //               </TableCell>
    //               <TableCell>
    //                 {editingId === user.id ? (
    //                   <TextField
    //                     variant="standard"
    //                     value={editingUser.role}
    //                     onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
    //                   />
    //                 ) : (
    //                   user.role
    //                 )}
    //               </TableCell>
    //               <TableCell align="right">
    //                 {editingId === user.id ? (
    //                   <IconButton color="success" onClick={handleSave}>
    //                     <SaveIcon />
    //                   </IconButton>
    //                 ) : (
    //                   <IconButton color="primary" onClick={() => handleEdit(user)}>
    //                     <EditIcon />
    //                   </IconButton>
    //                 )}
    //                 <IconButton color="error" onClick={() => handleDelete(user.id)}>
    //                   <DeleteIcon />
    //                 </IconButton>
    //               </TableCell>
    //             </TableRow>
    //           ))
    //         ) : (
    //           <TableRow>
    //             <TableCell colSpan={5} align="center">
    //               Kullanıcı bulunamadı.
    //             </TableCell>
    //           </TableRow>
    //         )}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    // </Box>
  );
};

export default UsersPage;
