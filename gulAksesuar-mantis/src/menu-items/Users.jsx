import GroupOutlined from '@mui/icons-material/GroupOutlined';

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const users = {
  id: 'users',
  title: 'Kullanıcılar',
  type: 'group',
  children: [
    {
      id: 'users',
      title: 'Kullanıcılar Paneli',
      type: 'item',
      url: '/panel/users',
      icon: GroupOutlined
    }
  ]
};

export default users;
