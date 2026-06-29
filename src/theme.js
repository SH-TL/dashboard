import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#EAB500',
      light: '#FFD000',
      dark: '#C49200',
      contrastText: '#180805',
    },
    secondary: {
      main: '#6070C8',
      light: '#8090E0',
      dark: '#4A5AAA',
      contrastText: '#F0EAD8',
    },
    background: {
      default: '#180805',
      paper: '#0D0402',
    },
    text: {
      primary: '#F0EAD8',
      secondary: '#9CA3AF',
      disabled: '#7A6030',
    },
    success: { main: '#10B981' },
    error: { main: '#EF4444' },
    divider: '#3A2010',
  },
  typography: {
    fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
    letterSpacing: '0.02em',
    h1: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.3 },
    h2: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.3 },
    h3: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.3 },
    body1: { fontSize: '0.8125rem', fontWeight: 400, lineHeight: 1.5 },
    body2: { fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.5 },
    caption: { fontSize: '0.6875rem', fontWeight: 400 },
  },
  spacing: 4,
  shape: { borderRadius: 10 },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: 'none',
          border: '1px solid #3A2010',
          backgroundImage: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '0.8125rem',
          padding: '12px 16px',
          borderBottom: '1px solid #3A2010',
        },
        head: {
          fontSize: '0.75rem',
          fontWeight: 500,
          color: '#7A6030',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: 24,
          fontSize: '0.6875rem',
          fontWeight: 600,
          borderRadius: 999,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          marginBottom: 4,
          '&.Mui-selected': {
            backgroundColor: '#EAB500',
            color: '#180805',
            borderRadius: 14,
            '&:hover': { backgroundColor: '#FFD000' },
            '& .MuiListItemIcon-root': { color: '#180805' },
            '& .MuiListItemText-primary': { color: '#180805', fontWeight: 600 },
          },
          '&:hover': { backgroundColor: '#3A2010' },
        },
      },
    },
  },
});

export default theme;
