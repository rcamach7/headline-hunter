import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    text: {
      primary: '#e1b472',
      secondary: '#7e736c',
    },
    background: {
      default: '#141313',
      paper: '#1f1f1e',
    },
    primary: {
      main: '#e1b472',
      dark: '#e53e3e',
      light: '#e53e3e',
      contrastText: '#7e736c',
    },
    secondary: {
      main: '#B6B5B5',
      dark: '#e53e3e',
      light: '#e53e3e',
      contrastText: '#e1b472',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      ml: 1000,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    ml: true;
  }
}

export default theme;
