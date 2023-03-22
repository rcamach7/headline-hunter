import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import { UserContextProvider } from '../context/UserContext';
import { LoadingProvider } from '@/context/LoadingContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <UserContextProvider>
        <LoadingProvider>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
            <CssBaseline />
          </ThemeProvider>
        </LoadingProvider>
      </UserContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
