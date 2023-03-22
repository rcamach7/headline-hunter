import { createContext } from 'react';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

export const LoadingContext = createContext({
  isLoading: false,
});

export const useLoadingContext = () => {
  const loadingContext = useContext(LoadingContext);
  if (LoadingContext === null) {
    throw new Error('Error retrieving context for loading');
  }
  return loadingContext;
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let timer;

    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => {
      timer = setTimeout(() => setLoading(false), 1000);
    };
    const handleRouteChangeError = () => setLoading(false);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      clearTimeout(timer);
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router.events]);
  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
