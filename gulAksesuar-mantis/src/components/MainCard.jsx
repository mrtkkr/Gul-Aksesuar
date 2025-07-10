import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

// header style
const headerSX = {
  p: 3,
  '& .MuiCardHeader-action': { m: '0 auto', alignSelf: 'center' }
};

function MainCard(
  {
    border = true,
    boxShadow,
    children,
    content = true,
    contentSX = {},
    darkTitle,
    elevation,
    secondary,
    shadow,
    sx = {},
    title,
    ...others
  },
  ref
) {
  const theme = useTheme();
  boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

  return (
    <Card
      elevation={elevation || 0}
      ref={ref}
      {...others}
      sx={{
        border: border ? '1px solid' : 'none',
        borderRadius: 3,
        borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey[300],
        backgroundColor: theme.palette.background.paper,
        boxShadow:
          boxShadow && (!border || theme.palette.mode === 'dark') ? shadow || theme.customShadows.z20 : '0px 4px 12px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease-in-out',
        ':hover': {
          boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.1)'
        },
        '& pre': {
          m: 0,
          p: '16px !important',
          fontFamily: theme.typography.fontFamily,
          fontSize: '0.75rem'
        },
        ...sx
      }}
    >
      {/* card header and action */}
      {title && (
        <CardHeader
          sx={headerSX}
          title={
            darkTitle ? (
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
            ) : (
              title
            )
          }
          action={secondary}
        />
      )}

      {/* card content */}
      {content ? <CardContent sx={{ px: 3, py: 2.5, ...contentSX }}>{children}</CardContent> : children}
    </Card>
  );
}

export default forwardRef(MainCard);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  subheader: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  content: PropTypes.bool,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  divider: PropTypes.bool,
  elevation: PropTypes.number,
  secondary: PropTypes.any,
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  modal: PropTypes.bool,
  others: PropTypes.any
};
