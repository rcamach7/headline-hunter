import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';

import theme from '../theme';
import {
  LoadingProvider,
  FeedbackProvider,
  UserContextProvider,
} from '@/context';
import { AppBar } from '@/components/organisms';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <UserContextProvider>
        <LoadingProvider>
          <FeedbackProvider>
            <ThemeProvider theme={theme}>
              <Head>
                <link rel="icon" type="image/x-icon" href="logos/fav.svg" />
              </Head>
              <AppBar />
              <Component {...pageProps} />
              <CssBaseline />
            </ThemeProvider>
          </FeedbackProvider>
        </LoadingProvider>
      </UserContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
