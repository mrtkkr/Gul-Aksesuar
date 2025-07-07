import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';

// ==============================|| MENU ITEMS - ROL ||============================== //

const role = {
  id: 'role',
  title: 'Rol',
  type: 'group',
  children: [
    {
      id: 'role',
      title: 'Role Paneli',
      type: 'item',
      url: '/panel/role',
      icon: SupervisedUserCircleOutlinedIcon
    }
  ]
};

export default role;
