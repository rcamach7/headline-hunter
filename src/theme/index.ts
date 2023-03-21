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

export default theme;
