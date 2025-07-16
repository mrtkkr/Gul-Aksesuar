import React, { useContext, useState, useMemo, useEffect, useCallback } from 'react';
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
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; // PDF ikonu ekle
import { ProductContext } from 'contexts/admin/gulAksesuar/ProductContext';
// import { CompanyContext } from '../../../../contexts/admin/feyzains/CompanyContext';
// import { WorksiteContext } from '../../../../contexts/admin/feyzains/WorksiteContext';
// import { GroupContext } from '../../../../contexts/admin/feyzains/GroupContext';
// import { CustomerContext } from '../../../../contexts/admin/feyzains/CustomerContext';

import CreateProductBill from './CreateProduct';
import EditProductBill from './EditProduct';
import ViewProductBill from './ViewProduct';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';
import ViewProduct from './ViewProduct';
import { AuthContext } from 'contexts/auth/AuthContext';
import * as XLSX from 'xlsx';

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('tr-TR', options);
};

const formatNumber = (number) => {
  if (number === null || number === undefined || isNaN(number)) return '-';
  return `${Number(number).toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

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
  return order === 'asc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

const ProductPage = () => {
  // Context
  const { products, count, loading, error, fetchProducts, deleteProduct } = useContext(ProductContext);

  // const { fetchCustomers, customers } = useContext(CustomerContext);

  // States
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState(false);
  const [isCreateProductDialogOpen, setIsCreateProductDialogOpen] = useState(false);
  const [isViewProductDialogOpen, setIsViewProductDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery1, setSearchQuery1] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('');
  const [searchQuery3, setSearchQuery3] = useState('');
  // const [searchQuery4, setSearchQuery4] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [ProductCount, setProductCount] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [filters, setFilters] = useState({
    productName: '',
    productPrice: '',
    productCategory: ''
  });

  useEffect(() => {
    fetchProducts({
      page: page,
      pageSize: rowsPerPage,
      orderBy: orderBy,
      order: order,
      ...filters // filtreleri ekledik
    });
  }, [page, rowsPerPage, orderBy, order, filters]); // filters'ı da bağımlılıklara ekle

  // useEffect(() => {
  //   fetchCompanies();
  //   fetchWorksites();
  //   fetchGroups();
  //   fetchCustomers();
  // }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    console.log('newPage', newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditProductClick = (id) => {
    setSelectedProductId(id);
    setIsEditProductDialogOpen(true);
  };

  const handleViewProductClick = (id) => {
    setSelectedProductId(id);
    setIsViewProductDialogOpen(true);
  };

  const handleEditProduct = () => {
    setIsEditProductDialogOpen(false);
    setSelectedProductId(null);

    fetchProducts({
      page: page,
      pageSize: rowsPerPage,
      orderBy: orderBy,
      order: order
    });
  };

  const handleCreateProduct = (ProductId) => {
    setIsCreateProductDialogOpen(false);
    setSelectedProductId(ProductId);
    fetchProducts({
      page: page,
      pageSize: rowsPerPage,
      orderBy: orderBy,
      order: order
    });
  };

  const handleCreateDialogClose = () => {
    setIsCreateProductDialogOpen(false);
    setSelectedProductId(null);
    // Trigger a refresh only when needed
  };

  const handleCloseViewDialog = () => {
    setIsViewProductDialogOpen(false);
    setSelectedProductId(null);
  };
  const handleCloseEditDialog = () => {
    setIsEditProductDialogOpen(false);
    setSelectedProductId(null);
  };

  // const handleEditProduct = () => {
  //   setIsEditProductDialogOpen(false);
  //   setSelectedProductId(null);
  // };

  const handledeleteProduct = async (id) => {
    if (window.confirm('Bu Ürün kaydını silmek istediğinizden emin misiniz?')) {
      try {
        const response = await deleteProduct(id);
        if (response && response.success) {
          toast.success('Ürün kaydı başarıyla silindi');
          fetchProducts({
            page: page,
            pageSize: rowsPerPage,
            orderBy: orderBy,
            order: order
          });
        } else {
          toast.error(response?.error || 'Ürün kaydı silinemedi');
        }
      } catch (error) {
        console.error('Silme işlemi sırasında hata:', error);
        toast.error('Silme işlemi başarısız');
      }
    }
  };

  // Dosya seçildiğinde state'e kaydet
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFilter = () => {
    const newFilters = {
      productName: searchQuery1.trim(),
      productPrice: searchQuery2.trim(),
      productCategory: searchQuery3.trim()
    };

    setFilters(newFilters); // filtreleri sakla
    fetchProducts({
      page: 0,
      pageSize: rowsPerPage,
      orderBy: orderBy,
      order: order,
      ...newFilters
    });

    setPage(0); // sayfayı sıfırla

    // inputları temizle
    setSearchQuery1('');
    setSearchQuery2('');
    setSearchQuery3('');
    // setSearchQuery4('');
  };

  const visibleProductRows = useMemo(() => {
    return products.sort(getComparator(order, orderBy));
  }, [products, order, orderBy]);

  // IMPORTANT: Using memoized props to pass to child components
  const viewProductProps = useMemo(
    () => ({
      open: isViewProductDialogOpen,
      onClose: handleCloseViewDialog,
      ProductId: selectedProductId
    }),
    [isViewProductDialogOpen, selectedProductId]
  );

  const editProductProps = useMemo(
    () => ({
      open: isEditProductDialogOpen,
      onClose: handleCloseEditDialog,
      ProductId: selectedProductId
    }),
    [isEditProductDialogOpen, selectedProductId]
  );

  const createProductProps = useMemo(
    () => ({
      open: isCreateProductDialogOpen,
      onClose: handleCreateDialogClose
    }),
    [isCreateProductDialogOpen]
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            letterSpacing: 0.5,
            mb: 3
          }}
        >
          ÜRÜN FİLTRELEME
        </Typography>

        <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
          {/* Sol taraf: Filtre alanları */}
          <Box display="flex" flexWrap="wrap" gap={8}>
            <Box display="flex" flexDirection="column" minWidth={200} gap={1}>
              <Typography variant="subtitle2">Ürün Adı</Typography>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Ürün Ara..."
                value={searchQuery1}
                onChange={(e) => setSearchQuery1(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
                fullWidth
              />
            </Box>

            <Box display="flex" flexDirection="column" minWidth={200} gap={1}>
              <Typography variant="subtitle2">Ürün Fiyatı</Typography>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Ürün Fiyatı Ara..."
                value={searchQuery2}
                onChange={(e) => setSearchQuery2(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
                fullWidth
              />
            </Box>

            <Box display="flex" flexDirection="column" minWidth={200} gap={1}>
              <Typography variant="subtitle2">Ürün Kategori</Typography>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Ürün Kategori Ara..."
                value={searchQuery3}
                onChange={(e) => setSearchQuery3(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
                fullWidth
              />
            </Box>
          </Box>

          {/* Sağ taraf: Filtrele butonu */}
          <Box display="flex" alignItems="flex-end">
            <Button
              variant="contained"
              size="medium"
              onClick={handleFilter}
              startIcon={<FilterListIcon />}
              sx={{
                backgroundColor: '#166866',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#28BCB9',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                },
                fontWeight: 'bold',
                px: 3,
                py: 1.2,
                borderRadius: 2,
                textTransform: 'none',
                transition: 'all 0.3s ease'
              }}
            >
              Filtrele
            </Button>
          </Box>
        </Box>
      </Paper>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center">
          <Typography variant="h5" component="h1">
            Ürün Kayıtları
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setIsCreateProductDialogOpen(true)}
              sx={{ ml: 2 }}
            >
              Ürün Ekle
            </Button>
          </>
        </Box>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box bgcolor="error.light" p={2} borderRadius={1} mb={3}>
          <Typography color="error">{error}</Typography>
        </Box>
      ) : (
        <>
          {isCreateProductDialogOpen && <CreateProduct {...createProductProps} />}
          {isEditProductDialogOpen && selectedProductId && <EditProduct {...editProductProps} />}
          {isViewProductDialogOpen && selectedProductId && <ViewProduct {...viewProductProps} />}

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tarih</TableCell>
                  <TableCell>Ürün Adı</TableCell>
                  <TableCell>Resim</TableCell>
                  <TableCell>Fiyat</TableCell>
                  <TableCell>Stok</TableCell>
                  <TableCell>Kategori</TableCell>
                  <TableCell>Durum</TableCell>
                  <TableCell>Ana Sayfa</TableCell>
                  <TableCell align="right">İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleProductRows.length > 0 ? (
                  visibleProductRows.map((products) => (
                    <TableRow key={products.id}>
                      <TableCell>{formatDate(products.date)}</TableCell>
                      <TableCell>{products.product_name} </TableCell>
                      <TableCell>
                        {products.product_image ? (
                          <img
                            src={products.product_image}
                            alt={products.product_name}
                            style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%' }}
                          />
                        ) : (
                          <Typography variant="body2" color="textSecondary">
                            Resim Yok
                          </Typography>
                        )}
                      </TableCell>

                      <TableCell>{formatNumber(products.product_price)}</TableCell>
                      <TableCell>{products.stock_quantity}</TableCell>
                      <TableCell>{products.category?.category_name || '-'}</TableCell>
                      <TableCell>{products.is_active_product ? 'Aktif' : 'Pasif'}</TableCell>
                      <TableCell>{products.show_home_page ? 'Evet' : 'Hayır'}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="Detay">
                          <IconButton onClick={() => handleViewProductClick(products.id)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>

                        <>
                          <Tooltip title="Düzenle">
                            <IconButton onClick={() => handleEditProductClick(products.id)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Sil">
                            <IconButton onClick={() => handledeleteProduct(products.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      <Typography variant="body1" py={2}>
                        {searchQuery2 ? 'Arama kriterlerinize uygun ürün kaydı bulunamadı.' : 'Henüz ürün kaydı bulunmamaktadır.'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Sayfa başına kayıt:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
          />
        </>
      )}
    </Box>
  );
};

export default ProductPage;
