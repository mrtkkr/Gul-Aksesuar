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
import AddCategory from './AddCategoryPage';

// Dummy data
const initialCategories = [
  { id: 1, name: 'Bileklik' },
  { id: 2, name: 'Kolye' },
  { id: 3, name: 'Küpe' }
];

const CategoryPage = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleOpen = () => setOpenAddDialog(true);
  const handleClose = () => setOpenAddDialog(false);

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
    <main className="container my-3">
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header py-1 d-flex justify-content-between align-items-center">
              <h5 className="card-title">Kategoriler</h5>
              {/* Kategori Ekle Butonu */}
              <button onClick={handleOpen} className="btn btn-sm btn-primary">
                <i className="fa-solid fa-plus"></i> Yeni Kategori
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped mb-0">
                  <thead className="table-secondary">
                    <tr>
                      <th scope="col">Category Id</th>
                      <th scope="col">Category</th>
                      <th scope="col">Url</th>
                      <th scope="col">Ürün Sayısı</th>

                      <th style={{ width: '150px' }}></th>

                      {/* <th scope="col">İşlemler</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Telefon</td>
                      <td>telefon</td>
                      <td>14</td>

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
                      <td>Beyaz Eşya</td>
                      <td>beyaz-esya</td>
                      <td>18</td>

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
                      <td>Televizyon</td>
                      <td>tv</td>
                      <td>50</td>

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
                      <td>4</td>
                      <td>Bilgisayar</td>
                      <td>bilgisayar</td>
                      <td>32</td>

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
                      <td>5</td>
                      <td>Akıllı Saat</td>
                      <td>akilli-saat</td>
                      <td>21</td>

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
                      <td>6</td>
                      <td>Monitor</td>
                      <td>monitor</td>
                      <td>19</td>

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
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* AddCategory Dialog'u buraya eklenir */}
      <AddCategory open={openAddDialog} onClose={handleClose} />
    </main>

    // <Box sx={{ maxWidth: 700, margin: '40px auto', p: 2 }}>
    //   <Typography variant="h4" gutterBottom>
    //     Kategori Yönetimi
    //   </Typography>

    //   <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
    //     <TextField
    //       fullWidth
    //       label="Yeni kategori adı"
    //       variant="outlined"
    //       value={newCategory}
    //       onChange={(e) => setNewCategory(e.target.value)}
    //     />
    //     <Button variant="contained" color="primary" onClick={handleAddCategory}>
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
    //             <strong>Kategori Adı</strong>
    //           </TableCell>
    //           <TableCell align="right">
    //             <strong>İşlemler</strong>
    //           </TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {categories.length > 0 ? (
    //           categories.map((cat) => (
    //             <TableRow key={cat.id}>
    //               <TableCell>{cat.id}</TableCell>
    //               <TableCell>
    //                 {editingId === cat.id ? (
    //                   <TextField variant="standard" value={editingName} onChange={(e) => setEditingName(e.target.value)} />
    //                 ) : (
    //                   cat.name
    //                 )}
    //               </TableCell>
    //               <TableCell align="right">
    //                 {editingId === cat.id ? (
    //                   <IconButton color="success" onClick={() => handleSaveEdit(cat.id)}>
    //                     <SaveIcon />
    //                   </IconButton>
    //                 ) : (
    //                   <IconButton color="primary" onClick={() => handleEdit(cat.id, cat.name)}>
    //                     <EditIcon />
    //                   </IconButton>
    //                 )}
    //                 <IconButton color="error" onClick={() => handleDelete(cat.id)}>
    //                   <DeleteIcon />
    //                 </IconButton>
    //               </TableCell>
    //             </TableRow>
    //           ))
    //         ) : (
    //           <TableRow>
    //             <TableCell colSpan={3} align="center">
    //               Kategori bulunamadı.
    //             </TableCell>
    //           </TableRow>
    //         )}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    // </Box>
  );
};

export default CategoryPage;
