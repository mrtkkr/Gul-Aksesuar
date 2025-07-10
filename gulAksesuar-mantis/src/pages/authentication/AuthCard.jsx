import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';

// ==============================|| AUTHENTICATION - CARD WRAPPER ||============================== //

export default function AuthCard({ children, ...other }) {
  return (
    <MainCard
      sx={{
        maxWidth: { xs: 400, lg: 475 },
        margin: { xs: 2.5, md: 3 },
        background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
        '& > *': {
          flexGrow: 1,
          flexBasis: '50%'
        }
      }}
      content={false}
      {...other}
      border={false}
    >
      <Box
        sx={{
          p: { xs: 2, sm: 3, md: 4, xl: 5 },
          backdropFilter: 'blur(2px)'
        }}
      >
        {children}
      </Box>
    </MainCard>
  );
}

AuthCard.propTypes = { children: PropTypes.node, other: PropTypes.any };
