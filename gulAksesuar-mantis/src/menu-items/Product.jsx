import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const product = {
  id: 'product',
  title: 'Ürünler',
  type: 'group',
  children: [
    {
      id: 'product',
      title: 'Ürün Paneli',
      type: 'item',
      url: '/panel/product',
      icon: Inventory2OutlinedIcon
    }
  ]
};

export default product;
