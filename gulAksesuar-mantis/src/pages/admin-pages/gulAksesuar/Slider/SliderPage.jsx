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
import AddSlider from './AddSliderPage';

const initialSliders = [
  { id: 1, title: 'Yaz İndirimi', description: 'Tüm ürünlerde %50 indirim!', image: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Yeni Koleksiyon', description: '2025 İlkbahar koleksiyonu şimdi yayında.', image: 'https://via.placeholder.com/150' }
];

const SliderPage = () => {
  const [sliders, setSliders] = useState(initialSliders);
  const [newSlider, setNewSlider] = useState({ title: '', description: '', image: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingSlider, setEditingSlider] = useState({ title: '', description: '', image: '' });

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const handleOpen = () => setOpenAddDialog(true);
  const handleClose = () => setOpenAddDialog(false);

  const handleAddSlider = () => {
    if (!newSlider.title || !newSlider.description || !newSlider.image) return;

    setSliders([...sliders, { id: Date.now(), ...newSlider }]);
    setNewSlider({ title: '', description: '', image: '' });
  };

  const handleDelete = (id) => {
    setSliders(sliders.filter((s) => s.id !== id));
  };

  const handleEdit = (slider) => {
    setEditingId(slider.id);
    setEditingSlider(slider);
  };

  const handleSave = () => {
    setSliders(sliders.map((s) => (s.id === editingId ? editingSlider : s)));
    setEditingId(null);
    setEditingSlider({ title: '', description: '', image: '' });
  };

  return (
    <main className="container my-3">
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header py-1 d-flex justify-content-between align-items-center">
              <h5 className="card-title">Sliderlar</h5>
              {/* Kategori Ekle Butonu */}
              <button onClick={handleOpen} className="btn btn-sm btn-primary">
                <i className="fa-solid fa-plus"></i> Yeni Slider
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-hover table-striped mb-0">
                  <thead className="table-secondary">
                    <tr>
                      <th scope="col" style={{ fontSize: '18px' }}>
                        Slider Id
                      </th>
                      <th scope="col" style={{ fontSize: '18px' }}>
                        Image
                      </th>
                      <th scope="col" style={{ fontSize: '18px' }}>
                        Title
                      </th>
                      <th scope="col">IsActive</th>
                      <th scope="col">Index</th>
                      <th style={{ width: '150px' }}></th>
                      {/* <th scope="col">İşlemler</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <img
                          src="/images/slider-1.jpeg"
                          className="img-fluid"
                          style={{ height: '150px', objectFit: 'cover' }}
                          alt="First Product Image"
                        />
                      </td>
                      <td>Slider 1 Başlık</td>
                      <td>
                        <i className="fa-solid fa-circle-check text-success"></i>
                      </td>
                      <td>1</td>

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
                      <td>
                        <img
                          src="/images/slider-2.jpeg"
                          className="img-fluid"
                          style={{ height: '150px', objectFit: 'cover' }}
                          alt="First Product Image"
                        />
                      </td>
                      <td>Slider 2 Başlık</td>
                      <td>
                        <i className="fa-solid fa-circle-check text-success"></i>
                      </td>
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
                      <td>3</td>
                      <td>
                        <img
                          src="/images/slider-3.jpeg"
                          className="img-fluid"
                          style={{ height: '150px', objectFit: 'cover' }}
                          alt="First Product Image"
                        />
                      </td>
                      <td>Slider 3 Başlık</td>
                      <td>
                        <i className="fa-solid fa-circle-check text-success"></i>
                      </td>
                      <td>3</td>

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
      <AddSlider open={openAddDialog} onClose={handleClose} />
    </main>

    // <Box sx={{ maxWidth: 900, margin: '40px auto', p: 2 }}>
    //   <Typography variant="h4" gutterBottom>
    //     Slider Yönetimi
    //   </Typography>

    //   <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
    //     <TextField label="Başlık" value={newSlider.title} onChange={(e) => setNewSlider({ ...newSlider, title: e.target.value })} />
    //     <TextField
    //       label="Açıklama"
    //       value={newSlider.description}
    //       onChange={(e) => setNewSlider({ ...newSlider, description: e.target.value })}
    //     />
    //     <TextField label="Görsel URL" value={newSlider.image} onChange={(e) => setNewSlider({ ...newSlider, image: e.target.value })} />
    //     <Button variant="contained" onClick={handleAddSlider}>
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
    //             <strong>Başlık</strong>
    //           </TableCell>
    //           <TableCell>
    //             <strong>Açıklama</strong>
    //           </TableCell>
    //           <TableCell>
    //             <strong>Görsel</strong>
    //           </TableCell>
    //           <TableCell align="right">
    //             <strong>İşlemler</strong>
    //           </TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {sliders.length > 0 ? (
    //           sliders.map((slider) => (
    //             <TableRow key={slider.id}>
    //               <TableCell>{slider.id}</TableCell>
    //               <TableCell>
    //                 {editingId === slider.id ? (
    //                   <TextField
    //                     variant="standard"
    //                     value={editingSlider.title}
    //                     onChange={(e) => setEditingSlider({ ...editingSlider, title: e.target.value })}
    //                   />
    //                 ) : (
    //                   slider.title
    //                 )}
    //               </TableCell>
    //               <TableCell>
    //                 {editingId === slider.id ? (
    //                   <TextField
    //                     variant="standard"
    //                     value={editingSlider.description}
    //                     onChange={(e) => setEditingSlider({ ...editingSlider, description: e.target.value })}
    //                   />
    //                 ) : (
    //                   slider.description
    //                 )}
    //               </TableCell>
    //               <TableCell>
    //                 {editingId === slider.id ? (
    //                   <TextField
    //                     variant="standard"
    //                     value={editingSlider.image}
    //                     onChange={(e) => setEditingSlider({ ...editingSlider, image: e.target.value })}
    //                   />
    //                 ) : (
    //                   <img src={slider.image} alt={slider.title} width={80} />
    //                 )}
    //               </TableCell>
    //               <TableCell align="right">
    //                 {editingId === slider.id ? (
    //                   <IconButton color="success" onClick={handleSave}>
    //                     <SaveIcon />
    //                   </IconButton>
    //                 ) : (
    //                   <IconButton color="primary" onClick={() => handleEdit(slider)}>
    //                     <EditIcon />
    //                   </IconButton>
    //                 )}
    //                 <IconButton color="error" onClick={() => handleDelete(slider.id)}>
    //                   <DeleteIcon />
    //                 </IconButton>
    //               </TableCell>
    //             </TableRow>
    //           ))
    //         ) : (
    //           <TableRow>
    //             <TableCell colSpan={5} align="center">
    //               Slider bulunamadı.
    //             </TableCell>
    //           </TableRow>
    //         )}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    // </Box>
  );
};

export default SliderPage;
