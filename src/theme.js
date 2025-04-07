import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FFD1DC', // Pastel pink
      light: '#FFE4E9', // Light pastel pink
      dark: '#FFB6C1', // Soft pink
      contrastText: '#2c3e50',
    },
    secondary: {
      main: '#FFB6C1', // Soft pink
      light: '#FFE4E9', // Light pastel pink
      dark: '#FFD1DC', // Pastel pink
      contrastText: '#2c3e50',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
    },
  },
  typography: {
    fontFamily: '"Special Elite", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '4rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
      fontFamily: '"Apricots", cursive',
    },
    h2: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
      fontFamily: '"Apricots", cursive',
    },
    h3: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
      letterSpacing: '0em',
      fontFamily: '"Apricots", cursive',
    },
    h4: {
      fontWeight: 700,
      fontSize: '2.125rem',
      lineHeight: 1.2,
      letterSpacing: '0.00735em',
      fontFamily: '"Apricots", cursive',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.2,
      letterSpacing: '0em',
      fontFamily: '"Apricots", cursive',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.2,
      letterSpacing: '0.0075em',
      fontFamily: '"Apricots", cursive',
    },
    subtitle1: {
      fontSize: '1rem',
      lineHeight: 1.75,
      letterSpacing: '0.00938em',
      fontFamily: '"Special Elite", cursive',
    },
    subtitle2: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
      fontFamily: '"Special Elite", cursive',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
      fontFamily: '"Special Elite", cursive',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
      fontFamily: '"Special Elite", cursive',
    },
    button: {
      fontSize: '0.875rem',
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none',
      fontWeight: 600,
      fontFamily: '"Special Elite", cursive',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 24px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          boxShadow: '0 4px 12px rgba(255, 105, 180, 0.2)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(255, 105, 180, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(255, 105, 180, 0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 12px 24px rgba(255, 105, 180, 0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
        elevation1: {
          boxShadow: '0 4px 12px rgba(255, 105, 180, 0.1)',
        },
        elevation2: {
          boxShadow: '0 8px 16px rgba(255, 105, 180, 0.15)',
        },
        elevation3: {
          boxShadow: '0 12px 24px rgba(255, 105, 180, 0.2)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(255, 105, 180, 0.1)',
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          backgroundColor: '#FFE4E1',
        },
        bar: {
          borderRadius: '4px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 500,
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(255, 105, 180, 0.05)',
    '0 4px 8px rgba(255, 105, 180, 0.08)',
    '0 8px 16px rgba(255, 105, 180, 0.1)',
    '0 12px 24px rgba(255, 105, 180, 0.12)',
    '0 16px 32px rgba(255, 105, 180, 0.14)',
    '0 20px 40px rgba(255, 105, 180, 0.16)',
    '0 24px 48px rgba(255, 105, 180, 0.18)',
    '0 28px 56px rgba(255, 105, 180, 0.2)',
    '0 32px 64px rgba(255, 105, 180, 0.22)',
    '0 36px 72px rgba(255, 105, 180, 0.24)',
    '0 40px 80px rgba(255, 105, 180, 0.26)',
    '0 44px 88px rgba(255, 105, 180, 0.28)',
    '0 48px 96px rgba(255, 105, 180, 0.3)',
    '0 52px 104px rgba(255, 105, 180, 0.32)',
    '0 56px 112px rgba(255, 105, 180, 0.34)',
    '0 60px 120px rgba(255, 105, 180, 0.36)',
    '0 64px 128px rgba(255, 105, 180, 0.38)',
    '0 68px 136px rgba(255, 105, 180, 0.4)',
    '0 72px 144px rgba(255, 105, 180, 0.42)',
    '0 76px 152px rgba(255, 105, 180, 0.44)',
    '0 80px 160px rgba(255, 105, 180, 0.46)',
    '0 84px 168px rgba(255, 105, 180, 0.48)',
    '0 88px 176px rgba(255, 105, 180, 0.5)',
    '0 92px 184px rgba(255, 105, 180, 0.52)',
  ],
});

export default theme;