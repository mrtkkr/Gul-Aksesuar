import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const order = {
  id: 'order',
  title: 'Siparişler',
  type: 'group',
  children: [
    {
      id: 'order',
      title: 'Sipariş Paneli',
      type: 'item',
      url: '/panel/order',
      icon: ShoppingCartOutlinedIcon
    }
  ]
};

export default order;
