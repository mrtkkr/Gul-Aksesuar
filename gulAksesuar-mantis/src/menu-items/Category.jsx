import CategoryIcon from '@mui/icons-material/Category';

const category = {
  id: 'category',
  title: 'Kategoriler',
  type: 'group',
  children: [
    {
      id: 'category',
      title: 'Kategori Paneli',
      type: 'item',
      url: '/panel/category',
      icon: CategoryIcon
    }
  ]
};

export default category;
