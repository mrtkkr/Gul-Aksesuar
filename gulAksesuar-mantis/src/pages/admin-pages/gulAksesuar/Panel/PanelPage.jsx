import React, { useContext, useState, useMemo, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  FormControlLabel,
  Checkbox,
  InputAdornment
} from '@mui/material';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { PanelContext } from 'contexts/admin/PanelContext';
import EditUserPage from './EditUserPage';
import { width } from '@mui/system';
//import { NotificationContext } from "contexts/auth/NotificationContext"; // ekle

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

const PanelPage = () => {
  // States
  const [currentTaxRate, setCurrentTaxRate] = useState('');
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    user_name: '',
    phone: '',
    password: '',
    is_staff: false
  });
  const [warehouseUser, setWarehouseUser] = useState({
    type: 'manager',
    first_name: '',
    last_name: '',
    user_name: '',
    password: ''
  });

  // Context
  const { users, fetchUsers, createUser, deleteUser } = useContext(PanelContext);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  //const [notificationMessage, setNotificationMessage] = useState("");
  //const { createNotification } = useContext(NotificationContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const response = await createUser(newUser);
    if (response.success) {
      toast.success('Kullanıcı başarıyla eklendi');
      setNewUser({
        type: 'manager',
        first_name: '',
        last_name: '',
        user_name: '',
        password: '',
        is_staff: false
      });
      fetchUsers();
    } else {
      toast.error(response.error || 'Kullanıcı eklenemedi');
    }
  };

  const handleEditUserClick = (id) => {
    setSelectedUserId(id);
    setIsEditUserDialogOpen(true);
  };

  const handleEditUser = () => {
    setIsEditUserDialogOpen(false);
    setSelectedUserId(null);
    fetchUsers();
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      const response = await deleteUser(id);
      if (response.success) {
        toast.success('Kullanıcı başarıyla silindi');
        fetchUsers();
      } else {
        toast.error(response.error || 'Kullanıcı silinemedi');
      }
    }
  };

  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    if (!notificationMessage.trim()) return;

    const res = await createNotification({ message: notificationMessage });

    if (res?.response?.status === 201) {
      toast.success('Duyuru başarıyla eklendi');
      setNotificationMessage('');
    } else {
      toast.error('Duyuru eklenemedi');
    }
  };

  const visibleUserRows = useMemo(
    () =>
      users
        .slice()
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, users]
  );

  return (
    // buraya div eklemek istiyorum
    <div>
      <main className="container my-3">
        <div className="row">
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col">
                    <div className="fw-bold text-primary text-uppercase mb-1">Satış</div>
                    <div className="h5 mb-0 fw-bold">40.000 ₺</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col">
                    <div className="fw-bold text-primary text-uppercase mb-1">Sipariş</div>
                    <div className="h5 mb-0 fw-bold">125</div>
                  </div>
                  <div className="col-auto">
                    <i className="fa-solid fa-truck fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-warning shadow py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col">
                    <div className="fw-bold text-primary text-uppercase mb-1">Ürün Adedi</div>
                    <div className="h5 mb-0 fw-bold">215</div>
                  </div>
                  <div className="col-auto">
                    <i className="fa-solid fa-list fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-info shadow py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col">
                    <div className="fw-bold text-primary text-uppercase mb-1">Mesaj</div>
                    <div className="h5 mb-0 fw-bold">432</div>
                  </div>
                  <div className="col-auto">
                    <i className="fa-solid fa-message fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card shadow">
            <div className="card-header pb-0">
              <h5 className="card-title">Son Siparişler</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped mb-0">
                  <thead className="table-secondary">
                    <tr>
                      <th scope="col">Order Id</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Total</th>
                      <th scope="col">Date</th>
                      <th scope="col">State</th>
                      <th style={{ width: '40px' }}></th>

                      {/* <th scope="col">İşlemler</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>5</td>
                      <td>Furkan Kocaman</td>
                      <td>500 ₺</td>
                      <td>20/10/2026</td>
                      <td>
                        <span className="badge bg-success">Teslim Edildi</span>
                      </td>
                      <td>
                        <a href="#" className="btn btn-primary btn-sm">
                          <i className="fa-solid fa-eye"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Sadık Selim</td>
                      <td>1200 ₺</td>
                      <td>12/06/2027</td>
                      <td>
                        <span className="badge bg-primary">Onay Bekliyor</span>
                      </td>
                      <td>
                        <a href="#" className="btn btn-primary btn-sm">
                          <i className="fa-solid fa-eye"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Derya Kızılyar</td>
                      <td>4500 ₺</td>
                      <td>10/03/2026</td>
                      <td>
                        <span className="badge bg-danger">İptal Edildi</span>
                      </td>
                      <td>
                        <a href="#" className="btn btn-primary btn-sm">
                          <i className="fa-solid fa-eye"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>Taha Yeşilkent</td>
                      <td>250 ₺</td>
                      <td>03/01/2026</td>
                      <td>
                        <span className="badge bg-warning">İşleme Alındı</span>
                      </td>
                      <td>
                        <a href="#" className="btn btn-primary btn-sm">
                          <i className="fa-solid fa-eye"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>Safa Karaş</td>
                      <td>2500 ₺</td>
                      <td>05/08/2027</td>
                      <td>
                        <span className="badge bg-primary">Onay Bekliyor</span>
                      </td>
                      <td>
                        <a href="#" className="btn btn-primary btn-sm">
                          <i className="fa-solid fa-eye"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Yönetici Paneli
        </Typography>

        <Grid container spacing={3}>
          {/* Sol: Form */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Yeni Yönetici Ekle
                </Typography>
                <Box component="form" onSubmit={handleUserSubmit} sx={{ mt: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Ad"
                        value={newUser.first_name}
                        onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Soyad"
                        value={newUser.last_name}
                        onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Kullanıcı Adı"
                        value={newUser.user_name}
                        onChange={(e) => setNewUser({ ...newUser, user_name: e.target.value })}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="phone"
                        label="Telefon"
                        value={newUser.phone}
                        onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="password"
                        label="Şifre"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button fullWidth type="submit" variant="contained" color="primary">
                        Ekle
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Sağ: Tablo */}
          <Grid item xs={12} md={8}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" mb={2}>
                  Yöneticiler
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Ad</TableCell>
                        <TableCell>Soyad</TableCell>
                        <TableCell>Kullanıcı Adı</TableCell>
                        <TableCell align="right">İşlemler</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {visibleUserRows.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.first_name}</TableCell>
                          <TableCell>{user.last_name}</TableCell>
                          <TableCell>{user.user_name}</TableCell>
                          <TableCell align="right">
                            <Tooltip title="Düzenle">
                              <IconButton onClick={() => handleEditUserClick(user.id)}>
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Sil">
                              <IconButton onClick={() => handleDeleteUser(user.id)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>

              <TablePagination
                rowsPerPageOptions={[3, 5]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Grid>
        </Grid>

        {/* Edit Dialog */}
        {isEditUserDialogOpen && selectedUserId && (
          <EditUserPage open={isEditUserDialogOpen} onClose={() => handleEditUser()} userId={selectedUserId} />
        )}
      </Box>
    </div>
  );
};

export default PanelPage;
