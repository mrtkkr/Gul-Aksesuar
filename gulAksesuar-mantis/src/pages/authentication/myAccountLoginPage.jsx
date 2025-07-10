// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// react-router-dom
import { Link } from 'react-router-dom';

// project import
import AuthWrapper from './AuthWrapper';
import MyAccountAuthLogin from './auth-forms/MyAccountAuthLogin';

// ================================|| LOGIN ||================================ //

export default function MyAccountLoginPage() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Giriş Yap</Typography>
            <Typography
              component={Link}
              to="/myAccountRegisterPage"
              variant="body1"
              sx={{
                textDecoration: 'none',
                color: '#AD1457',
                '&:hover': {
                  color: '#F06292'
                }
              }}
            >
              Hesabınız var mı?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <MyAccountAuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
