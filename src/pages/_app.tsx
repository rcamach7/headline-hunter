import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import { UserContextProvider } from '../context/UserContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <UserContextProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <CssBaseline />
        </ThemeProvider>
      </UserContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
