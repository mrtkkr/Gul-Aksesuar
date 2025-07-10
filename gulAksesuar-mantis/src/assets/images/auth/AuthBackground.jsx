// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// ==============================|| AUTH BACKGROUND - ROSE THEME ||============================== //

export default function AuthBackground() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -1,
        top: 0,
        left: 0
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'blur(80px)', transform: 'scale(1.3)' }}
      >
        <defs>
          <radialGradient id="rose1" cx="20%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f7c4d4" />
            <stop offset="100%" stopColor="#f8e1ea" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rose2" cx="80%" cy="70%" r="80%">
            <stop offset="0%" stopColor="#d66b93" />
            <stop offset="100%" stopColor="#fae2ec" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="250" cy="300" r="300" fill="url(#rose1)" />
        <circle cx="950" cy="600" r="300" fill="url(#rose2)" />
      </svg>
    </Box>
  );
}
