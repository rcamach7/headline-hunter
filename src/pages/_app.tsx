import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import { AppBar } from '@/components/organisms';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
